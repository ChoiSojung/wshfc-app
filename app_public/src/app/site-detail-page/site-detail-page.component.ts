import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectDataService } from '../project-data.service';
import { Project, Site } from '../project'
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-site-detail-page',
  templateUrl: './site-detail-page.component.html',
  styleUrls: ['./site-detail-page.component.css']
})
export class SiteDetailPageComponent implements OnInit {

  constructor(
  	private projectDataService: ProjectDataService, 
    private route: ActivatedRoute
  ) { }
  
  
  public newSite: Site;

  ngOnInit(): void {
  	this.route.paramMap
        .pipe(
            switchMap((params: ParamMap)=>{
                return this.projectDataService.getSiteById(params.get('projectId'), params.get('siteId'));
            })
        )
        .subscribe((newSite: Site)=>{
            this.newSite = newSite;
            this.pageContent.header.strapline = this.newSite.siteAddress;
        });
  }
  
  public pageContent = {
    header: {
        title: 'Building Information',
        strapline: ''
    },
    sidebar: ''
  };

}
