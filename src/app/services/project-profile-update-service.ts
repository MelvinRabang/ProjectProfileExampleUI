import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ProjectProfile } from '../project-profile-search/project-profile-search.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectProfileUpdateService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private projectProfileUrl = '/api/projectprofiles';

    constructor(private http: Http) { }

    saveProjectProfile(projectUpdateProfile: ProjectProfile): Promise<ProjectProfile> {
        return this.http.post(this.projectProfileUrl, projectUpdateProfile).toPromise()
            .then(res => res.json() as ProjectProfile);
    }

    deleteProjectProfile(projectProfileDeleted: ProjectProfile) : Promise<number> {
        return this.http.delete(this.projectProfileUrl, new RequestOptions({
            headers: this.headers,
            body: projectProfileDeleted
         })).toPromise()
            .then(res => res.json() as number);
    }

    updateProjectProfile(projectProfileUpdated: ProjectProfile): Promise<number> {
        return this.http.put(this.projectProfileUrl, projectProfileUpdated).toPromise()
            .then(res => res.json() as number);
    }
}