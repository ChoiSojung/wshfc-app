import { Component, OnInit, Input } from '@angular/core';
import { Project, NewSite, Site } from '../project';
import { User } from '../user';
import { ProjectDataService } from '../project-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  @Input() project: Project;
  
  public newSite: NewSite = {
    owner: '',
    siteName: '',
    siteAddress: '',
	legalDesc: '',
	taxId: ''
  };
  
  public siteFormVisible: boolean = false;
  public siteFormError: string;

  constructor(
    private projectDataService: ProjectDataService,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
  }
  
  private siteFormIsValid(): boolean {
    if(this.newSite.siteName && this.newSite.siteAddress){
        return true;
    } else {
        return false;
    }
  }
  
  public isLoggedIn(): boolean{
    return this.authenticationService.isLoggedIn();
  }
  
  public getUsername(): string {
    const user: User = this.authenticationService.getCurrentUser();
    return user ? user.name : '';
  }
  
  public getUserId(): string {
    const user: User = this.authenticationService.getCurrentUser();
    return user ? user._id : '';
  }
  
  public onSiteSubmit(): void{
    this.siteFormError='';
    this.newSite.owner = this.getUserId();
    if(this.siteFormIsValid()){
        console.log(this.newSite);
        this.projectDataService.addSiteByProjectId(this.project._id, this.newSite)
            .then((site: Site)=>{
                console.log('Site saved', site);
                let sites = this.project.sites.slice(0);
                sites.unshift(site);
                this.project.sites = sites;
                this.resetAndHideSiteForm();
            });
    } else {
        this.siteFormError = 'All fields required, please try again';
    }
  }
  
  private resetAndHideSiteForm(): void {
    this.siteFormVisible = false;
    this.newSite.siteName = '';
    this.newSite.siteAddress = '';
	this.newSite.legalDesc = '';
	this.newSite.taxId = '';
  }
}
