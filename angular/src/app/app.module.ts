import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import {ReactiveFormsModule} from '@angular/forms';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips'
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { TakeComponent } from './take/take.component';
import { EditComponent } from './edit/edit.component';
import { GradeComponent } from './grade/grade.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { QuestionComponent } from './question/question.component';


@NgModule({
  declarations: [AppComponent, TodoComponent, HomeComponent, CreateComponent, TakeComponent, EditComponent, GradeComponent, NotfoundComponent, QuestionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBTX9YUButf8jub-KPa6FYw4jE7M43i6EQ",
      authDomain: "surveycreator-859ac.firebaseapp.com",
      databaseURL: "https://surveycreator-859ac-default-rtdb.firebaseio.com",
      projectId: "surveycreator-859ac",
      storageBucket: "surveycreator-859ac.appspot.com",
      messagingSenderId: "206479619725",
      appId: "1:206479619725:web:79cc75b3e956a05c0b54c4"
    }),
    AngularFireAuthModule, // auth
    AngularFirestoreModule, // firestore
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
