import { Component, OnInit, Input } from '@angular/core';
import { Project, Site } from '../project';
import { ProjectDataService } from '../project-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  @Input() project: Project;
  
  public newSite: Site = {
    owner: '',
    siteName: '',
    siteAddress: ''
  };
  
  public formVisible: boolean = false;
  public formError: string;

  constructor(
    private projectDataService: ProjectDataService,
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit() {
  }
  
  private formIsValid(): boolean {
    if(this.newSite.siteName && this.newSite.siteAddress){
        return true;
    } else {
        return false;
    }
  }
  
  public isLoggedIn(): boolean{
    return this.authenticationService.isLoggedIn();
  }
  
  public getUsername(): string{
    const { name } = this.authenticationService.getCurrentUser();
    return name ? name : 'Guest';
  }
  
  public onSiteSubmit(): void{
    this.formError='';
    this.newSite.owner = this.getUsername();
    if(this.formIsValid()){
        console.log(this.newSite);
        this.projectDataService.addSiteByProjectId(this.project._id, this.newSite)
            .then((site: Site)=>{
                console.log('Site saved', site);
                let sites = this.project.sites.slice(0);
                sites.unshift(site);
                this.project.sites = sites;
                this.resetAndHideReviewForm();
            });
    } else {
        this.formError = 'All fields required, please try again';
    }
  }
  
  private resetAndHideReviewForm(): void {
    this.formVisible = false;
    this.newSite.siteName = '';
    this.newSite.siteAddress = '';
  }

}
