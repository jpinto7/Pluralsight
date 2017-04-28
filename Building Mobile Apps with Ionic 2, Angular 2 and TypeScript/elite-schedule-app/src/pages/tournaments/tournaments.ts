import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { TeamsPage } from '../pages';
import { EliteApi } from '../../shared/shared';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html'
})
export class TournamentsPage {

  private tournaments: any[] = [];

  constructor(private navCtrl: NavController,
              private eliteApi: EliteApi,
              private loadingCtrl: LoadingController) {}

  itemTapped(event, tournament) {
    this.navCtrl.push(TeamsPage, tournament);
  }

  ionViewDidLoad() {
    let loader = this.loadingCtrl.create({
      content: 'Getting tournaments...',
    });
    loader.present()
      .then(() => {
        this.eliteApi.getTournaments()
          .subscribe(tournaments => {
            this.tournaments = tournaments;
            loader.dismiss();
          });
      });
  }
}
