export class Site {
  siteName: string;
  siteAddress: string;
  owner: string;
}

export class Project {
  _id: string;
  name: string;
  address: string;
  status: string;
  owner: string;
  created: string;
  sites: Site[];
}

export class NewProject {
  name: string;
  address: string;
  owner: string;
}