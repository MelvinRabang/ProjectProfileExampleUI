import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProfileAddAndUpdateComponent } from './project-profile-add-and-update.component';

describe('ProjectProfileAddAndUpdateComponent', () => {
  let component: ProjectProfileAddAndUpdateComponent;
  let fixture: ComponentFixture<ProjectProfileAddAndUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectProfileAddAndUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProfileAddAndUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
