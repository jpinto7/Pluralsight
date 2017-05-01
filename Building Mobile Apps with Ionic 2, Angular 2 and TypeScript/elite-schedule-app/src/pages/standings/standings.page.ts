import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';

import { EliteApi } from '../../shared/shared';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.page.html',
})
export class StandingsPage {

  private allStandings: any[];
  private divisionFilter = 'division';
  private standings: any[];
  private team: any;

  constructor(
    private nav: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApi) {}

  ionViewDidLoad() {
    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;
    this.allStandings = tourneyData.standings;
    this.filterDivision();
  }

  filterDivision(){
    if(this.divisionFilter === 'all'){
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }

  getHeader(record, recordIndex, records){
    if (recordIndex === 0 || record.division !== records[recordIndex-1].division) {
      return record.division;
    }
    return null;
  }
}
