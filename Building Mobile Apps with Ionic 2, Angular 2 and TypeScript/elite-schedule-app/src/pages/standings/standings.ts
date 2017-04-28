import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EliteApi } from '../../shared/shared';
import _ from 'lodash';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html'
})
export class StandingsPage {

  private team: any = {};
  private allStandings: any[] = [];

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private eliteApi: EliteApi) {
    this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    let tournamentData = this.eliteApi.getCurrentTournament();
    let standings = tournamentData.standings;
    this.allStandings = _(standings)
                        .groupBy('division')
                        .toPairs()
                        .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
                        .value();
  }
}
