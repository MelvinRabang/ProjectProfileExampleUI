import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ProjectProfileSearchComponent } from './project-profile-search/project-profile-search.component';
import { ProjectProfileAddAndUpdateComponent } from './project-profile-add-and-update/project-profile-add-and-update.component';
import { ProjectProfileEditComponent } from './project-profile-edit/project-profile-edit.component';
import { ProjectProfileSearchService } from './services/project-profile-search-service';
import { ProjectProfileUpdateService } from './services/project-profile-update-service';

@NgModule({
  declarations: [
    ProjectProfileSearchComponent,
    ProjectProfileAddAndUpdateComponent,
    ProjectProfileEditComponent
  ],
  imports: [
    BrowserModule, 
    DataTableModule, 
    ReactiveFormsModule, 
    HttpModule
  ],
  providers: [ProjectProfileSearchService, ProjectProfileUpdateService],
  bootstrap: [ProjectProfileSearchComponent]
})
export class AppModule { }
