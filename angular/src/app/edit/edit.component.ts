import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id: string;
  constructor(
  private afs: AngularFirestore, 
  private route: ActivatedRoute
  ) 
  {this.route.params.subscribe(params=>{
    this.id = params.id;
  })}

  ngOnInit(): void {

    
  }

}
