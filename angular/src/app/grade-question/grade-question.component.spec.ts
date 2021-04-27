import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeQuestionComponent } from './grade-question.component';

describe('GradeQuestionComponent', () => {
  let component: GradeQuestionComponent;
  let fixture: ComponentFixture<GradeQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradeQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
