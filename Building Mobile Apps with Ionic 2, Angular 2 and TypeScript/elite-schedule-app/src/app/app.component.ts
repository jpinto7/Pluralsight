import { Component, ViewChild } from '@angular/core';
import { Events, LoadingController, Nav, Platform } from 'ionic-angular';
import { Splashscreen, StatusBar } from 'ionic-native';

import { MyTeamsPage, TeamHomePage, TournamentsPage } from '../pages/pages';
import { EliteApi, UserSettings } from '../shared/shared';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private favoriteTeams: any[];
  private rootPage: any;

  constructor(
    public events: Events,
    public loadingController: LoadingController,
    public platform: Platform,
    public eliteApi: EliteApi,
    public userSettings: UserSettings) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleLightContent();
      Splashscreen.hide();
      this.userSettings.initStorage().then(() => {
        this.rootPage = MyTeamsPage;
        this.refreshFavorites();
        this.events.subscribe('favorites:changed', () => this.refreshFavorites());
      });
    });
  }

  refreshFavorites(){
    this.userSettings.getAllFavorites()
      .then(favoriteTeams => { this.favoriteTeams = favoriteTeams });
  }

  goHome() {
    if (this.rootPage !== MyTeamsPage) {
      this.nav.push(MyTeamsPage);
    }
  }

  goToTeam(favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId)
      .subscribe(() => { this.nav.push(TeamHomePage, favorite.team) });
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }
}
