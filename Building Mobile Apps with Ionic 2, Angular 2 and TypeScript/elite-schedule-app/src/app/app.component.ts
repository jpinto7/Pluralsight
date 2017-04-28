import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EliteApi, UserSettings } from '../shared/shared';

import { MyTeamsPage, TeamHomePage, TournamentsPage } from '../pages/pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private favoriteTeams: any[] = [];
  private rootPage: any = MyTeamsPage;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private loadingCtrl: LoadingController,
              private splashScreen: SplashScreen,
              private eliteApi: EliteApi,
              private userSettings: UserSettings,
              private events: Events) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavorites();
      this.events.subscribe('favorites:changed', () => {
        this.refreshFavorites();
      });
    });
  }

  goHome() {
    if (this.rootPage !== MyTeamsPage) {
      this.nav.push(MyTeamsPage);
    }
  }

  goToTeam({ tournamentId, team }){
    let loader = this.loadingCtrl.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(tournamentId)
      .subscribe(l => this.nav.push(TeamHomePage, team));
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }

  refreshFavorites() {
    this.favoriteTeams = this.userSettings.getAllFavorites();
  }
}
