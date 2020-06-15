import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProjectDataService } from '../project-data.service';
import { Project, Site} from '../project'
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
  public siteid = '';
  public projectid='';
  

  ngOnInit(): void {
  	this.route.paramMap
        .pipe(
            switchMap((params: ParamMap)=>{
				this.projectid = params.get('projectId');
				this.siteid = params.get('siteId');
                return this.projectDataService.getSiteById(this.projectid, this.siteid);
            })
        )
        .subscribe((newSite: Site)=>{
            this.newSite = newSite;
            this.pageContent.header.strapline = newSite.siteName;
        });
  }
  
  public pageContent = {
    header: {
        title: 'Site Detail',
        strapline: ''
    },
    sidebar: ''
  };

}
