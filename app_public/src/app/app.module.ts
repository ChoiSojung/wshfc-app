import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing/app-routing.module';

import { ProjectListComponent } from './project-list/project-list.component';
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectDetailPageComponent } from './project-detail-page/project-detail-page.component';

@NgModule({
  declarations: [
    ProjectListComponent,
    FrameworkComponent,
    AboutComponent,
    HomepageComponent,
    HeaderComponent,
    SidebarComponent,
    ProjectDetailComponent,
    ProjectDetailPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
