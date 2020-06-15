import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Project, Site, NewAsset, Asset } from '../project';
import { User } from '../user';
import { ProjectDataService } from '../project-data.service';
import { AuthenticationService } from '../authentication.service';
import { HistoryService } from '../history.service';

@Component({
  selector: 'app-site-detail',
  templateUrl: './site-detail.component.html',
  styleUrls: ['./site-detail.component.css']
})
export class SiteDetailComponent implements OnInit {
  @Input() site: Site;
  
  public newAsset: NewAsset = {
    owner: '',
	siteRef: '',
	assetAddress: '',
	lih: 0,
	cau: 0,
	mu: 0,
  };
  
  public assetFormVisible: boolean = false;
  public assetFormError: string;

  constructor(
    private projectDataService: ProjectDataService,
    private authenticationService: AuthenticationService,
	private historyService: HistoryService,
	private router: Router
    ) { }

  ngOnInit() {
  }
  
  private assetFormIsValid(): boolean {
  	if(this.newAsset.assetAddress){
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
    this.assetFormError='';
    this.newAsset.owner = this.getUserId();
	this.newAsset.siteRef = this.site._id;
    if(this.assetFormIsValid()){
        console.log(this.newAsset);
        this.projectDataService.addAssetByProjectId(this.site.projectRef, this.site._id, this.newAsset)
            .then((asset: Asset)=>{
                console.log('Asset saved', asset);
                let assets = this.site.assets.slice(0);
                assets.unshift(asset);
                this.site.assets = assets;
                this.resetAndHideAssetForm();
            });
    } else {
        this.assetFormError = 'All fields required, please try again';
    }
  }
  
  public wizard(): void {
  	this.router.navigateByUrl(this.historyService.getPreviousUrl());
  }
  
  private resetAndHideAssetForm(): void {
    this.assetFormVisible = false;
	this.newAsset.assetAddress= '';
	this.newAsset.lih= 0;
	this.newAsset.cau= 0;
	this.newAsset.mu= 0;
  }

}
