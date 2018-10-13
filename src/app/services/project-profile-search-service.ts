import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ProjectProfile } from '../project-profile-search/project-profile-search.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProjectProfileSearchService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private searchProjectProfileUrl = 'api/projectprofiles';

    constructor(private http: Http) { }

    getProfileProfileForSearch(projectSearchProfile: string): Promise<ProjectProfile[]>  {
        return this.http.get(this.searchProjectProfileUrl + '?query=' + projectSearchProfile).toPromise()
            .then(res => res.json() as ProjectProfile[]);
    }
}