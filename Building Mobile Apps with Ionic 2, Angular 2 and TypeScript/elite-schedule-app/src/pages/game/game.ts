import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EliteApi } from '../../shared/shared';
import { TeamHomePage } from '../pages';
declare var window: any;

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

  private game: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eliteApi: EliteApi) { }

  ionViewDidLoad(){
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId){
    let tourneyData = this.eliteApi.getCurrentTournament();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

  goToDirections(){
    let tourneyData = this.eliteApi.getCurrentTournament();
    let location = tourneyData.locations[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35;`;
  }

  goToMap(){
    //this.navCtrl.push(MapPage, this.game);
  }

  isWinner(score1, score2){
    //return Number(score1) > Number(score2);
    return Number(score1) > Number(score2) ? 'secondary' : '';
  }
}
