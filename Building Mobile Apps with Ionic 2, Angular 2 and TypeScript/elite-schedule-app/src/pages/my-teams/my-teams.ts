import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { TeamHomePage, TournamentsPage } from '../pages';

import { EliteApi, UserSettings } from '../../shared/shared';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {

  private favorites: any[] = [];

  constructor(private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private eliteApi: EliteApi,
              private userSettings: UserSettings) {}

  goToTournaments() {
    this.navCtrl.push(TournamentsPage);
  }

  favoriteTapped(event, { team, tournamentId }) {
    let loader = this.loadingCtrl.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present()
      .then(() => {
        this.eliteApi.getTournamentData(tournamentId)
          .subscribe(tournament => {
            this.navCtrl.push(TeamHomePage, team);
          });
      });
  }

  ionViewDidEnter() {
    this.favorites = this.userSettings.getAllFavorites();
  }
}
