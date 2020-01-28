import { Component, OnInit, ViewEncapsulation, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { Graph } from '@shared/graph';

@Component({
  selector: 'ligma-node-searcher',
  templateUrl: './node-searcher.component.html',
  styleUrls: ['./node-searcher.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NodeSearcherComponent implements OnInit {

  @Input()
  graph: Graph;

  @Output()
  matchedSubgraph = new EventEmitter<Graph>();
  queryInputBoxWidth = '0';
  graphQueryFormControl = new FormControl('');

  constructor() { }

  ngOnInit() {
    this.graphQueryFormControl.valueChanges.pipe(debounceTime(250))
      .subscribe({
        next: (query: string) => {
          this.matchedSubgraph.emit(this._findSubgraphWithQuery(query));
        }
      });
  }

  private _findSubgraphWithQuery(query: string) {
    const queryParts = query.split(/\s*,\s*/);
    const matchedSubgraph: Graph = {
      nodes: [],
      edges: []
    };
    for (const queryPart of queryParts) {
      if (!queryPart.includes('->')) {
        const foundNode = this.graph.nodes.find(e => e.id === queryPart);
        if (foundNode) {
          matchedSubgraph.nodes.push(foundNode);
        }
      } else {
        const [sourceNodeId, targetNodeId] = queryPart.split(/\s*<?->\s*/);
        const isBidirectional = queryPart.includes('<->');
        let foundEdge = this.graph.edges.find(e => e.source.id === sourceNodeId && e.target.id === targetNodeId);
        if (foundEdge) {
          matchedSubgraph.edges.push(foundEdge);
        }
        if (isBidirectional) {
          foundEdge = this.graph.edges.find(e => e.source.id === targetNodeId && e.target.id === sourceNodeId);
          if (foundEdge) {
            matchedSubgraph.edges.push(foundEdge);
          }
        }
      }
    }
    return matchedSubgraph;
  }

  openQueryInputBox(queryInputBoxElement: HTMLInputElement) {
    this.queryInputBoxWidth = '20vw';
    setTimeout(() => queryInputBoxElement.focus(), 1000);
  }

  @HostListener('window:keyup', ['$event'])
  closeQueryInputBox(event: KeyboardEvent | MouseEvent) {
    if (event instanceof KeyboardEvent) {
      if (event.key === 'Escape' && this.queryInputBoxWidth !== '0') {
        this.queryInputBoxWidth = '0';
      }
    } else {
      this.queryInputBoxWidth = '0';
    }
  }

}
