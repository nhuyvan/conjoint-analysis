import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';

import { QuestionComponent } from './question.component';



@NgModule({
  declarations: [QuestionComponent],
  imports: [
    CommonModule,
    MatSliderModule
  ],
  exports: [QuestionComponent]
})
export class QuestionModule { }
