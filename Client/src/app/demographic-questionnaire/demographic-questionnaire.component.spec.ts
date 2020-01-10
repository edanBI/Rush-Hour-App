import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemographicQuestionnaireComponent } from './demographic-questionnaire.component';

describe('DemographicQuestionnaireComponent', () => {
  let component: DemographicQuestionnaireComponent;
  let fixture: ComponentFixture<DemographicQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemographicQuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemographicQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
