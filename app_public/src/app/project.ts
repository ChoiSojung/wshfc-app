export class Site {
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