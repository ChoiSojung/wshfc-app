export class NewAsset{
  owner: string;
  siteRef: string;
  assetAddress: string;
  lih: number;
  cau: number;
  mu: number;
}

export class Asset{
  _id: string;
  siteRef: string;
  owner: string;
  created: string;
  assetAddress: string;
  lih: number;
  cau: number;
  mu: number;
}

export class NewSite {
  owner: string;
  projectRef: string;
  siteName: string;
  siteAddress: string;
  legalDesc: string;
  taxId: string;
}

export class Site {
  _id: string;
  owner: string;
  projectRef: string;
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
  projectRef: string;
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
  federalSetAside: string;
  allocationType: string;
  firstCreditYear: string;
  estimatedCredit: number;
  taxCreditFactor: number;
  anticipatedClosing: string;
  totalProjectCost: number;
  totalDevelopmentCost: number;
  totalDevelopmentCostLimit: number;
  tdcWaiver: boolean;
  studio: number;
  oneBdrm: number;
  twoBdrm: number;
  threeBdrm: number;
  fourBdrm: number;
  fiveBdrm: number;
  disabled:number;
  elderly:number;
  homeless:number;
  largehh:number;
  farmworker:number;    
  taxExemptBond: number;
  taxableBond: number;
}

export class Funding {
  _id: string;
  owner: string;
  projectRef: string;
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
  federalSetAside: string;
  allocationType: string;
  firstCreditYear: string;
  estimatedCredit: number;
  taxCreditFactor: number;  
  anticipatedClosing: string;
  totalProjectCost: number;
  totalDevelopmentCost: number;
  totalDevelopmentCostLimit: number;
  tdcWaiver: boolean;  
  studio: number;
  oneBdrm: number;
  twoBdrm: number;
  threeBdrm: number;
  fourBdrm: number;
  fiveBdrm: number;  
  disabled:number;
  elderly:number;
  homeless:number;
  largehh:number;
  farmworker:number;    
  taxExemptBond: number;
  taxableBond: number;
}

