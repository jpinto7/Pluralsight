import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { StandingsPage, TeamDetailPage } from '../pages';

@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.page.html',
})
export class TeamHomePage {

  private team: any;
  private teamDetailTab = TeamDetailPage;
  private standingsTab = StandingsPage;

  constructor(
    private nav: NavController,
    private navParams: NavParams) {
      this.team =  this.navParams.data;
  }

  goHome() {
    this.nav.popToRoot();
  }
}
