import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-take',
  templateUrl: './take.component.html',
  styleUrls: ['./take.component.scss'],
})
export class TakeComponent implements OnInit {
  id: string;
  otherFormsArray: Array<any>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.afs
      .collection('tests', (ref) => ref.where('testCreator', '!=', this.id))
      .valueChanges({ idField: 'docId' })
      .subscribe((formsList) => {
        this.otherFormsArray = formsList as Array<any>;
      });
  }
}
