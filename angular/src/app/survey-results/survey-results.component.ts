import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

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

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {

   // this.item$ = afs.collection('testsTaken').valueChanges();
      
      this.item$ = afs.collection('testsTaken', ref => ref.where('creatorName', '==', 'Christian')).valueChanges();


  }

  
  

  ngOnInit(): void {}
  

  //Getter for all of the questions in a form
  get questionForms() {
    return this.formTaking.get('questions') as FormArray;
  }

  //Getter for the title of the test
  get testTitle() {
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
