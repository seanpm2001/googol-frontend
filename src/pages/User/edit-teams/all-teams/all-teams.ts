import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { TeamService } from '../../../../_services/team';
import { Team } from '../../../../_models/team';
import { UsersService } from '../../../../_services/users';
import { User } from '../../../../_models/user';

@Component({
  selector: 'page-all-teams',
  templateUrl: 'all-teams.html',
})
export class AllTeamsPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private teamService: TeamService,
    private loadingController: LoadingController,
    private userService: UsersService,
    private event:Events
    ) {
    
    let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
    this.fetchUser(authUserId);
    this.fetchTeams();
  }
  private user = new User();
  private teams: Team[] = [];
  
  fetchUser(id : string){
    this.userService.getOne(id).subscribe(
      data=> {
        this.user = data;
      },
      err =>{
        console.log(err);
      }
    ) 
  }

  async fetchTeams() {
    let loading = this.loading();
    await loading;
    this.teamService.getAllTeams().subscribe(
      teams => {
        this.teams = [];
          this.teams = teams.filter((team) => {
            return !this.followTrue(team._id);
          });
          this.teams.sort((team1, team2) => {
            if (team1.name < team2.name) {
              return -1;
            }else if (team1.name > team2.name) {
              return 1;
            }return 0;
        }
        );
        loading.dismiss();                
      },
      error => {
        console.log(error);
        loading.dismiss(); 
      }
    );
  }

  async addTeam(teamId : string) {
    this.userService.addTeam('add', teamId).subscribe(
      data =>{
        this.teams = this.teams.filter((team) => {
          return team._id !== teamId;
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  refresh(){
    let authUserId = JSON.parse(localStorage.getItem('authUser')).userId;
    this.fetchUser(authUserId);
    this.fetchTeams();
  }

  followTrue(idTeam:string){
    const teamsId = this.user.favTeams.map((team) => team._id);
    if(teamsId.indexOf(idTeam) === -1){
      return false;
    }else{
      return true;
    } 
  }

  loading(){
    let loading = this.loadingController.create({
      content: 'Por favor, aguarde...',
      spinner: 'bubbles'
    });

    loading.present();

    return loading;
  }
}
