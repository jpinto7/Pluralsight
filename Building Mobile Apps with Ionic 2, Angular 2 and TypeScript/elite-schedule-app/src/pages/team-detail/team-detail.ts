import { Component } from '@angular/core';
import { AlertController, ToastController, NavController, NavParams } from 'ionic-angular';
import _ from 'lodash';
import moment from 'moment';

import { GamePage } from '../pages';
import { EliteApi, UserSettings } from '../../shared/shared';

@Component({
  templateUrl: 'team-detail.html'
})
export class TeamDetailPage {

  private games: any[] = [];
  private team: any = {};
  private teamStanding: any = {};
  private tournamentData: any = {};
  private dateFilter: string = '';
  private allGames: any[] = [];
  private useDateFilter: boolean = false;
  private isFollowing: boolean = false;

  constructor(private navCtrl: NavController,
              private toastCtrl: ToastController,
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private eliteApi: EliteApi,
              private userSettings: UserSettings) {
    this.team = this.navParams.data;
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      let teamScore = (isTeam1 ? team1Score : team2Score);
      let opponentScore = (isTeam1 ? team2Score : team1Score);
      let winIndicator = teamScore > opponentScore ? 'W: ' : 'L: ';
      return `${winIndicator + teamScore}-${opponentScore}`;
    } else {
      return '';
    }
  }

  gameClicked(event, { gameId }) {
    let sourceGame = this.tournamentData.games.find(g => g.id === gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }
  }

  toggleFollow() {
    if (this.isFollowing) {
      let confirm = this.alertCtrl.create({
        title: 'Unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this.userSettings.unfavoriteTeam(this.team);
              let toast = this.toastCtrl.create({
                message: 'You have unfollowed this team.',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          },
          { text: 'No' }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      this.userSettings.favoriteTeam(
        this.team,
        this.tournamentData.tournament.id,
        this.tournamentData.tournament.name
      );
    }
  }

  getScoreWorL(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplayBadgeClass(game) {
    return this.getScoreWorL(game) === 'W' ? 'primary' : 'danger';
  }

  refreshAll(event){
    this.eliteApi.refreshCurrentTournament()
      .subscribe(
        () => {
          event.complete();
          this.ionViewDidLoad();
        }
        ,
        () => {
          event.complete();
        }
      );
  }

  ionViewDidLoad() {
    this.tournamentData = this.eliteApi.getCurrentTournament();
    this.games = _(this.tournamentData.games)
      .filter(g => g.teamId === this.team.id || g.team2Id === this.team.id)
      .map(g => {
          let isTeam1 = (g.team1Id === this.team.id);
          let opponentName = isTeam1 ? g.team2 : g.team1;
          let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
          return {
            gameId: g.id,
            opponent: opponentName,
            time: Date.parse(g.time),
            location: g.location,
            locationUrl: g.locationUrl,
            scoreDisplay: scoreDisplay,
            homeAway: (isTeam1 ? "vs." : "at")
          };
      })
      .value();
      this.allGames = this.games;
      this.teamStanding = _.find(this.tournamentData.standings, { 'teamId': this.team.id });
      this.userSettings.isFavoriteTeam(this.team.id).then(value => this.isFollowing = value);
  }
}
