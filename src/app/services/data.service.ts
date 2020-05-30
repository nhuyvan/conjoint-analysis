import { Injectable, Inject } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';

import { GraphPayload } from '../models/GraphPayload';
import { QuestionPayload } from '../models/QuestionPayload';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(APP_BASE_HREF) private _baseHref: string) {
    const graphDataPayload = this._fetchGraphData();
    const questionDataPayload = this._fetchQuestionData();
  }

  private async _fetchGraphData() {
    return await fetch(`${this._baseHref}assets/conjoint_graph.json`)
      .then<GraphPayload>(response => response.json());
  }

  private async _fetchQuestionData() {
    return await fetch(`${this._baseHref}assets/conjoint_questions.json`)
      .then<QuestionPayload[]>(response => response.json());
  }

  private _createGraphNodesFromGraphPayload(graphPayload: GraphPayload) {
    const nodeMap = new Map<number, Node>();
    for (const node of graphPayload.nodes) {
      nodeMap.set(
        node.id,
        {
          id: String(node.id),
          guid: `_${node.id}_`,
          x: node.x,
          y: node.y,
          displayX: 0,
          displayY: 0
        }
      );
    }
    return nodeMap;
  }

}
