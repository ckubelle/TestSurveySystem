import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  myForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm=this.fb.group({
      Question:'',
      Answer:'',
      QuestionType: '',
    }
  }

}
