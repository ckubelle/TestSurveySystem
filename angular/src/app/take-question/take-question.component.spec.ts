import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakeQuestionComponent } from './take-question.component';

describe('TakeQuestionComponent', () => {
  let component: TakeQuestionComponent;
  let fixture: ComponentFixture<TakeQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakeQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
