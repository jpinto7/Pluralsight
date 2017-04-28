import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';

import { EliteApi } from '../../shared/shared';

@Component({
  templateUrl: 'standings.html'
})
export class StandingsPage {

  private divisionFilter: String = 'division';
  private team: any = {};
  private standings: any[] = [];
  private allStandings: any[] = [];

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private eliteApi: EliteApi) {}

  getHeader(record, recordIndex, records) {
    if (recordIndex === 0 || record.division !== records[recordIndex-1].division) {
      return record.division;
    }
    return null;
  }

  filterDivision(){
    if (this.divisionFilter === 'all'){
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tournamentData = this.eliteApi.getCurrentTournament();
    this.standings = tournamentData.standings;
    this.allStandings = tournamentData.standings;
    this.filterDivision();
  }
}
