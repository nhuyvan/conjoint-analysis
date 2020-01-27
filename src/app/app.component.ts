import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { Graph, GraphNode, GraphEdge } from '@shared/graph';
import { GraphPayload } from './models/GraphPayload';
import { Question, QuestionAnswer } from './question/models/question';
import { QuestionPayload, QuestionAnswerPayload } from './models/QuestionPayload';

@Component({
  selector: 'ligma-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  graph: Graph = {
    nodes: [],
    edges: []
  };
  questions: Question[] = [];

  ngOnInit() {
    Promise.all([this._fetchGraphData(), this._fetchQuestionData()])
      .then(([graphPayload, questionDataArray]) => {
        const nodeMap = this._createGraphNodesFromGraphPayload(graphPayload);
        const edgeMap = this._createGraphEdgesFromGraphPayload(graphPayload, nodeMap);
        this.questions = questionDataArray.map(
          payload => this._createQuestionFromQuestionPayload(payload, nodeMap, edgeMap)
        );
        this.graph = {
          nodes: [...nodeMap.values()],
          edges: [...edgeMap.values()]
        };
      });
  }

  private _fetchGraphData() {
    return fetch('/assets/conjoint_graph.json')
      .then<GraphPayload>(response => response.json());
  }

  private _fetchQuestionData() {
    return fetch('/assets/conjoint_questions.json')
      .then<QuestionPayload[]>(response => response.json());
  }

  private _createGraphNodesFromGraphPayload(graphPayload: GraphPayload) {
    const nodeMap = new Map<number, GraphNode>();
    for (const node of graphPayload.nodes) {
      nodeMap.set(
        node.id,
        {
          ...node,
          guid: `_${node.id}_`,
          displayX: 0,
          displayY: 0
        }
      );
    }
    return nodeMap;
  }

  private _createGraphEdgesFromGraphPayload(graphPayload: GraphPayload, nodeMap: Map<number, GraphNode>) {
    const edgeMap = new Map<string, GraphEdge>();
    for (const edge of graphPayload.edges) {
      const edgeGuid = `_${edge.src}-${edge.dst}_`;
      edgeMap.set(
        edgeGuid,
        {
          guid: edgeGuid,
          source: nodeMap.get(edge.src),
          target: nodeMap.get(edge.dst)
        }
      );
    }
    return edgeMap;
  }

  private _createQuestionFromQuestionPayload(
    questionPayload: QuestionPayload,
    nodeMap: Map<number, GraphNode>,
    edgeMap: Map<string, GraphEdge>) {
    return {
      prompt: questionPayload.prompt,
      left: this._createQuestionAnswerFromQuestionAnswerPayload(questionPayload.left, nodeMap, edgeMap),
      right: this._createQuestionAnswerFromQuestionAnswerPayload(questionPayload.right, nodeMap, edgeMap),
    };
  }

  private _createQuestionAnswerFromQuestionAnswerPayload(
    questionAnswerPayload: QuestionAnswerPayload,
    nodeMap: Map<number, GraphNode>,
    edgeMap: Map<string, GraphEdge>): QuestionAnswer {

    return {
      label: questionAnswerPayload.label,
      graph: {
        nodes: questionAnswerPayload.nodes.map(nodeId => nodeMap.get(nodeId)),
        edges: questionAnswerPayload.edges.map(edge => this._findEdge(edgeMap, edge[0], edge[1]))
          .filter(edge => edge !== undefined)
      }
    };

  }

  // TODO: May need to be removed
  private _findEdge(edgeMap: Map<string, GraphEdge>, sourceId: number, targetId: number) {
    return edgeMap.get(`_${sourceId}-${targetId}_`) || edgeMap.get(`_${targetId}-${sourceId}_`);
  }

}
