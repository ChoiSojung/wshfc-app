import { Component, OnInit, Input } from '@angular/core';
import { Project, NewSite, Site, NewFunding, Funding } from '../project';
import { User } from '../user';
import { ProjectDataService } from '../project-data.service';
import { AuthenticationService } from '../authentication.service';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  @Input() project: Project;
  
  public newSite: NewSite = {
    owner: '',
	projectRef: '',
    siteName: '',
    siteAddress: '',
	legalDesc: '',
	taxId: ''
  };
  
  public newFunding: NewFunding = {
    owner: '',
	projectRef: '',
	sponsor: '',
	cosponsor: '',
	consultant: '',
	program: '',
	contactIsConsultant: false,
	ownership: '',
	ownershipType: '',
	ownershipState: '',
	lender: '',
	investor: '',
	previousCommissionFinancing: false,
	dda: '',
	qct: '',
	federalSetAside: '',
	allocationType: '',
	firstCreditYear: '',
	estimatedCredit: 0,
	taxCreditFactor: 0,
	anticipatedClosing: '',
	totalProjectCost: 0,
	totalDevelopmentCost: 0,
	totalDevelopmentCostLimit: 0,
	tdcWaiver: false,
	studio: 0,
	oneBdrm: 0,
	twoBdrm: 0,
	threeBdrm: 0,
	fourBdrm: 0,
	fiveBdrm: 0,
	disabled:0,
	elderly:0,
	homeless:0,
	largehh:0,
	farmworker:0,    
	taxExemptBond: 0,
	taxableBond: 0
  };
  
  public siteFormVisible: boolean = false;
  public siteFormError: string;
  
  public fundingFormError: string;
  
  fundingForm: FormGroup = this.fb.group({
	sponsor: [null],
	cosponsor: [null],
	consultant: [null],
	program: [null],
	contactIsConsultant: false,
	ownership: [null],
	ownershipType: [null],
	ownershipState: [null],
	lender: [null],
	investor: [null],
	previousCommissionFinancing: false,
	dda: [null],
	qct: [null],
	federalSetAside: [null],
	allocationType: [null],
	firstCreditYear: [null],
	estimatedCredit: 0,
	taxCreditFactor: 0,
	anticipatedClosing: [null],
	totalProjectCost: 0,
	totalDevelopmentCost: 0,
	totalDevelopmentCostLimit: 0,
	tdcWaiver: false,
	studio: 0,
	oneBdrm: 0,
	twoBdrm: 0,
	threeBdrm: 0,
	fourBdrm: 0,
	fiveBdrm: 0,
	disabled:0,
	elderly:0,
	homeless:0,
	largehh:0,
	farmworker:0,    
	taxExemptBond: 0,
	taxableBond: 0
  })

  constructor(
    private projectDataService: ProjectDataService,
    private authenticationService: AuthenticationService,
	private fb: FormBuilder
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
	this.newSite.projectRef = this.project._id;
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
  
  public onFundingSubmit(): void{
    this.fundingFormError='';
    this.newFunding.owner = this.getUserId();
	this.newFunding.projectRef = this.project._id;
	this.project.status = "Submitted";
	this.setNewFundingValues();
    
	this.projectDataService.addFundingByProjectId(this.project._id, this.newFunding)
		.then((funding: Funding)=>{
			console.log('Funding saved', funding);
			let fundings = this.project.fundings.slice(0);
			fundings.unshift(funding);
			this.project.fundings = fundings;
			this.fundingForm.disable();
		});
  
  }
  
  programList: any = [
  	{id: 1, name: 'Bonds with 4% Tax Credits'},
	{id: 2, name: '9% Tax Credits'}
  ];
  
  allocationTypeList: any = [
  	{id: 1, name: 'New Construction with Federal Subsidies'},
	{id: 2, name: 'New Construction without Federal Subsidies'},
	{id: 3, name: 'Acquisition/Rehab with Federal Subsidies'},
	{id: 4, name: 'Acquisition/Rehab without Federal Subsidies'}
  ];
  
  setAsideList: any = [
  	{id: 1, name: '40% at 60% AMI'},
	{id: 2, name: '20% at 50% AMI'}
  ];
  
  private resetAndHideSiteForm(): void {
    this.siteFormVisible = false;
    this.newSite.siteName = '';
    this.newSite.siteAddress = '';
	this.newSite.legalDesc = '';
	this.newSite.taxId = '';
  }
  
  private setNewFundingValues():void{
    this.newFunding.sponsor = this.fundingForm.get('sponsor').value;
	this.newFunding.program = this.fundingForm.get('program').value;
  	this.newFunding.cosponsor = this.fundingForm.get('cosponsor').value;
	this.newFunding.consultant  = this.fundingForm.get('consultant').value;
	this.newFunding.ownership  = this.fundingForm.get('ownership').value;
	this.newFunding.lender  = this.fundingForm.get('lender').value;
	this.newFunding.investor  = this.fundingForm.get('investor').value;
	this.newFunding.federalSetAside = this.fundingForm.get('federalSetAside').value;
	this.newFunding.allocationType = this.fundingForm.get('allocationType').value;
	this.newFunding.firstCreditYear = this.fundingForm.get('firstCreditYear').value;
	this.newFunding.estimatedCredit = this.fundingForm.get('estimatedCredit').value;
	this.newFunding.taxCreditFactor = this.fundingForm.get('taxCreditFactor').value;
	this.newFunding.anticipatedClosing = this.fundingForm.get('anticipatedClosing').value;
	this.newFunding.totalProjectCost = this.fundingForm.get('totalProjectCost').value;
	this.newFunding.totalDevelopmentCost = this.fundingForm.get('totalDevelopmentCost').value;
	this.newFunding.totalDevelopmentCostLimit = this.fundingForm.get('totalDevelopmentCostLimit').value;
	this.newFunding.studio = this.fundingForm.get('studio').value;
	this.newFunding.oneBdrm = this.fundingForm.get('oneBdrm').value;
	this.newFunding.twoBdrm = this.fundingForm.get('twoBdrm').value;
	this.newFunding.threeBdrm = this.fundingForm.get('threeBdrm').value;
	this.newFunding.fourBdrm = this.fundingForm.get('fourBdrm').value;
	this.newFunding.fiveBdrm = this.fundingForm.get('fiveBdrm').value;
	this.newFunding.disabled = this.fundingForm.get('elderly').value;
	this.newFunding.elderly = this.fundingForm.get('disabled').value;
	this.newFunding.homeless = this.fundingForm.get('homeless').value;
	this.newFunding.largehh = this.fundingForm.get('largehh').value;
	this.newFunding.farmworker = this.fundingForm.get('farmworker').value;   
  
  }
  
}
