import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ProjectProfile } from '../project-profile-search/project-profile-search.model';
import { ProjectProfileUpdateService } from '../services/project-profile-update-service';
import { ProjectProfileSearchService } from '../services/project-profile-search-service';

@Component({
  selector: 'project-profile-add-and-update',
  templateUrl: './project-profile-add-and-update.component.html',
  styleUrls: ['./project-profile-add-and-update.component.css'],
  providers: [ ProjectProfileUpdateService, ProjectProfileSearchService ]
})
export class ProjectProfileAddAndUpdateComponent implements OnInit {

  @Output() messageClick = new EventEmitter<boolean>();
  isCloseAddAndUpdateProjProfile: boolean;
  projectProfileUpdateFormGroup: FormGroup;
  isProjectProfileUpdateFormGroupValid: boolean;
  isProjectProfileDoesNotExist: boolean = false;
  projectProfileForUpdate: ProjectProfile;
  isInvalidProjectProfilePopupAppear: boolean;
  isValidProjectProfilePopupAppear: boolean;
  projectQueryString: string = '';
  testProjectProfile: ProjectProfile[];

  constructor(private projectProfileUpdateFormBuilder: FormBuilder, private projectProfileUpdateService: ProjectProfileUpdateService,
    private projectProfileSearchService: ProjectProfileSearchService) {
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
    console.log("this.isProjectProfileUpdateFormGroupValid" + this.isProjectProfileUpdateFormGroupValid);
    
    this.checkIfProjectProfileDoesNotExist(updateProjectProfile);
    console.log("This is working" + this.isProjectProfileDoesNotExist);
/**   if (this.isProjectProfileUpdateFormGroupValid && !this.isProjectProfileDoesNotExist) {
      this.projectProfileUpdateService.saveProjectProfile(updateProjectProfile).then(projectProfileForUpdate => {
        this.projectProfileForUpdate = projectProfileForUpdate;
        this.showPopUpForValidUpdateProjectProfile();
      });
    } else {
      this.showPopUpForInvalidUpdateProjectProfile();
    }**/
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
    this.convertProjectSearchProfileToQueryString(updateProjectProfile)
    this.projectProfileSearchService.getProfileProfileForSearch(this.projectQueryString).then(projectDoesNotExist => {
      this.testProjectProfile = projectDoesNotExist;
      if (this.testProjectProfile != null && this.testProjectProfile != undefined) {
        this.isProjectProfileDoesNotExist =  (this.testProjectProfile.length > 0);
      }
      this.updateValidOrInvalidProject(updateProjectProfile);
    });
  }

  updateValidOrInvalidProject(updateProjectProfile: ProjectProfile) {
    if (this.isProjectProfileUpdateFormGroupValid && !this.isProjectProfileDoesNotExist) {
      this.projectProfileUpdateService.saveProjectProfile(updateProjectProfile).then(projectProfileForUpdate => {
        this.projectProfileForUpdate = projectProfileForUpdate;
        this.showPopUpForValidUpdateProjectProfile();
      });
    } else {
      this.showPopUpForInvalidUpdateProjectProfile();
    }
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

  isInputNotEmptyOrUndefined(input: string) {
    return (input != undefined && input.length > 0) || input != '';
  }

}
