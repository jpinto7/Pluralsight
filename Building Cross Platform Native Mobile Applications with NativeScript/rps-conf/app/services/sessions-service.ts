import * as httpModule from 'http';
import * as constantsModule from '../shared/constants';
import * as fakeDataServiceModule from './fake-data-service';

class SessionsService {
  private _useHttpService = false;

  public loadSessions<T>(): Promise<T> {
    if (this._useHttpService) {
      return this.loadSessionsViaHttp<T>();
    }
    return this.loadSessionsViaFaker<T>();
  }

  private loadSessionsViaHttp<T>(): Promise<T> {
    const reqParams = {
      url: constantsModule.AZURE_URL + constantsModule.AZURE_TABLE_PATH + constantsModule.AZURE_TABLE_NAME + '?$orderby=start',
      method: 'GET',
      headers: constantsModule.AZURE_VERSION_HEADER
    };
    return httpModule.getJSON<T>(reqParams);   
  }

  private loadSessionsViaFaker<T>(): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const speakers = fakeDataServiceModule.generateSpeakers();
      const roomInfos = fakeDataServiceModule.generateRoomInfos();
      const sessions = <any>fakeDataServiceModule.generateSessions(speakers, roomInfos);
      resolve(sessions);
    });
  }
}

export default SessionsService;