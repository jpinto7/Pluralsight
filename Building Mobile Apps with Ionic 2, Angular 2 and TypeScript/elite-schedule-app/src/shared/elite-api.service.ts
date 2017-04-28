import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApi {

  private baseUrl: String = 'https://elite-schedule-e2594.firebaseio.com';
  private currentTournament: any = {};
  private tournamentData: any = {};

  constructor(private http: Http) {}

  private handleError(error) {
    return Observable.throw(error.json().error || 'Server error');
  }

  getTournaments() {
    return this.http.get(`${this.baseUrl}/tournaments.json`)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getTournamentData(tournamentId, forceRefresh: boolean = false) : Observable<any> {
    if (!forceRefresh && this.tournamentData[tournamentId]) {
      this.currentTournament = this.tournamentData[tournamentId];
      return Observable.of(this.currentTournament);
  }

  return this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`)
    .map(response => {
      this.tournamentData[tournamentId] = response.json();
      this.currentTournament = this.tournamentData[tournamentId];
      return this.currentTournament;
    })
    .catch(this.handleError);
  }

  getCurrentTournament() {
    return this.currentTournament;
  }

  refreshCurrentTournament() {
    return this.getTournamentData(this.currentTournament.tournament.id, true);
  }
}
