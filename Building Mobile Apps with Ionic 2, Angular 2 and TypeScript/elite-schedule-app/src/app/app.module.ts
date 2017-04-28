import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {
  TeamsPage,
  TeamHomePage,
  TournamentsPage,
  TeamDetailPage,
  StandingsPage,
  GamePage,
  MyTeamsPage
} from '../pages/pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EliteApi, UserSettings } from '../shared/shared';

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TeamsPage,
    TeamHomePage,
    TournamentsPage,
    TeamDetailPage,
    StandingsPage,
    GamePage
  ],
  imports: [
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TeamsPage,
    TeamHomePage,
    TournamentsPage,
    TeamDetailPage,
    StandingsPage,
    GamePage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StatusBar,
    SplashScreen,
    EliteApi,
    Storage,
    UserSettings
  ]
})
export class AppModule {}
