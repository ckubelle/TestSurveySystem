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

  constructor(
    private afs: AngularFirestore, 
    private route: ActivatedRoute,
    private fb: FormBuilder
    ) {this.route.params.subscribe(params=>{
      this.id = params.id;
    })}


  ngOnInit(): void {
    this.myForm = this.fb.group({
      questionTitle: ['', [
        Validators.required,
      ]],
      questions: this.fb.array([])
    });
  }

  get questionForms(){
    return this.myForm.get('questions') as FormArray
  }

  get questionTitle(){
      return this.myForm.get('questionTitle');
  }


  answerType: { value: string;  } = {
    value: "null",
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


  addQuestion(){

    console.log(this.myForm);

    const question = this.fb.group({
        questionTitle: [], 
        questionAnswer: [],
        questionType: [],
        prefix: [],
        line: [],
    })

    this.questionForms.push(question);

  }
  


  deleteQuestion(question){
    this.questionForms.removeAt(question);
   
  }

  

}


