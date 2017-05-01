import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {
  private baseUrl: String = 'https://elite-schedule-e2594.firebaseio.com';
  private currentTourney: any = {};
  private tourneyData: any = {};

  constructor(private http: Http) {}

  private handleError(error) {
    return Observable.throw(error.json().error || 'Server error');
  }

  getTournaments() {
    return this.http.get(`${this.baseUrl}/tournaments.json`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getTournamentData(tourneyId, forceRefresh: boolean = false) : Observable<any> {
    if (!forceRefresh && this.tourneyData[tourneyId]) {
      this.currentTourney = this.tourneyData[tourneyId];
      return Observable.of(this.currentTourney);
    }
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
      .map(response => {
        this.tourneyData[tourneyId] = response.json();
        this.currentTourney = this.tourneyData[tourneyId];
        return this.currentTourney;
      })
      .catch(this.handleError);
  }

  getCurrentTourney() {
    return this.currentTourney;
  }

  refreshCurrentTourney() {
    return this.getTournamentData(this.currentTourney.tournament.id, true);
  }
}
