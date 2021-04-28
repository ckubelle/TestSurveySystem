import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { TakeComponent } from './take/take.component';
import { TodoComponent } from './todo/todo.component';
import { QuestionComponent } from './question/question.component';
import { TakeQuestionComponent } from './take-question/take-question.component';
import { ViewResultsComponent } from './view-results/view-results.component';
import { SurveyResultsComponent } from './survey-results/survey-results.component';

//Routing different pages to different components
const routes: Routes = [
  {path : '', component: HomeComponent},
  {path : 'create/:id', component: CreateComponent},
  {path : 'take/:id', component: TakeComponent},
  {path : 'edit/:id', component: EditComponent},
  {path : 'viewResults/:id', component: ViewResultsComponent},
  {path : 'edit/:id/:docId', component: QuestionComponent},
  {path : 'viewResults/:id/:testTitle', component: SurveyResultsComponent},
  {path : 'take/:id/:docId', component: TakeQuestionComponent},
  {path : '**', component: NotfoundComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
