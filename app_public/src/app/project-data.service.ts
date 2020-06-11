import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Project } from './project-list/project-list.component';


@Injectable({
  providedIn: 'root'
})
export class ProjectDataService {

  constructor(private http: HttpClient) { }
  
  private apiBaseUrl = 'http://localhost:3000/api';
  
  public getProjects(): Promise<Project[]>{
    const url: string=`${this.apiBaseUrl}/projects`;
    return this.http
        .get(url)
        .toPromise()
        .then(response => response as Project[])
        .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any>{
    console.error('Something is wrong', error);
    return Promise.reject(error.message || error);
  }
}
