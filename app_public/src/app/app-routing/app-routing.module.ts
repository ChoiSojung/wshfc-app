import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { AboutComponent } from '../about/about.component';
import { HomepageComponent } from '../homepage/homepage.component';
import { ProjectDetailPageComponent } from '../project-detail-page/project-detail-page.component';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { ProjectListComponent } from '../project-list/project-list.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import {
    AuthGuardService as AuthGuard
} from '../auth-guard.service';

const routes: Routes =[
    {
        path: '',
        component: HomepageComponent
    },
    {
        path:'about',
        component: AboutComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'projects',
        component: ProjectListComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'projects/new',
        component: AddProjectComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'project/:projectId',
        component: ProjectDetailPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'contact',
        component: ContactFormComponent
    },
    {
        path: 'profile',
        component: UserProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '', 
        redirectTo:'', 
        pathMatch: 'full'
    },
    {
        path: '**', 
        redirectTo: '', 
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})

export class AppRoutingModule { }
