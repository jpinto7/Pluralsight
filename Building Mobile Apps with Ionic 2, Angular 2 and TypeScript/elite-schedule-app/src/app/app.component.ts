import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EliteApi } from '../shared/shared';

import { MyTeamsPage, TournamentsPage } from '../pages/pages';

@Component({
  templateUrl: 'app.html',
  providers: [
    EliteApi
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private rootPage: any = MyTeamsPage;
  private pages: Array<{title: string, component: any}> = [];

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  goHome() {
    if (this.rootPage !== MyTeamsPage) {
      this.nav.push(MyTeamsPage);
    }
  }

  goToTournaments() {
    this.nav.push(TournamentsPage);
  }
}
