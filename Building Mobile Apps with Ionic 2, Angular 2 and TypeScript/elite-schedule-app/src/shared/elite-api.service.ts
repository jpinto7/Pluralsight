import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class EliteApi {
  private baseUrl = 'https://elite-schedule-e2594.firebaseio.com';
  currentTournament: any = {};

  constructor(private http: Http) {
  }

  getTournaments() {
    return this.http.get(`${this.baseUrl}/tournaments.json`)
      .map((res: Response) => res.json());
  }

  getTournamentData(tournamentId): Observable<any> {
    return this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`)
      .map((res: Response) => {
        this.currentTournament = res.json();
        return this.currentTournament;
      });
  }

  getCurrentTournament() {
    return this.currentTournament;
  }
}
