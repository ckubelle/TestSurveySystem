import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatListOption } from '@angular/material/list';
import { Observable } from 'rxjs';
import { User } from '../services/auth.service';

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

  @Input() user: User;

  constructor(private afs: AngularFirestore) {}

  ngOnInit(): void {
    this.items$ = this.afs
      .collection<Todo>('todos', (ref) =>
        ref.where('userId', '==', this.user?.uid)
      )
      .valueChanges({ idField: 'id' });
  }

  addItem(name: string): void {
    if (name) {
      const userId = this.user.uid;
      this.afs.collection<Todo>('todos').add({ userId, name });
    }
  }

  removeItems(selected: MatListOption[]): void {
    for (const item of selected) {
      this.afs.doc<Todo>(`todos/${item.value}`).delete();
    }
  }
}
