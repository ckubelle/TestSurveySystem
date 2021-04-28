import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.scss'],
})
export class SurveyResultsComponent implements OnInit {
  formTaking: FormGroup;
  surveyTitle: string;
  mySurveysTakenArray: Array<FormGroup>;

  loading = false;
  success = false;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.surveyTitle = params.testTitle;

      this.afs
      .collection('testsTaken', (ref) => ref.where('testCreator', '==', params.id).where('testTitle', '==', this.surveyTitle))
      .valueChanges({ idField: 'docId' })
      .subscribe((formsList) => {
        this.mySurveysTakenArray = formsList as Array<any>;
      });

  
    });
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

    try {
      this.afs
        .doc<any>(`testsTaken/${this.docId}`)
        .valueChanges()
        .subscribe(async (document) => {
          if (document) {
            await this.afs
              .doc<any>(`testsTaken/${this.docId}`)
              .update(formValue);
          } else {
            await this.afs.collection('testsTaken').add(formValue);
          }
        });
    } catch (err) {
      console.log(err);
    }

    this.loading = false;
  }
}
