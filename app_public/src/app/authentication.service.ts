import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from './storage';
import { User } from './user';
import { AuthResponse } from './authresponse';
import { ProjectDataService } from './project-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private projectDataService: ProjectDataService
  ) { }
  
  public getToken(): string{
    return this.storage.getItem('project-token');
  }
  
  public saveToken(): string{
    this.storage.setItem('project-token', token);
  }
  
  public login(user: User): Promise<any> {
    return this.projectDataService.login(user)
        .then((authResp: AuthResponse)=> this.saveToken(authResp.token));
  }
  
  
  public register(user: User): Promise<any>{
    return this.projectDataService.register(user)
        .then((authResp: AuthResponse)=> this.saveToken(authResp.token));
  }
  
  public logout():void {
    this.storage.removeItem('project-token');
  }
  
  public isLoggedIn(): boolean{
    const token: string = this.getToken();
    if (token){
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp > (Date.now() / 1000);
    } else {
        return false;
    }
  }
  
  public getCurrentUser(): User{
    if(this.isLoggedIn()){
        const token: string = this.getToken();
        const { email, name } = JSON.parse(atob(token.split('.')[1]));
        return { email, name } as User;
    }
  }
  
  
}
