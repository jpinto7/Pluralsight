import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class EliteApi {
  private baseUrl = 'https://elite-schedule-e2594.firebaseio.com';

  constructor(private http: Http) {

  }
}
