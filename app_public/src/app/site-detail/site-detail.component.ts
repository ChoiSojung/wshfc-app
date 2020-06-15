import { Component, OnInit, Input } from '@angular/core';
import { Project, Site, NewAsset, Asset } from '../project';
import { User } from '../user';
import { ProjectDataService } from '../project-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css']
})
export class SiteDetailComponent implements OnInit {
  @Input() site: Site;
  @Input() project: Project;
  
  public newAsset: NewAsset = {
    owner: '',
	assetName: '',
	assetAddress: '',
	lih: 0,
	cau: 0,
	mu: 0,
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
  	if(this.newAsset.assetName && this.newAsset.assetAddress){
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
  
  public onAssetSubmit(): void{
    this.formError='';
    this.newAsset.owner = this.getUserId();
    if(this.formIsValid()){
        console.log(this.newAsset);
        this.projectDataService.addSiteByProjectId(this.project._id, this.site._id, this.newAsset)
            .then((asset: Asset)=>{
                console.log('Asset saved', asset);
                let assets = this.site.assets.slice(0);
                assets.unshift(asset);
                this.sites.assets = assets;
                this.resetAndHideForm();
            });
    } else {
        this.formError = 'All fields required, please try again';
    }
  }
  
  private resetAndHideForm(): void {
    this.formVisible = false;
	this.newAsset.assetName= '';
	this.newAsset.assetAddress= '';
	this.newAsset.lih= 0;
	this.newAsset.cau= 0;
	this.newAsset.mu= 0;
  }

}
