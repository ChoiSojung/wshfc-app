import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project, Site } from './project';
import { User } from './user';
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
    const url: string=`${this.apiBaseUrl}/projects`;
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
  
  public addSiteByProjectId(projectId: string, formData: Site): Promise<Site> {
    const url: string = `${this.apiBaseUrl}/projects/${projectId}/sites`;
    return this.http
      .post(url, formData)
      .toPromise()
      .then(response => response as Site)
      .catch(this.handleError);
  }
  
  public login(user: User): Promise<AuthResponse>{
    return this.makeAuthApiCall('login', user);
  }
  
  public register(user: User): Promise<AuthResponse>{
    return this.makeAuthApiCall('register', user);
  }
  
  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string=`${this.apiBaseUrl}/${urlPath}`;
    return this.http
        .post(url, user)
        .toPromise()
        .then(response => response as AuthResponse)
        .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any>{
    console.error('Something is wrong', error);
    return Promise.reject(error.message || error);
  }
}
