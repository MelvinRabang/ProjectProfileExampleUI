import { Component, OnInit } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ProjectProfile } from './project-profile-search.model';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ProjectProfileSearchService } from '../services/project-profile-search-service';
import { ProjectProfileEditComponent } from '../project-profile-edit/project-profile-edit.component';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'project-profile-search',
  templateUrl: './project-profile-search.component.html',
  styleUrls: ['./project-profile-search.component.css'],
  providers: [ ProjectProfileSearchService ],
})
export class ProjectProfileSearchComponent implements OnInit {
  projectProfiles: ProjectProfile[];
  projectProfileSearchFormGroup: FormGroup;
  isProjProfileAddAppear: boolean;
  isProjProfileEditAppear: boolean;
  editProfile: ProjectProfile;
  editProjProfilePopulate: ProjectProfile = new ProjectProfile();
  isInvalidProjectProfilePopupAppear: boolean;
  projectQueryString: string = '';

  constructor(projectProfileSearchFormBuilder: FormBuilder, private projectProfileSearchService: ProjectProfileSearchService) {
    this.projectProfileSearchFormGroup = projectProfileSearchFormBuilder.group({
      projectProfileName: [''],
      projectProfileSubTeamName: [''],
      projectProfileDeliveryLead: [''],
      projectProfileProjectLocation: [''],
      projectProfileIndustryGroup: [''],
      projectProfileSeniorExec: ['']
    });
    this.projectProfiles = [];
    this.isProjProfileAddAppear = false;
    this.isProjProfileEditAppear = false;
    this.isInvalidProjectProfilePopupAppear = false;
  }

  ngOnInit() {
  }

  addButtonAction() {
    this.isProjProfileAddAppear = true;
  }

  searchButtonAction(projectSearchProfile: ProjectProfile) {
    this.convertProjectSearchProfileToQueryString(projectSearchProfile);
    this.projectProfiles = [];
    this.projectProfileSearchService.getProfileProfileForSearch(this.projectQueryString).then(data => {
        this.projectProfiles = data;
        if (this.projectProfiles == null || this.projectProfiles.length == 0) {
          this.isInvalidProjectProfilePopupAppear = true;
        }
      },
      error => {
        this.isInvalidProjectProfilePopupAppear = true;
      }
    );
  }

  convertProjectSearchProfileToQueryString(projectSearchProfile: ProjectProfile) {
    if (this.isInputNotEmptyOrUndefined(projectSearchProfile.projectProfileDeliveryLead)) {
      this.projectQueryString += 'deliverylead=' + projectSearchProfile.projectProfileDeliveryLead + ',';
    }
    if (this.isInputNotEmptyOrUndefined(projectSearchProfile.projectProfileIndustryGroup)) {
      this.projectQueryString += 'industrygroup=' + projectSearchProfile.projectProfileIndustryGroup + ',';
    }
    if (this.isInputNotEmptyOrUndefined(projectSearchProfile.projectProfileName)) {
      this.projectQueryString += 'profilename=' + projectSearchProfile.projectProfileName + ',';
    }
    if (this.isInputNotEmptyOrUndefined(projectSearchProfile.projectProfileProjectLocation)) {
      this.projectQueryString += 'projectlocation=' + projectSearchProfile.projectProfileProjectLocation + ',';
    }
    if (this.isInputNotEmptyOrUndefined(projectSearchProfile.projectProfileSeniorExec)) {
      this.projectQueryString += 'seniorexec=' + projectSearchProfile.projectProfileSeniorExec + ',';
    }
    if (this.isInputNotEmptyOrUndefined(projectSearchProfile.projectProfileSubTeamName)) {
      this.projectQueryString += 'subteamname=' + projectSearchProfile.projectProfileSubTeamName + ',';
    }
  }

  closeInvalidProjectProfilePopUp() {
    this.isInvalidProjectProfilePopupAppear = false;
  }

  receiveMessage($event) {
    this.projectProfiles = [];
    this.isProjProfileAddAppear = $event;
    this.settingEmptySerchProjectProfileFormGroup();
  }

  receiveEditCloseMessage($event) {
    this.projectProfiles = [];
    this.isProjProfileEditAppear = $event;
    this.settingEmptySerchProjectProfileFormGroup();
  }

  settingEmptySerchProjectProfileFormGroup() {
    this.projectProfileSearchFormGroup.controls['projectProfileName'].setValue('');
    this.projectProfileSearchFormGroup.controls['projectProfileSubTeamName'].setValue('');
    this.projectProfileSearchFormGroup.controls['projectProfileIndustryGroup'].setValue('');
    this.projectProfileSearchFormGroup.controls['projectProfileSeniorExec'].setValue('');
    this.projectProfileSearchFormGroup.controls['projectProfileDeliveryLead'].setValue('');
    this.projectProfileSearchFormGroup.controls['projectProfileFirstPointContact'].setValue('');
    this.projectProfileSearchFormGroup.controls['projectProfileSecondPointContact'].setValue('');
    this.projectProfileSearchFormGroup.controls['projectProfileProjectLocation'].setValue('');
  }

  openProjectProfileEditScreen(row: ProjectProfile) {
    this.isProjProfileEditAppear = true;
    this.editProfile = row;
  }

  isInputNotEmptyOrUndefined(input: string) {
    return (input != undefined && input.length > 0) || input != '';
  }
}
