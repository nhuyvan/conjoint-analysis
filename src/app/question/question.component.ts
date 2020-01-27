import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Question } from './models/question';

@Component({
  selector: 'ligma-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'question'
  }
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;

  constructor() { }

  ngOnInit() {
  }

}
