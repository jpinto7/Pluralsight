import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
//import { GOOGLE_MAPS_DIRECTIVES } from 'angular2-google-maps/core';

import { EliteApi } from '../../shared/shared';
declare var window: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.page.html'
})
export class MapPage {

  private map: any = {};

  constructor(
    private navParams: NavParams,
    private eliteApi: EliteApi) {}

  ionViewDidLoad(){
    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.map = {
      lat: location.latitude,
      lng: location.longitude,
      zoom: 12,
      markerLabel: games.location
    };
  }

  getDirections() {
    window.location = `geo:${this.map.lat},${this.map.lng};u=35`;
  }
}
