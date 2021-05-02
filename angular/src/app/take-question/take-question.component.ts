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
  selector: 'app-take-question',
  templateUrl: './take-question.component.html',
  styleUrls: ['./take-question.component.scss'],
})
export class TakeQuestionComponent implements OnInit {
  formTaking: FormGroup;
  docId: string;

  loading = false;
  success = false;
  counter = 0;
  total = 0;
  essays = 0;
  shorts = 0;
  tobegraded = false;

  tobegrade(){
    this.tobegraded = true;
  }

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
          this.formTaking = this.fb.group({
            testTitle: [document.testTitle, [Validators.required]],
            formTypeSelection: [
              document.formTypeSelection,
              [Validators.required],
            ],
            creatorName: [document.creatorName, [Validators.required]],
            testCreator: document.testCreator,
            takerName: ['', [Validators.required]],
            takerId: params.id,
            questions: this.fb.array([]),
          });
          for (let docQuestion of document.questions) {
            const question = this.fb.group({
              submittedAnswer: [],
              submittedRankAnswer1: [],
              submittedRankAnswer2: [],
              submittedRankAnswer3: [],
              submittedRankAnswer4: [],
              submittedRankAnswer5: [],
              submittedLeftanswer1: [],
              submittedRightanswer1: [],
              submittedLeftanswer2: [],
              submittedRightanswer2: [],
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
        });
    });
  }

  ngOnInit(): void {}

  mmccheck(_arr1, _arr2) {
    if (
      !Array.isArray(_arr1)
      || !Array.isArray(_arr2)
      ||  _arr1.length !== _arr2.length
      ) {
        return false;
      }

    // .concat() to not mutate arguments
    const arr1 = _arr1.concat().sort();
    const arr2 = _arr2.concat().sort();

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
         }
    }

    return true;
}

  score(){

    for(let question of this.questionForms.value){
      this.total++;
      if(question.submittedAnswer==question.questionAnswer && (question.questionType=='mc' || question.questionType=='tf')){
        this.counter++;
        console.log(question.questionTitle);
      }
      else if (question.questionType=='mmc' ){
          if(this.mmccheck(question.submittedAnswer, question.questionAnswer)){
            this.counter++;
            console.log(question.questionTitle);
          }
      }
      else if (question.questionType=='ra' ){
        if(question.rank1==question.submittedRankAnswer1 && 
          question.rank2==question.submittedRankAnswer2 && 
          question.rank3==question.submittedRankAnswer3 && 
          question.rank4==question.submittedRankAnswer4 && question.rank5==question.submittedRankAnswer5){
          this.counter++;
          console.log(question.questionTitle);
        }
    }
    else if (question.questionType=='ma' ){
      if(question.rightanswer1 == question.submittedRightanswer1 &&
        question.rightanswer2 == question.submittedRightanswer2){
        this.counter++;
        console.log(question.questionTitle);
      }
  }
    else if (question.questionType=='ea' ){
      this.essays++;
    }
    else if (question.questionType=='sa' ){
      this.shorts++;
    }
  }
}

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
