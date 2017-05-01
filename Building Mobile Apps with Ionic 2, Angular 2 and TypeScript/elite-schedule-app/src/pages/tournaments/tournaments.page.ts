import { Component } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

import { TeamsPage } from '../pages';
import { EliteApi } from '../../shared/shared';

@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.page.html',
})
export class TournamentsPage {

  private tournaments: any;

  constructor(
    private nav: NavController,
    private eliteApi: EliteApi,
    private loadingController: LoadingController) {}

  itemTapped($event, tourney) {
    this.nav.push(TeamsPage, tourney);
  }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting tournaments...'
    });
    loader.present().then(() => {
      this.eliteApi.getTournaments()
        .subscribe((tournaments) => {
          this.tournaments = tournaments;
          loader.dismiss();
        }, () => {
          loader.dismiss();
          this.nav.pop();
        });
    });
  }
}
