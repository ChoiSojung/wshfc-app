import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ProjectListComponent } from './project-list/project-list.component';

@NgModule({
  declarations: [
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [ProjectListComponent]
})
export class AppModule { }
