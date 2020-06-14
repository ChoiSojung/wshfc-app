import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project, NewProject, Site, NewSite } from './project';
import { UserCredential } from './user';
import { AuthResponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  constructor(
      private http: HttpClient, 
      @Inject(BROWSER_STORAGE) private storage: Storage) { }
  
  private apiBaseUrl = environment.apiBaseUrl;
  
  public getProjects(): Promise<Project[]>{
    console.log(environment.production);
    const url: string=`${this.apiBaseUrl}/projects`;
    return this.http
        .get(url)
        .toPromise()
        .then(response => response as Project[])
        .catch(this.handleError);
  }
  
  public getProjectsByUser(userId: string): Promise<Project[]>{
    console.log(environment.production);
    const url: string=`${this.apiBaseUrl}/${userId}/projects`;
    return this.http
        .get(url)
        .toPromise()
        .then(response => response as Project[])
        .catch(this.handleError);
  }
  
  public getProjectById(projectId: string): Promise<Project>{
    const url: string=`${this.apiBaseUrl}/projects/${projectId}`;
    return this.http
        .get(url)
        .toPromise()
        .then(response => response as Project)
        .catch(this.handleError);
  }
  
  public addSiteByProjectId(projectId: string, formData: NewSite): Promise<NewSite> {
    const url: string = `${this.apiBaseUrl}/projects/${projectId}/sites`;
    const httpOptions = {
        headers: new HttpHeaders({
            'Authorization': `Bearer ${this.storage.getItem('project-token')}`
        })
    };
    return this.http
      .post(url, formData, httpOptions)
      .toPromise()
      .then(response => response as NewSite)
      .catch(this.handleError);
  }
  
  public addProject(formData: NewProject): Promise<NewProject> {
    const url: string = `${this.apiBaseUrl}/projects`;
    const httpOptions = {
        headers: new HttpHeaders({
            'Authorization': `Bearer ${this.storage.getItem('project-token')}`
        })
    };
    return this.http
      .post(url, formData, httpOptions)
      .toPromise()
      .then(response => response as NewProject)
      .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any>{
    console.error('Something is wrong', error);
    return Promise.reject(error.message || error);
  }
  
  public login(user: UserCredential): Promise<AuthResponse>{
    return this.makeAuthApiCall('login', user);
  }
  
  public register(user: UserCredential): Promise<AuthResponse>{
    return this.makeAuthApiCall('register', user);
  }
  
  private makeAuthApiCall(urlPath: string, user: UserCredential): Promise<AuthResponse> {
    const url: string=`${this.apiBaseUrl}/${urlPath}`;
    return this.http
        .post(url, user)
        .toPromise()
        .then(response => response as AuthResponse)
        .catch(this.handleError);
  }
  
}
