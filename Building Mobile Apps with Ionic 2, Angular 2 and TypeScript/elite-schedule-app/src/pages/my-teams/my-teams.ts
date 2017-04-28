import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { TeamHomePage, TournamentsPage } from '../pages';

import { EliteApi } from '../../shared/shared';

@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {

  private favorites: any[] = [];

  constructor(private navCtrl: NavController,
              private loadingCtrl: LoadingController,
              private eliteApi: EliteApi) {}

  goToTournaments() {
    this.navCtrl.push(TournamentsPage);
  }

  favoriteTapped(event, favorite) {
    let loader = this.loadingCtrl.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present()
      .then(() => {
        this.eliteApi.getTournamentData(favorite.tournamentId)
          .subscribe(tournament => {
            this.navCtrl.push(TeamHomePage, favorite.team);
          });
      });
  }
}
