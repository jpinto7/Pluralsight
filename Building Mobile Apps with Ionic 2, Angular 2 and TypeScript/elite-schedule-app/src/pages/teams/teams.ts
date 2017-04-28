import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';

import { TeamHomePage } from '../pages';
import { EliteApi } from '../../shared/shared';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {

  private teams: any[] = [];
  private allTeamDivisions: any[] = [];
  private showTeamDivisions: boolean = false;

  constructor(private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private navParams: NavParams,
              private eliteApi: EliteApi) {}

  itemTapped(event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

  ionViewDidLoad() {
    let selectedTournament = this.navParams.data;
    let loader = this.loadingCtrl.create({
      content: 'Getting teams...',
    });
    loader.present()
      .then(() => {
        this.eliteApi.getTournamentData(selectedTournament.id)
          .subscribe(tournament => {
            this.allTeamDivisions = _(tournament.teams)
                                    .groupBy('division')
                                    .toPairs()
                                    .map(team => _.zipObject(['divisionName', 'divisionTeams'], team))
                                    .value();
            loader.dismiss();
            this.showTeamDivisions = true;
          });
      });

    this.eliteApi.getTournamentData(selectedTournament.id)
      .subscribe(tournament => {
        this.teams = tournament.teams;
      });
  }
}
