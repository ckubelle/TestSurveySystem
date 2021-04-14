import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { MatFormField, MAT_FORM_FIELD } from '@angular/material/form-field';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id: string;
  allForms: Array<any>;

  constructor(
  private afs: AngularFirestore, 
  private route: ActivatedRoute
  ) 
  {this.route.params.subscribe(params=>{
    this.id = params.id;
  })}

  ngOnInit(): void {
    this.afs.collection("tests").valueChanges()
      .subscribe(formsList => {
        this.allForms = formsList as Array<any>
    });
    console.log(this.id);
  }

}
