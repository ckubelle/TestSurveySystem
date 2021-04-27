import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  id: string;
  myFormsArray: Array<any>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.afs
      .collection('tests', (ref) => ref.where('testCreator', '==', this.id))
      .valueChanges({ idField: 'docId' })
      .subscribe((formsList) => {
        this.myFormsArray = formsList as Array<any>;
      });
  }
}
