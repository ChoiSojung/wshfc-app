import { Component, OnInit } from '@angular/core';
import { ProjectDataService } from '../project-data.service';
import { Project } from '../project';


@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private projectDataService: ProjectDataService) { }
  
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
    this.getProjects();
  }
  
  private getProjects():void {
    this.projectDataService
        .getProjects()
        .then(foundProjects => this.projects = foundProjects);
  }

}
