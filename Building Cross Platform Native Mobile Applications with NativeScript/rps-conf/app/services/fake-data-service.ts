import * as faker from 'faker';
import * as fileSystemModule from 'file-system';
import { conferenceDays } from '../shared/static-data';
import {
  ConferenceDay,
  ConfTimeSlot,
  Session,
  Speaker,
  RoomInfo
} from '../shared/interfaces';

const NUM_SPEAKERS = 40;
const NUM_ROOM_INFOS = 10;
const SESSION_LENGTH = 60;

const times = (x: number) => (f: Function) => {
  if (x > 0) {
    f()
    times (x - 1) (f)
  }
};

export const generateSpeakers = (): Array<Speaker> => {
  const speakerList: Array<Speaker> = [];
  const avatarsMen = getSpeakerAvatars('images/speakers/base64/men.txt');
  const avatarsWomen = getSpeakerAvatars('images/speakers/base64/women.txt');
  times(NUM_SPEAKERS)(() => {
    const genderBool = faker.random.boolean();
    const genderInt = parseInt(genderBool + '');
    const firstName = faker.name.firstName(genderInt);
    const lastName = faker.name.lastName(genderInt);
    const picture = genderBool ? avatarsMen[faker.random.number(avatarsMen.length-1)] : avatarsWomen[faker.random.number(avatarsWomen.length-1)];
    const s: Speaker = {
      id: faker.random.uuid(),
      name: firstName + ' ' + lastName,
      title: faker.name.jobTitle(),
      company: faker.company.companyName(),
      picture: picture,
      twitterName: '@' + faker.internet.userName(firstName, lastName),
    };    
    speakerList.push(s);
  });
  return speakerList;
};


export const generateRoomInfos = (): Array<RoomInfo> => {
  const roomInfoList: Array<RoomInfo> = [];
  times(NUM_ROOM_INFOS)(() => {
    const r: RoomInfo = {
      roomId: faker.random.uuid(),
      name: faker.address.streetName() + ' ' + faker.random.number(10),
      url: faker.internet.domainName(),
      theme: faker.lorem.words(1)
    };
    roomInfoList.push(r);
  });
  return roomInfoList;
};

export const generateSessions = (speakers: Array<Speaker>, roomInfos: Array<RoomInfo>): Array<Session> => {
  const sessionList: Array<Session> = [];
  let idSeed = 1000;
  for (const confDay of conferenceDays) {
    const timeSlots = generateTimeSlots(confDay);
    for (const confTimeSlot of timeSlots) {
      if (confTimeSlot.isBreak) {
        const s: Session = {
          id: (idSeed++).toString(),
          title: toTitleCase(confTimeSlot.title),
          isBreak: true,
          start: confTimeSlot.start.toString(),
          end: confTimeSlot.end.toString(),
          room: '',
          roomInfo: null,
          speakers: [],
          description: '',
          descriptionShort: '',
          calendarEventId: ''
        };
        sessionList.push(s);
      }
      else {
        const subSpeakers = getRandomArrayElements(speakers, faker.random.number(3));
        const roomInfo = roomInfos[faker.random.number(roomInfos.length-1)];
        const s: Session = {
          id: (idSeed++).toString(),
          title: toTitleCase(faker.company.bs()),
          isBreak: false,
          start: confTimeSlot.start.toString(),
          end: confTimeSlot.end.toString(),
          room: roomInfo.name,
          roomInfo: roomInfo,
          speakers: subSpeakers,
          description: faker.lorem.paragraph(),
          descriptionShort: faker.lorem.sentence(),
          calendarEventId: faker.random.uuid()
        };
        sessionList.push(s);
      }
    }
  }
  return sessionList;
}

const getSpeakerAvatars = (path) => {
  const avatarList: Array<string> = [];
  const currentAppFolder = fileSystemModule.knownFolders.currentApp();
  const menAvatarsFile = currentAppFolder.getFile(path);
  const fileText = menAvatarsFile.readTextSync();
  
  const lines = fileText.split('\n');
  for (var i = 0; i < lines.length; i++) {
    avatarList.push('data:image/png;base64,' + lines[i]);
  }
  return avatarList;
}

const generateTimeSlots = (confDay: ConferenceDay): Array<ConfTimeSlot> => {
  const timeSlotList: Array<ConfTimeSlot> = [];
  const startTimeList = getTimeRange(addMinutes(confDay.date, 240), addMinutes(confDay.date, 780), SESSION_LENGTH);
  for (const startTime of startTimeList) {
    let isBreak = false;
    let sessionTitle = '';
    if (startTime.getHours() == 4) {
      isBreak = true;
      sessionTitle = 'Welcome Message';
    }
    else if (startTime.getHours() == 8) {
      isBreak = true;
      sessionTitle = 'Lunch Break';
    }
    const cTimeSlot: ConfTimeSlot = {
      title: sessionTitle,
      isBreak: isBreak,
      start: startTime,
      end: addMinutes(startTime, SESSION_LENGTH)
    };
    timeSlotList.push(cTimeSlot);
  }
  return timeSlotList;
};

const getTimeRange = (startTime: Date, endTime: Date, minutesBetween: number): Array<Date> => {
  const startTimeList: Array<Date> = [];
  const diffInMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000);
  const periods: number = diffInMinutes / minutesBetween;
  for (let i = 0; i <= periods; i++) {
    const periodStart = addMinutes(startTime, (minutesBetween * i));
    startTimeList.push(periodStart);
  }
  return startTimeList;
}

const addMinutes = (date: Date, minutes: number) => new Date(date.getTime() + minutes*60000);

const getRandomArrayElements = (arr, count) => {
  const shuffled = arr.slice(0);
  let i = arr.length;
  const min = i - count;
  let temp;
  let index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
}

const toTitleCase = (str: string) => str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});