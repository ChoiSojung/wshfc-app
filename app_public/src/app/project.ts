export class Site {
  owner: string;
  siteName: string;
  siteAddress: string
}

export class Project {
  _id: string;
  name: string;
  address: string;
  status: string;
  sites: Site[];
}