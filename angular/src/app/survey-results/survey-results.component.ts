import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SurveyResults } from './surveyresultshelper';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.scss'],
})
export class SurveyResultsComponent implements OnInit {
  formTaking: FormGroup;
  surveyTitle: string;
  mySurveysTakenArray: Array<FormGroup>;
  //item$: Observable<any[]>;
  item$: Observable<any[]>;
  loading = false;
  success = false;
  id: string;
  testTitle: string;
  testArray: Array<SurveyResults>;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
      this.testTitle = params.testTitle;
    });
   // this.item$ = afs.collection('testsTaken').valueChanges();
      
      this.item$ = afs.collection('testsTaken', ref => ref.where('testCreator', '==', this.id).where('testTitle', '==', this.testTitle)).valueChanges();
      this.item$.subscribe(x => 
        {this.testArray = x;
          console.log(this.testArray);
        });

  }

  
  

  ngOnInit(): void {}
  
  //Getter for all of the questions in a form
  get questionForms() {
    return this.formTaking.get('questions') as FormArray;
  }

  //Getter for the title of the test
  get gettertestTitle() {
    return this.formTaking.get('testTitle');
  }

  //Getter for the type of form (quiz or test)
  get formTypeSelection() {
    return this.formTaking.get('formTypeSelection');
  }

  //Getter for the answer of each question
  get submittedAnswer() {
    return this.formTaking.get('submittedAnswer');
  }

  //Getter for the answer of each question
  get creatorName() {
    return this.formTaking.get('creatorName');
  }

  //Getter for the answer of each question
  get takerName() {
    return this.formTaking.get('takerName');
  }

  //function to post test/survey information to Firebase
  async submitHandler() {
    this.loading = true;
    this.success = true;

    const formValue = this.formTaking.value;

    this.loading = false;
  }
}
