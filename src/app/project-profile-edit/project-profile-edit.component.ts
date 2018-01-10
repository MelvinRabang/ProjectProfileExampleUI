import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProjectProfile } from '../project-profile-search/project-profile-search.model';
import { ProjectProfileUpdateService } from '../services/project-profile-update-service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ProjectProfileSearchService } from '../services/project-profile-search-service';
import { Routes, RouterModule } from '@angular/router';

@Component({
  selector: 'project-profile-edit',
  templateUrl: './project-profile-edit.component.html',
  styleUrls: ['./project-profile-edit.component.css'],
  providers: [ ProjectProfileUpdateService ]
})
export class ProjectProfileEditComponent implements OnInit {

  @Output() editCloseMessageClick = new EventEmitter<boolean>();
  @Input('editProfile') editProfile: ProjectProfile;
  editProjProfilePopulate: ProjectProfile = new ProjectProfile();
  projectProfileEditFormGroup: FormGroup;
  isProjectProfileUpdateFormGroupValid: boolean;
  isProjectProfileDoesNotExist: boolean;
  isCloseEditProjProfile: boolean;
  projectProfileName: FormControl;
  isInvalidDeleteProjectProfilePopupAppear: boolean;
  isValidDeleteProjectProfilePopupAppear: boolean;
  isInvalidUpdateProjectProfilePopupAppear: boolean;
  isValidUpdateProjectProfilePopupAppear: boolean;

  constructor(private projectProfileEditFormBuilder: FormBuilder, private projectProfileUpdateService: ProjectProfileUpdateService) {
    this.projectProfileEditFormGroup = this.projectProfileEditFormBuilder.group({
      projectProfileName: [''],
      projectProfileSubTeamName: [''],
      projectProfileIndustryGroup: [''],
      projectProfileSeniorExec: [''],
      projectProfileDeliveryLead: [''],
      projectProfileFirstPointContact: [''],
      projectProfileSecondPointContact: [''],
      projectProfileProjectLocation: ['']
    });
    this.isInvalidDeleteProjectProfilePopupAppear = false;
    this.isValidDeleteProjectProfilePopupAppear = false;
    this.isInvalidUpdateProjectProfilePopupAppear = false;
    this.isValidUpdateProjectProfilePopupAppear = false;
  }

  ngOnInit() {
    this.projectProfileEditFormGroup.controls['projectProfileName'].setValue(this.editProfile.projectProfileName);
    this.projectProfileEditFormGroup.controls['projectProfileSubTeamName'].setValue(this.editProfile.projectProfileSubTeamName);
    this.projectProfileEditFormGroup.controls['projectProfileIndustryGroup'].setValue(this.editProfile.projectProfileIndustryGroup);
    this.projectProfileEditFormGroup.controls['projectProfileSeniorExec'].setValue(this.editProfile.projectProfileSeniorExec);
    this.projectProfileEditFormGroup.controls['projectProfileDeliveryLead'].setValue(this.editProfile.projectProfileDeliveryLead);
    this.projectProfileEditFormGroup.controls['projectProfileFirstPointContact'].setValue(this.editProfile.projectProfileFirstPointContact);
    this.projectProfileEditFormGroup.controls['projectProfileSecondPointContact'].setValue(this.editProfile.projectProfileSecondPointContact);
    this.projectProfileEditFormGroup.controls['projectProfileProjectLocation'].setValue(this.editProfile.projectProfileProjectLocation);
  }

  deleteProjectProfile(deleteProjectProfile: ProjectProfile) {
    this.isProjectProfileUpdateFormGroupValid = this.validateDeleteProjectProfileFields(deleteProjectProfile, this.editProfile);
    if (this.isProjectProfileUpdateFormGroupValid) {
      this.projectProfileUpdateService.deleteProjectProfile(deleteProjectProfile).then(deletedProjectString => { 
        this.showPopUpForValidDeleteProjectProfile();
      });
    } else {
      this.showPopUpForInvalidDeleteProjectProfile();
    }
  }

