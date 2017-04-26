import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html'
})
export class TeamDetailPage {
  team: any

  constructor(private nav: NavController, private navParams: NavParams) {
    this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    const { data: team } = this.navParams;
    console.log(`ionViewDidLoad TeamDetailPage ${team.name}`);
  }
}
