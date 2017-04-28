import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';

import { TeamHomePage } from '../pages';
import { EliteApi } from '../../shared/shared';

@Component({
  templateUrl: 'teams.html',
})
export class TeamsPage {

  private allTeamDivisions: any[] = [];
  private teams: any[] = [];
  private queryText: String = '';

  constructor(private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private navParams: NavParams,
              private eliteApi: EliteApi) {}

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }

  updateTeams() {
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });
    this.teams = filteredTeams;
  }

  ionViewDidLoad(){
    let selectedTournament = this.navParams.data;
    let loader = this.loadingCtrl.create({
      content: 'Getting teams...'
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTournament.id)
        .subscribe(handleSuccess, handleError);
      });

    const handleSuccess = ({ teams }) => {
      this.allTeamDivisions = _(teams)
        .groupBy('division')
        .toPairs()
        .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
        .value();
      this.teams = this.allTeamDivisions;
      loader.dismiss();
    };

    const handleError = error => {
      loader.dismiss();
    };
  }
}
