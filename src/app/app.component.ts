import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { Graph } from './graph';
import { GraphPayload } from './models/GraphPayload';

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

  ngOnInit() {
    this._fetchGraphData();
  }

  private _fetchGraphData() {
    fetch('/assets/conjoint_graph.json')
      .then<GraphPayload>(response => response.json())
      .then(payload => {
        this.graph = {
          nodes: [],
          edges: []
        };
        for (const node of payload.nodes) {
          this.graph.nodes.push({
            ...node,
            gid: `_${node.id}_`,
            displayX: 0,
            displayY: 0
          });
        }
        for (const edge of payload.edges) {
          this.graph.edges.push({
            gid: `_${edge.src}-${edge.dst}_`,
            source: edge.src,
            target: edge.dst
          });
        }
      });
  }

}
