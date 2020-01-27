export interface QuestionPayload {
  prompt: string;
  left: QuestionAnswerPayload;
  right: QuestionAnswerPayload;
}

export interface QuestionAnswerPayload {
  label: string;
  nodes: number[];
  edges: Array<[number, number]>;
}
