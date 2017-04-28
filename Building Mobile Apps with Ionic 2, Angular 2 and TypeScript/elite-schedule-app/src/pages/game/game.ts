import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EliteApi } from '../../shared/shared';
import { TeamHomePage } from '../pages';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

  private game: any = {};

  constructor(private nav: NavController,
              private navParams: NavParams,
              private eliteApi: EliteApi) {}

  teamTapped(teamId) {
    let tournamentData = this.eliteApi.getCurrentTournament();
    let team = tournamentData.teams.find(t => t.id === teamId);
    this.nav.push(TeamHomePage, team);
  }

  ionViewDidLoad() {
    this.game = this.navParams.data;
  }
}
