import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { TeamHomePage, TournamentsPage } from '../pages';
import { EliteApi, UserSettings } from '../../shared/shared';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.page.html'
})
export class MyTeamsPage {

  private favorites: any[] = [];

  constructor(
    private loadingController: LoadingController,
    private nav: NavController,
    private eliteApi: EliteApi,
    private userSettings: UserSettings) {}

  favoriteTapped($event, favorite) {
    let loader = this.loadingController.create({
      content: 'Getting team data...',
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId)
      .subscribe(() => {
        loader.dismiss();
        this.nav.push(TeamHomePage, favorite.team);
      }, () => {
        loader.dismiss();
      });
  }

  goToTournaments(){
    this.nav.push(TournamentsPage);
  }

  ionViewDidEnter(){
    this.userSettings
      .getAllFavorites()
      .then(favorites => { this.favorites = favorites });
  }
}
