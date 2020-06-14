import { Component, OnInit } from '@angular/core';
import { ProjectDataService } from '../project-data.service';
import { Project } from '../project';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(
    private projectDataService: ProjectDataService,
    private authenticationService: AuthenticationService
  ) { }
  
  public projects: Project[];
  
  public pageContent = {
    header:{
        title:'Applications',
        strapline: ''
    },
    sidebar: {
        title:'Contact us',
        strapline: 'Learn more about our programs and how they help your community at ',
        url: 'www.wshfc.org'
    }
  };

  ngOnInit(){
    this.getProjects(this.getUserId());
  }
  
  public getUserId(): string {
    const user: User = this.authenticationService.getCurrentUser();
    return user ? user._id : '';
  }
  
  private getProjects(userId):void {
    this.projectDataService
        .getProjectsByUser(userId)
        .then(foundProjects => this.projects = foundProjects);
  }

}
