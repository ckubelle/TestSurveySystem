import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-results',
  templateUrl: './view-results.component.html',
  styleUrls: ['./view-results.component.scss']
})
export class ViewResultsComponent implements OnInit {
  id: string;
  surveyList: Array<any>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
  }

  ngOnInit(): void {
    this.afs
      .collection('tests', (ref) => ref.where('testCreator', '==', this.id).where('formTypeSelection', '==', 'survey'))
      .valueChanges({ idField: 'docId' })
      .subscribe((formsList) => {
        this.surveyList = formsList as Array<any>;
      });
  }
}