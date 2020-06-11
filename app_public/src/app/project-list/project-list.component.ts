import { Component, OnInit } from '@angular/core';
import { ProjectDataService } from '../project-data.service';

export class Project {
    _id: string;
    name: string;
    address: string;
    status: string;
}

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor(private projectDataService: ProjectDataService) { }
  
  public projects: Project[];

  ngOnInit(){
    this.getProjects();
  }
  
  private getProjects():void {
    this.projectDataService
        .getProjects()
        .then(foundProjects => this.projects = foundProjects);
  }

}