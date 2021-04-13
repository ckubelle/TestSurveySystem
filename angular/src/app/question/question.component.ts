import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import { MatListOption } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, first } from 'rxjs/operators';
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


  loading = false;
  success = false;

  constructor(
    private afs: AngularFirestore, 
    private route: ActivatedRoute,
    private fb: FormBuilder
    ) {this.route.params.subscribe(params=>{
      this.id = params.id;
    })}


  ngOnInit(): void {
    this.myForm = this.fb.group({
      testTitle: ['', [
        Validators.required,
      ]],
      formTypeSelection: ['', [
        Validators.required,
      ]],
      testCreator: this.id,
      questions: this.fb.array([])
    });
  }

//Getter for all of the questions in a form
  get questionForms(){
    return this.myForm.get('questions') as FormArray
  }

//Getter for the title of the test  
  get testTitle(){
      return this.myForm.get('testTitle');
  }

//Getter for the type of form (quiz or test)
  get formTypeSelection(){
    return this.myForm.get('formTypeSelection');
}

//Getter for the answer of each question
get questionAnswer(){
  return this.myForm.get('questionAnswer');
}

//function to add a question to the form (connects to the button)
  addQuestion(){

    console.log(this.myForm);

    const question = this.fb.group({
        questionTitle: [], 
        questionAnswer: [],
        questionType: [],
    })

    this.questionForms.push(question);

  }
  
//function to delete a question (connects to button)
  deleteQuestion(question){
    this.questionForms.removeAt(question);
   
  }

//function to post test/survey information to Firebase
  async submitHandler(){
    this.loading = true;

    const formValue = this.myForm.value;

    try{
      await this.afs.collection('tests').add(formValue);
      this.success = true;
    }
    catch(err){
      console.log(err);
    }

    this.loading = false;
  }

}


