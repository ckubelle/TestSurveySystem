import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import { MatFormField, MAT_FORM_FIELD } from '@angular/material/form-field';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  id: string;
  myForm : FormGroup;
  htmlstring: string;

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


  answerType: { value: string;  } = {
    value: "GB",
  };
  
  mc;
  sa;
  ea;
  mmc;
  tf;
  ra;
  ma;

  selectqType(event: MatSelectChange) {
    this.answerType.value=event.value;
    if (this.answerType.value == "mc") {
      this.mc = true;
      this.sa = false;
      this.ea = false;
      this.mmc = false;
      this.tf = false;
      this.ra = false;
      this.ma = false;
      console.log("mc chosen");
      this.htmlstring = `
      <input matInput placeholder="Answer 1" formControlName="a1">
  `
        }
    else if (this.answerType.value == "sa") {
        this.sa = true;
        this.mc = false;
        this.ea = false;
        this.mmc = false;
        this.tf = false;
        this.ra = false;
        this.ma = false;
          console.log("sa chosen");
        }
    else if (this.answerType.value == "ea") {
        this.ea = true;
        this.sa = false;
        this.mc = false;
        this.mmc = false;
        this.tf = false;
        this.ra = false;
        this.ma = false;
          console.log("ea chosen");
        }
    else if (this.answerType.value == "mmc") {
        this.mmc = true;
        this.sa = false;
        this.ea = false;
        this.mc = false;
        this.tf = false;
        this.ra = false;
        this.ma = false;
          console.log("mmc chosen");
        }        
    else if (this.answerType.value == "tf") {
          console.log("tf chosen");
          this.tf = true;
          this.sa = false;
          this.ea = false;
          this.mmc = false;
          this.mc = false;
          this.ra = false;
          this.ma = false;
        }
    else if (this.answerType.value == "ra") {
          console.log("ra chosen");
          this.ra = true;
          this.sa = false;
          this.ea = false;
          this.mmc = false;
          this.tf = false;
          this.mc = false;
          this.ma = false;
        }
    else if (this.answerType.value == "ma") {
          console.log("ma chosen");
          this.ma = true;
          this.sa = false;
          this.ea = false;
          this.mmc = false;
          this.tf = false;
          this.ra = false;
          this.mc = false;
        }
    
    console.log(this.answerType);
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


