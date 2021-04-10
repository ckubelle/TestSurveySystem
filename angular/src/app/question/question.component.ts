import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  id: string;
  myForm : FormGroup;


  constructor(
    private afs: AngularFirestore, 
    private route: ActivatedRoute,
    private fb: FormBuilder
    ) {this.route.params.subscribe(params=>{
      this.id = params.id;
    })}


  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: ['', [
        Validators.required,
      ]],
      phones: this.fb.array([])
    });
  }

  get phoneForms(){
    return this.myForm.get('phones') as FormArray
  }

  get email(){
      return this.myForm.get('email');
  }

  addPhone(){

    const phone = this.fb.group({
        area: [], 
        prefix: [],
        line: [],
    })

    this.phoneForms.push(phone);

  }


  deletePhone(i){
    this.phoneForms.removeAt(i);
  }

}
