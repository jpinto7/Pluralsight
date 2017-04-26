import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the TeamDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html'
})
export class TeamDetailPage {
  team: any

  constructor(public nav: NavController, private navParams: NavParams) {
    this.team = this.navParams.data;
  }

  ionViewDidLoad() {
    const { data: team } = this.navParams;
    console.log(`ionViewDidLoad TeamDetailPage ${team.name}`);
  }

}
