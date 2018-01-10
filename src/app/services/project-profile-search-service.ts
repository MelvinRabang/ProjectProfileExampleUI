import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ProjectProfile } from '../project-profile-search/project-profile-search.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectProfileSearchService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private searchProjectProfileUrl = '/api/searchProjectProfiles';

    constructor(private http: Http) { }

    getProfileProfileForSearch(projectSearchProfile: ProjectProfile): Promise<ProjectProfile[]>  {
        return this.http.post(this.searchProjectProfileUrl, projectSearchProfile).toPromise()
            .then(res => res.json() as ProjectProfile[]);
    }
}