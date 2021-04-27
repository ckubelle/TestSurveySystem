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
  myFormsArray: Array<any>;

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
      .collection('tests', ref => ref.where('testCreator', '==', this.id))
      .valueChanges({idField: "docId"})
      .subscribe((formsList) => {
        this.myFormsArray = formsList as Array<any>;
      });
  }
  
}
