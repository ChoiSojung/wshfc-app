import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectDataService } from '../project-data.service';
import { Project } from '../project'
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-project-detail-page',
  templateUrl: './project-detail-page.component.html',
  styleUrls: ['./project-detail-page.component.css']
})
export class ProjectDetailPageComponent implements OnInit {

  constructor(
    private projectDataService: ProjectDataService, 
    private route: ActivatedRoute
    ) { }
    
  public newProject: Project;

  ngOnInit():void {
    this.route.paramMap
        .pipe(
            switchMap((params: ParamMap)=>{
                let id = params.get('projectId');
                return this.projectDataService.getProjectById(id);
            })
        )
        .subscribe((newProject: Project)=>{
            this.newProject = newProject;
            this.pageContent.header.strapline = newProject.name;
        });
  }
  
  public pageContent = {
    header: {
        title: 'Project details',
        strapline: ''
    },
    sidebar: ''
  };

}
