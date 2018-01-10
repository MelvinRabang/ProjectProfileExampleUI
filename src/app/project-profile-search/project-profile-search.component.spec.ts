import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProfileSearchComponent } from './project-profile-search.component';

describe('ProjectProfileSearchComponent', () => {
  let component: ProjectProfileSearchComponent;
  let fixture: ComponentFixture<ProjectProfileSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectProfileSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProfileSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