  updateProjectProfile(updateProjectProfile: ProjectProfile) {
    this.isProjectProfileUpdateFormGroupValid = this.validateUpdateProjectProfileFields(updateProjectProfile, this.editProfile);
    if (this.isProjectProfileUpdateFormGroupValid) {
      this.projectProfileUpdateService.updateProjectProfile(updateProjectProfile).then(updateProjectProfile => { 
        this.showPopUpForValidUpdateProjectProfile();
      });
    } else {
      this.showPopUpForInvalidUpdateProjectProfile();
    }
  }

  showPopUpForValidUpdateProjectProfile() {
    this.isValidUpdateProjectProfilePopupAppear = true;
  }

  showPopUpForInvalidUpdateProjectProfile() {
    this.isInvalidUpdateProjectProfilePopupAppear = true;
  }

  closeInvalidUpdateProjectProfilePopUp() {
    this.isInvalidUpdateProjectProfilePopupAppear = false;
  }

  closeValidUpdateProjectProfilePopUp() {
    this.isValidUpdateProjectProfilePopupAppear = false;
    this.editCloseMessageClick.emit(this.isCloseEditProjProfile);
  }

  showPopUpForValidDeleteProjectProfile() {
    this.isValidDeleteProjectProfilePopupAppear = true;
  }

  closeValidDeleteProjectProfilePopUp() {
    this.isValidDeleteProjectProfilePopupAppear = false;
    this.editCloseMessageClick.emit(this.isCloseEditProjProfile);
  }

  showPopUpForInvalidDeleteProjectProfile() {
    this.isInvalidDeleteProjectProfilePopupAppear = true;
  }

  closeInvalidDeleteProjectProfilePopUp() {
    this.isInvalidDeleteProjectProfilePopupAppear = false;
  }

  validateDeleteProjectProfileFields(updateProjectProfile: ProjectProfile, editProjectProfile: ProjectProfile) {
    let isProjectProfileValid: boolean = true;
    if (updateProjectProfile.projectProfileDeliveryLead == '' ||
          updateProjectProfile.projectProfileDeliveryLead !==  editProjectProfile.projectProfileDeliveryLead){
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileFirstPointContact == '' ||
        updateProjectProfile.projectProfileFirstPointContact !==  editProjectProfile.projectProfileFirstPointContact){
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileIndustryGroup == '' ||
        updateProjectProfile.projectProfileIndustryGroup !==  editProjectProfile.projectProfileIndustryGroup){
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileName == '' ||
        updateProjectProfile.projectProfileName !==  editProjectProfile.projectProfileName){
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileProjectLocation == '' ||
        updateProjectProfile.projectProfileProjectLocation !==  editProjectProfile.projectProfileProjectLocation){
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileSecondPointContact == '' ||
        updateProjectProfile.projectProfileSecondPointContact !==  editProjectProfile.projectProfileSecondPointContact){
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileSeniorExec == '' ||
        updateProjectProfile.projectProfileSeniorExec !==  editProjectProfile.projectProfileSeniorExec){
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileSubTeamName == '' ||
        updateProjectProfile.projectProfileSubTeamName !==  editProjectProfile.projectProfileSubTeamName){
      isProjectProfileValid = false;
    }
    return isProjectProfileValid;
  }

  validateUpdateProjectProfileFields(updateProjectProfile: ProjectProfile, editProjectProfile: ProjectProfile) {
    let isProjectProfileValid: boolean = true;
    if (updateProjectProfile.projectProfileDeliveryLead == ''){
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileFirstPointContact == ''){
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileIndustryGroup == ''){
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileName == ''){
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileProjectLocation == ''){
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileSecondPointContact == ''){
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileSeniorExec == ''){
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileSubTeamName == ''){
      isProjectProfileValid = false;
    }
    return isProjectProfileValid;
  }

  closeEditProjProfile() {
    this.isCloseEditProjProfile = false;
    this.editCloseMessageClick.emit(this.isCloseEditProjProfile);
  }
}
