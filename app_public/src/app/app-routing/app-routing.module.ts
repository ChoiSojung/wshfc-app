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
        path: 'project/:projectId',
        component: ProjectDetailPageComponent
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
        component: ProjectListComponent
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
    { path: '**', redirectTo: ''}
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
