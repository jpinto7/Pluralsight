import { Observable } from 'data/observable';
import * as favoritesServiceModule from '../../services/favorites-service';
import {
  Session,
  Speaker,
  RoomInfo
} from '../../shared/interfaces';

class SessionViewModel extends Observable implements Session {
  private _session: Session;
  private _favorite: boolean;
  private _startDt: Date;
  private _endDt: Date;
  private _calendarEventId: string;

  constructor(source?: Session) {
    super();
    if (source) {
      this._session = source;
      this._startDt = this.fixDate(new Date(source.start));
      this._endDt = this.fixDate(new Date(source.end)); 
   }
  }

  get id() {
    return this._session.id;
  }

  get title() {
    return this._session.title;
  }

  get room() {
    if (this._session.room) {
      return this._session.room;
    }
    if (this._session.roomInfo) {
      return this._session.roomInfo.name;
    }
    return null;
  }

  get roomInfo() {
    return this._session.roomInfo;
  }

  get start() {
    return this._session.start;
  }

  get end() {
    return this._session.end;
  }

  get startDt() {
    return this._startDt;
  }

  get endDt() {
    return this._endDt;
  }

  get speakers() {
    return this._session.speakers;
  }

  get range() {
    const startMinutes = this.startDt.getMinutes() + '';
    const endMinutes = this.endDt.getMinutes() + '';
    const startAM = this.startDt.getHours() < 12 ? 'am' : 'pm';
    const endAM = this.endDt.getHours() < 12 ? 'am' : 'pm';

    const startHours = (this.startDt.getHours() <= 12 ? this.startDt.getHours() : this.startDt.getHours() - 12) + '';
    const endHours = (this.endDt.getHours() <= 12 ? this.endDt.getHours() : this.endDt.getHours() - 12) + '';

    return (startHours.length === 1 ? '0' + startHours : startHours) + ':' + (startMinutes.length === 1 ? '0' + startMinutes : startMinutes) + startAM +
          ' - ' + (endHours.length === 1 ? '0' + endHours : endHours) + ':' + (endMinutes.length === 1 ? '0' + endMinutes : endMinutes) + endAM;
  }

  get isBreak() {
    return this._session.isBreak;
  }

  get description() {
    return this._session.description;
  }

  get descriptionShort() {
    if (this.description.length > 160) {
      return `${this.description.substr(0, 160)}...`;
    }
    return this.description;
  }

  get calendarEventId() {
    return this._calendarEventId;
  }

  set calendarEventId(value: string) {
    if (this._calendarEventId !== value) {
      this._calendarEventId = value;
      this.notify({
        object: this,
        eventName: Observable.propertyChangeEvent,
        propertyName: 'calendarEventId',
        value: this._calendarEventId
      });
    }
  }

  get favorite() {
    return this._favorite;
  }

  set favorite(value: boolean) {
    if (this._favorite !== value && !this._session.isBreak) {
      this._favorite = value;
      this.notify({
        object: this,
        eventName: Observable.propertyChangeEvent,
        propertyName: 'favorite',
        value: this._favorite
      });
    }
  }

  public toggleFavorite() {
    this.favorite = !this.favorite;
    if (this.favorite) {
      favoritesServiceModule.addToFavorites(this);
    }
    else {
      favoritesServiceModule.removeFromFavorites(this);
    }
  }

  private fixDate(date: Date) {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
  }
}

export default SessionViewModel;