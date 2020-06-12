import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project, Site } from './project';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  constructor(private http: HttpClient) { }
  
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
  
  private handleError(error: any): Promise<any>{
    console.error('Something is wrong', error);
    return Promise.reject(error.message || error);
  }
}
