import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { ProjectListComponent } from './project-list/project-list.component';
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectDetailPageComponent } from './project-detail-page/project-detail-page.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AddProjectComponent } from './add-project/add-project.component';


@NgModule({
  declarations: [
    ProjectListComponent,
    FrameworkComponent,
    AboutComponent,
    HomepageComponent,
    HeaderComponent,
    SidebarComponent,
    ProjectDetailComponent,
    ProjectDetailPageComponent,
    RegisterComponent,
    LoginComponent,
    ContactFormComponent,
    UserProfileComponent,
    SideNavComponent,
    AddProjectComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
	HttpClientModule,
	MatStepperModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
