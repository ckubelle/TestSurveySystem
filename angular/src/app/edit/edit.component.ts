import { Component, OnInit } from '@angular/core';
import {
  AngularFirestore,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormField, MAT_FORM_FIELD } from '@angular/material/form-field';
import { MatListOption } from '@angular/material/list';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { QuestionComponent } from '../question/question.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  id: string;
  allFormsArray: Array<any>;

  testTitle: string;
  formTypeSelection: string;
  testCreator: string;
  questions: FormArray;
  selectedId: string;
  questionLength: number;

  currentDocument: QueryDocumentSnapshot<any>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.afs
      .collection('tests')
      .valueChanges()
      .subscribe((formsList) => {
        this.allFormsArray = formsList as Array<any>;
        console.log(typeof this.allFormsArray);
      });
  }

  async getQuestions(indiForm) {
    await this.afs
      .collection('tests')
      .snapshotChanges()
      .subscribe(async (documentList) => {
        try {
          await documentList.some(async (document) => {
            this.currentDocument = await document.payload.doc;
            this.testTitle = await this.currentDocument.get('testTitle');
            this.formTypeSelection = await this.currentDocument.get(
              'formTypeSelection'
            );
            this.testCreator = await this.currentDocument.get('testCreator');
            await this.questions.patchValue(
              this.currentDocument.get('questions')
            );
            this.questionLength = await this.questions.length;
            if (
              this.formTypeSelection == indiForm.formTypeSelection &&
              this.questions.length == indiForm.questions.length &&
              this.testCreator == indiForm.testCreator &&
              this.testTitle == indiForm.testTitle
            ) {
              this.selectedId = this.currentDocument.id;
              throw new Error();
            }
          });
        } catch (e) {
          console.log(e);
        }
      });
  }
}
