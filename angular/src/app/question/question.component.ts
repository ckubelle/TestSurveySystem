import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatListOption } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatSelectModule} from '@angular/material/select';

export interface Question {
  id?: string;
  userId: string;
  name: string;
  
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  items$: Observable<Question[]>;
  id: string;


  constructor(
    private afs: AngularFirestore, 
    private route: ActivatedRoute
    ) {this.route.params.subscribe(params=>{
      this.id = params.id;
    })}


  ngOnInit(): void {
    this.items$ = this.afs
      .collection<Question>('question', (ref) =>
        ref.where('userId', '==', this.id)
      )
      .valueChanges({ idField: 'id' });
  }

  addItem(name: string): void {
    if (name) {
      const userId = this.id;
      this.afs.collection<Question>('question').add({ userId, name});
    }
  }
  

  removeItems(selected: MatListOption[]): void {
    for (const item of selected) {
      this.afs.doc<Question>(`question/${item.value}`).delete();
    }
  }

}
