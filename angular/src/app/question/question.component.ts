import { Component, Input, OnInit } from '@angular/core';
import {
  AngularFirestore,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, first } from 'rxjs/operators';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormField, MAT_FORM_FIELD } from '@angular/material/form-field';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  myForm: FormGroup;
  docId: string;

  loading = false;
  success = false;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.docId = params.docId;
      this.afs.doc<any>(`tests/${this.docId}`).valueChanges().subscribe((document) => {
        this.myForm = new FormGroup({
          testTitle: new FormControl([document.testTitle, [Validators.required]]),
          formTypeSelection: new FormControl([document.formTypeSelection, [Validators.required]]),
          testCreator: document.testCreator,
          questions: document.questions,
        })
      })
    });
  }

  ngOnInit(): void {

  }

  //Getter for all of the questions in a form
  get questionForms() {
    return this.myForm.get('questions') as FormArray;
  }

  set questionForms(questions: FormArray) {
    this.myForm['questions'] = questions;
  }

  //Getter for the title of the test
  get testTitle() {
    return this.myForm.get('testTitle');
  }

  //Getter for the type of form (quiz or test)
  get formTypeSelection() {
    return this.myForm.get('formTypeSelection');
  }

  //Getter for the answer of each question
  get questionAnswer() {
    return this.myForm.get('questionAnswer');
  }

  //function to add a question to the form (connects to the button)
  addQuestion() {
    console.log(this.myForm);

    const question = this.fb.group({
      questionTitle: [],
      questionAnswer: [],
      questionType: [],
      mcoption1: [],
      mcoption2: [],
      mcoption3: [],
      mcoption4: [],
      rank1: [],
      rank2: [],
      rank3: [],
      rank4: [],
      rank5: [],
      rankAnswer1: [],
      rankAnswer2: [],
      rankAnswer3: [],
      rankAnswer4: [],
      rankAnswer5: [],
      leftanswer1: [],
      rightanswer1: [],
      leftanswer2: [],
      rightanswer2: [],
    });
    this.questionForms.push(question);
  }

  //function to delete a question (connects to button)
  deleteQuestion(question) {
    this.questionForms.removeAt(question);
  }

  //function to post test/survey information to Firebase
  async submitHandler() {
    this.loading = true;

    const formValue = this.myForm.value;

    try {
      await this.afs.collection('tests').add(formValue);
      this.success = true;
    } catch (err) {
      console.log(err);
    }

    this.loading = false;
  }
}
