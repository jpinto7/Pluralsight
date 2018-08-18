import SessionViewModel from '../pages/session-page/session-view-model';
import { FavoriteSession } from '../shared/interfaces';

import * as appSettingsModule from 'application-settings';
import * as platformModule from 'platform';
import * as appModule from 'application';
import * as typesModule from 'utils/types';

const REMIDER_MINUTES = 5;
const FAVORITES = 'FAVORITES';

export let favorites: Array<FavoriteSession>;

const updateFavorites = () => {
  var newValue = JSON.stringify(favorites);
  console.log('favorites: ' + newValue);
  appSettingsModule.setString(FAVORITES, newValue);
}

try {
  favorites = <Array<FavoriteSession>>JSON.parse(appSettingsModule.getString(FAVORITES, '[]'));
}
catch (error) {
  console.log('Error while retrieveing favourites: ' + error);
  favorites = new Array<FavoriteSession>();
  updateFavorites();
}

export const findSessionIndexInFavorites = (sessionId: string): number => {
  for (var i = 0; i < favorites.length; i++) {
    if (favorites[i].sessionId === sessionId) {
      return i;
    }
  }
  return -1;
}

export const addToFavorites = (session: SessionViewModel) => {
  if (findSessionIndexInFavorites(session.id) >= 0) {
    // Sesson already added to favourites.
    return;
  }
  try {
    if (platformModule.device.os === platformModule.platformNames.android) {
      const projection = java.lang.reflect.Array.newInstance(java.lang.String.class, 1);
      projection[0] = '_id';

      const calendars = android.net.Uri.parse('content://com.android.calendar/calendars');
      const contentResolver = appModule.android.foregroundActivity.getApplicationContext().getContentResolver();
      const managedCursor = contentResolver.query(calendars, projection, null, null, null);
      let calID;

      if (managedCursor.moveToFirst()) {
        var idCol = managedCursor.getColumnIndex(projection[0]);
        calID = managedCursor.getString(idCol);
        managedCursor.close();
      }

      if (typesModule.isUndefined(calID)) {
        // No caledndar to add to
        return;
      }

      const timeZone = java.util.TimeZone.getTimeZone('GMT-05:00');

      const startDate = session.startDt.getTime();
      const endDate = session.endDt.getTime();

      var values = new android.content.ContentValues();
      values.put("calendar_id", calID);
      values.put("eventTimezone", timeZone.getID());
      values.put("dtstart", java.lang.Long.valueOf(startDate));
      values.put("dtend", java.lang.Long.valueOf(endDate));
      values.put("title", session.title);
      values.put("eventLocation", session.room);
      const uri = contentResolver.insert(android.provider.CalendarContract.Events.CONTENT_URI, values);

      const eventId = uri.getLastPathSegment();
      session.calendarEventId = eventId;

      const reminderValues = new android.content.ContentValues();
      reminderValues.put("event_id", java.lang.Long.valueOf(java.lang.Long.parseLong(eventId)));
      reminderValues.put("method", java.lang.Long.valueOf(1)); // METHOD_ALERT
      reminderValues.put("minutes", java.lang.Long.valueOf(REMIDER_MINUTES));
      contentResolver.insert(android.provider.CalendarContract.Reminders.CONTENT_URI, reminderValues);

      persistSessionToFavorites(session);

    } else if (platformModule.device.os === platformModule.platformNames.ios) {
      const store = EKEventStore.new()
      store.requestAccessToEntityTypeCompletion(EKEntityTypeEvent, (granted: boolean, error: NSError) => {
        if (!granted) {
          return;
        }

        const event = EKEvent.eventWithEventStore(store);
        event.title = session.title;
        event.timeZone = NSTimeZone.alloc().initWithName("UTC-05:00");
        event.startDate = NSDate.dateWithTimeIntervalSince1970(session.startDt.getTime() / 1000);
        event.endDate = NSDate.dateWithTimeIntervalSince1970(session.endDt.getTime() / 1000);
        event.calendar = store.defaultCalendarForNewEvents;
        event.location = session.room;
        event.addAlarm(EKAlarm.alarmWithRelativeOffset(-REMIDER_MINUTES * 60));

        let err: NSError;
        const result = store.saveEventSpanCommitError(event, EKSpan.EKSpanThisEvent, true);

        session.calendarEventId = event.eventIdentifier;
        persistSessionToFavorites(session);
      });
    }
  }
  catch (error) {
    console.log('Error while creating calendar event: ' + error);
  }
}

const persistSessionToFavorites = (session: SessionViewModel) => {
  favorites.push({
    sessionId: session.id,
    calendarEventId: session.calendarEventId
  });
  updateFavorites();
}

export const removeFromFavorites = (session: SessionViewModel) => {
  const index = findSessionIndexInFavorites(session.id);
  if (index >= 0) {
    favorites.splice(index, 1);
    updateFavorites();
  }

  if (session.calendarEventId) {
    if (platformModule.device.os === platformModule.platformNames.android) {
      var deleteUri = android.content.ContentUris.withAppendedId(android.provider.CalendarContract.Events.CONTENT_URI, parseInt(session.calendarEventId));
      appModule.android.foregroundActivity.getApplicationContext().getContentResolver().delete(deleteUri, null, null);
    } else if (platformModule.device.os === platformModule.platformNames.ios) {
      var store = EKEventStore.new()
      store.requestAccessToEntityTypeCompletion(EKEntityTypeEvent, (granted: boolean, error: NSError) => {
        if (!granted) {
          return;
        }

        var eventToRemove = store.eventWithIdentifier(session.calendarEventId);
        if (eventToRemove) {
          store.removeEventSpanCommitError(eventToRemove, EKSpan.EKSpanThisEvent, true);
          session.calendarEventId = undefined;
        }
      });
    }
  }
}