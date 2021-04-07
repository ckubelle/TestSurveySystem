import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatListOption } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


export interface Todo {
  id?: string;
  userId: string;
  name: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  items$: Observable<Todo[]>;
  id: string;


  constructor(
    private afs: AngularFirestore, 
    private route: ActivatedRoute
    ) {this.route.params.subscribe(params=>{
      this.id = params.id;
    })}


  ngOnInit(): void {
    this.items$ = this.afs
      .collection<Todo>('todos', (ref) =>
        ref.where('userId', '==', this.id)
      )
      .valueChanges({ idField: 'id' });
  }

  addItem(name: string): void {
    if (name) {
      const userId = this.id;
      this.afs.collection<Todo>('todos').add({ userId, name });
    }
  }

  removeItems(selected: MatListOption[]): void {
    for (const item of selected) {
      this.afs.doc<Todo>(`todos/${item.value}`).delete();
    }
  }
}
