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
  editing = false;

  constructor(
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.route.params.subscribe((params) => {
      this.docId = params.docId;
      this.afs
        .doc<any>(`tests/${this.docId}`)
        .valueChanges()
        .subscribe((document) => {
          if (document) {
            this.editing = true;
            this.myForm = this.fb.group({
              testTitle: [document.testTitle, [Validators.required]],
              formTypeSelection: [
                document.formTypeSelection,
                [Validators.required],
              ],
              creatorName: [document.testTitle, [Validators.required]],
              testCreator: document.testCreator,
              questions: this.fb.array([]),
            });
            for (let docQuestion of document.questions) {
              const question = this.fb.group({
                questionTitle: [docQuestion.questionTitle],
                questionAnswer: [docQuestion.questionAnswer],
                questionType: [docQuestion.questionType],
                mcoption1: [docQuestion.mcoption1],
                mcoption2: [docQuestion.mcoption2],
                mcoption3: [docQuestion.mcoption3],
                mcoption4: [docQuestion.mcoption4],
                rank1: [docQuestion.rank1],
                rank2: [docQuestion.rank2],
                rank3: [docQuestion.rank3],
                rank4: [docQuestion.rank4],
                rank5: [docQuestion.rank5],
                rankAnswer1: [docQuestion.rankAnswer1],
                rankAnswer2: [docQuestion.rankAnswer2],
                rankAnswer3: [docQuestion.rankAnswer3],
                rankAnswer4: [docQuestion.rankAnswer4],
                rankAnswer5: [docQuestion.rankAnswer5],
                leftanswer1: [docQuestion.leftanswer1],
                rightanswer1: [docQuestion.rightanswer1],
                leftanswer2: [docQuestion.leftanswer2],
                rightanswer2: [docQuestion.rightanswer2],
              });

              this.questionForms.push(question);
            }
          } else {
            this.myForm = this.fb.group({
              testTitle: ['', [Validators.required]],
              formTypeSelection: ['', [Validators.required]],
              creatorName: ['', [Validators.required]],
              testCreator: params.id,
              questions: this.fb.array([]),
            });
          }
        });
    });
  }

  ngOnInit(): void {}

  //Getter for all of the questions in a form
  get questionForms() {
    return this.myForm.get('questions') as FormArray;
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

  //Getter for the answer of each question
  get creatorName() {
    return this.myForm.get('creatorName');
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
    this.success = true;

    const formValue = this.myForm.value;

    try {
      if (this.editing) {
        await this.afs.doc<any>(`tests/${this.docId}`).update(formValue);
      } else {
        await this.afs.collection('tests').add(formValue);
      }
      
    } catch (err) {
      console.log(err);
    }

    this.loading = false;
  }
}
