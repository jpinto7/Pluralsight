import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {
  StandingsPage,
  TeamDetailPage
} from '../pages';

@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html'
})
export class TeamHomePage {
  private team: any = {};
  private teamDetailTab: any = TeamDetailPage;
  private standingsTab: any = StandingsPage;

  constructor(private navCtrl: NavController,
              private navParams: NavParams) {
    this.team = this.navParams.data;
  }

  goHome() {
    this.navCtrl.popToRoot();
  }
}
