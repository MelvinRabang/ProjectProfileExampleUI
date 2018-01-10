import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProjectProfile } from '../project-profile-search/project-profile-search.model';
import { ProjectProfileUpdateService } from '../services/project-profile-update-service';

@Component({
  selector: 'project-profile-add-and-update',
  templateUrl: './project-profile-add-and-update.component.html',
  styleUrls: ['./project-profile-add-and-update.component.css'],
  providers: [ ProjectProfileUpdateService ]
})
export class ProjectProfileAddAndUpdateComponent implements OnInit {

  @Output() messageClick = new EventEmitter<boolean>();
  isCloseAddAndUpdateProjProfile: boolean;
  projectProfileUpdateFormGroup: FormGroup;
  isProjectProfileUpdateFormGroupValid: boolean;
  isProjectProfileDoesNotExist: boolean;
  projectProfileForUpdate: ProjectProfile;
  isInvalidProjectProfilePopupAppear: boolean;
  isValidProjectProfilePopupAppear: boolean;

  constructor(private projectProfileUpdateFormBuilder: FormBuilder, private projectProfileUpdateService: ProjectProfileUpdateService) {
    this.projectProfileUpdateFormGroup = this.projectProfileUpdateFormBuilder.group({
      projectProfileName: [''],
      projectProfileSubTeamName: [''],
      projectProfileIndustryGroup: [''],
      projectProfileSeniorExec: [''],
      projectProfileDeliveryLead: [''],
      projectProfileFirstPointContact: [''],
      projectProfileSecondPointContact: [''],
      projectProfileProjectLocation: ['']
    });
    this.isInvalidProjectProfilePopupAppear = false;
    this.isValidProjectProfilePopupAppear = false;
   }

  ngOnInit() {
  }

  closeAddAndUpdateProjProfile() {
    this.isCloseAddAndUpdateProjProfile = false;
    this.messageClick.emit(this.isCloseAddAndUpdateProjProfile);
  }

  saveProjectProfile(updateProjectProfile: ProjectProfile) {
    this.isProjectProfileUpdateFormGroupValid = 
        this.validateAddProjectProfileFields(updateProjectProfile);
    this.isProjectProfileDoesNotExist =
        this.checkIfProjectProfileDoesNotExist(updateProjectProfile);
    if (this.isProjectProfileUpdateFormGroupValid && !this.isProjectProfileDoesNotExist) {
      this.projectProfileUpdateService.saveProjectProfile(updateProjectProfile).then(projectProfileForUpdate => {
        this.projectProfileForUpdate = projectProfileForUpdate;
        this.showPopUpForValidUpdateProjectProfile();
      });
    } else {
      this.showPopUpForInvalidUpdateProjectProfile();
    }
  }

  showPopUpForValidUpdateProjectProfile() {
    this.isValidProjectProfilePopupAppear = true;
  }

  closeValidProjectProfilePopUp() {
    this.isValidProjectProfilePopupAppear = false;
    this.messageClick.emit(this.isCloseAddAndUpdateProjProfile);
  }

  showPopUpForInvalidUpdateProjectProfile() {
    this.isInvalidProjectProfilePopupAppear = true;
  }

  closeInvalidProjectProfilePopUp() {
    this.isInvalidProjectProfilePopupAppear = false;
  }

  checkIfProjectProfileDoesNotExist(updateProjectProfile: ProjectProfile) {
    let projectDoesNotExistLocal: boolean = false;
    this.projectProfileUpdateService.isProjectProfileDoesNotExist(updateProjectProfile).then(projectDoesNotExist => {
      projectDoesNotExistLocal = projectDoesNotExist;
    });
    return projectDoesNotExistLocal;
  }

  validateAddProjectProfileFields(updateProjectProfile: ProjectProfile) {
    let isProjectProfileValid: boolean = true;
    if (updateProjectProfile.projectProfileDeliveryLead == '') {
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileFirstPointContact == '') {
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileIndustryGroup == '') {
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileName == '') {
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileProjectLocation == '') {
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileSecondPointContact == '') {
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileSeniorExec == '') {
      isProjectProfileValid = false;
    }
    if (updateProjectProfile.projectProfileSubTeamName == '') {
      isProjectProfileValid = false;
    }
    return isProjectProfileValid;
  }
}
