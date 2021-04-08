import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  id: string;
  constructor(
    private afs: AngularFirestore, 
    private route: ActivatedRoute
    ) {this.route.params.subscribe(params=>{
      this.id = params.id;
    })}
  ngOnInit(): void {
  }

}
