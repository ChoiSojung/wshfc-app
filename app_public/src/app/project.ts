export class NewAsset{
  owner: string;
  assetName: string;
  assetAddress: string;
  lih: number;
  cau: number;
  mu: number;
}

export class Asset{
  _id: string;
  owner: string;
  created: string;
  assetName: string;
  assetAddress: string;
  lih: number;
  cau: number;
  mu: number;
}

export class NewSite {
  owner: string;
  siteName: string;
  siteAddress: string;
  legalDesc: string;
  taxId: string;
}

export class Site {
  _id: string;
  owner: string;
  created: string;
  siteName: string;
  siteAddress: string;
  legalDesc: string;
  taxId: string;
  assets: Asset [];
}

export class NewProject {
  owner: string;
  name: string;
  address: string;
}

export class Project {
  _id: string;
  owner: string;
  created: string;
  name: string;
  address: string;
  status: string;
  sites: Site[];
  fundings: Funding[];
}

export class NewFunding {
  owner: string;
  sponsor: string;
  cosponsor: string;
  consultant: string;
  program: string;
  contactIsConsultant: boolean;
  ownership: string;
  ownershipType: string;
  ownershipState: string;
  lender: string;
  investor: string;
  
  previousCommissionFinancing: boolean;
  dda: string;
  qct: string;
  
  //credit
  federalSetAside: string;
  allocationType: string;
  firstCreditYear: string;
  estimatedCredit: number;
  taxCreditFactor: number;
  
  //tdc
  anticipatedClosing: string;
  totalProjectCost: number;
  totalDevelopmentCost: number;
  totalDevelopmentCostLimit: number;
  tdcWaiver: boolean;
  
  //units
  studios: number;
  oneBdrms: number;
  twoBdrms: number;
  threeBdrms: number;
  fourBdrms: number;
  fiveBdrms: number;
  
  //set-asides
  disabled:number;
  elderly:number;
  homeless:number;
  largehh:number;
  farmworker:number;
    
  //bond
  taxExemptBond: number;
  taxableBond: number;
}

export class Funding {
  _id: string;
  owner: string;
  created: string;
  sponsor: string;
  cosponsor: string;
  consultant: string;
  program: string;
  contactIsConsultant: boolean;
  ownership: string;
  ownershipType: string;
  ownershipState: string;
  lender: string;
  investor: string;
  
  previousCommissionFinancing: boolean;
  dda: string;
  qct: string;
  
  //credit
  federalSetAside: string;
  allocationType: string;
  firstCreditYear: string;
  estimatedCredit: number;
  taxCreditFactor: number;
  
  //tdc
  anticipatedClosing: string;
  totalProjectCost: number;
  totalDevelopmentCost: number;
  totalDevelopmentCostLimit: number;
  tdcWaiver: boolean;
  
  //units
  studio: number;
  oneBdrm: number;
  twoBdrm: number;
  threeBdrm: number;
  fourBdrm: number;
  fiveBdrm: number;
  
  //set-asides
  disabled:number;
  elderly:number;
  homeless:number;
  largehh:number;
  farmworker:number;
    
  //bond
  taxExemptBond: number;
  taxableBond: number;
}

