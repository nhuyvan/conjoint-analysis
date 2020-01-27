import { Graph } from '@shared/graph';

export interface Question {
  prompt: string;
  left: QuestionAnswer;
  right: QuestionAnswer;
}

export interface QuestionAnswer {
  label: string;
  graph: Graph;
}
