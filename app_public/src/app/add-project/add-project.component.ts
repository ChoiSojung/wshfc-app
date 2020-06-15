import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectDataService } from '../project-data.service';
import { NewProject, Project } from '../project';
import { User } from '../user';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {  
  public newProject: NewProject = {
    owner: '',
    name: '',
    address: ''
  };
    
  public formError: string;

  public pageContent = {
    header:{
        title:'Start your application',
        strapline: ''
    }
  };

  constructor(
    private projectDataService: ProjectDataService,
    private router: Router,
	private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { }
  
  ngOnInit(){
  }
  
  private formIsValid(): boolean {
    if(this.newProject.name && this.newProject.address){
        return true;
    } else {
        return false;
    }
  }
  
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  
  public getUsername(): string {
    const user: User = this.authenticationService.getCurrentUser();
    return user ? user.name : '';
  }
  
  public getUserId(): string {
    const user: User = this.authenticationService.getCurrentUser();
    return user ? user._id : '';
  }
  
  public onNewProjectSubmit(): void{
    this.formError = '';
    this.newProject.owner = this.getUserId();
    if(this.formIsValid()){
        console.log(this.newProject);
        this.projectDataService.addProject(this.newProject)
            .then((project: Project)=>{
                console.log('Project saved', project);
                this.router.navigate(['../../project/', project._id], {relativeTo: this.route});
            });
    } else {
        this.formError = 'All fields required, please try again';
    }
  }
  

}
