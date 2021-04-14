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
  id: string;
  myForm: FormGroup;
  question: FormControl;

  loading = false;
  success = false;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.question = this.fb.control({
      questionTitle: [''],
      questionAnswer: [''],
      questionType: [''],
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
    this.myForm = this.fb.group({
      //testTitle: ['', [Validators.required]],
      //formTypeSelection: ['', [Validators.required]],
      testTitle: new FormControl(['']),
      formTypeSelection: new FormControl(['']),
      testCreator: new FormControl(this.id),
      questions: this.fb.array([this.question]),
    });
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

  async preloadData(
    title: string,
    selection: string,
    qs: FormArray,
    questionLength: number,
    selectedId: string,
    currentDocument: QueryDocumentSnapshot<any>
  ) {
    this.id = await currentDocument.get('testCreator');
    await this.testTitle.patchValue(currentDocument.get('testTitle'));
    await this.formTypeSelection.patchValue(
      currentDocument.get('formTypeSelection')
    );
    this.questionForms = currentDocument.get('questions');
    while (this.questionForms.length) {
      this.questionForms.removeAt(0);
    }

    currentDocument.get('questions').array.forEach((question) => {
      this.questionForms.push(question);
    });
    //for (let i = 0; i < questionLength; i++) {
    //this.questionForms.push(qs.value.at(i));
    //}

    console.log(this.myForm);
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
