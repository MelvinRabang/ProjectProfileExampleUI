import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ProjectProfile } from '../project-profile-search/project-profile-search.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectProfileUpdateService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private saveProjectProfileUrl = '/api/saveProjectProfiles';
    private isProjectProfileExistUrl = '/api/isProjectProfileExist';
    private deleteProjectProfileUrl = '/api/deleteProjectProfile';
    private updateProjectProfileUrl = '/api/updateProjectProfile';

    constructor(private http: Http) { }

    saveProjectProfile(projectUpdateProfile: ProjectProfile): Promise<ProjectProfile> {
        return this.http.post(this.saveProjectProfileUrl, projectUpdateProfile).toPromise()
            .then(res => res.json() as ProjectProfile);
    }

    isProjectProfileDoesNotExist(projectUpdateProfile: ProjectProfile) : Promise<boolean> {
        return this.http.post(this.isProjectProfileExistUrl, projectUpdateProfile).toPromise()
            .then(res => res.json() as boolean);
    }

    deleteProjectProfile(projectProfileDeleted: ProjectProfile) : Promise<number> {
        return this.http.post(this.deleteProjectProfileUrl, projectProfileDeleted).toPromise()
            .then(res => res.json() as number);
    }

    updateProjectProfile(projectProfileUpdated: ProjectProfile): Promise<number> {
        return this.http.put(this.updateProjectProfileUrl, projectProfileUpdated).toPromise()
            .then(res => res.json() as number);
    }
}