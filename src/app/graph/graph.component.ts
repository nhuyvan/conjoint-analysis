import { Component, ViewEncapsulation, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ScaleLinear, scaleLinear } from 'd3-scale';

import { Graph, GraphNode, GraphEdge } from './models/graph';
import { TooltipService } from './views/tooltip/tooltip.service';

@Component({
  selector: 'ligma-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphComponent implements OnChanges {

  @Input()
  width: string;

  @Input()
  height: string;

  @Input()
  graph: Graph;

  readonly margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
  };
  resolvedWidth = 0;
  resolvedHeight = 0;

  private readonly _xScale: ScaleLinear<number, number>;
  private readonly _yScale: ScaleLinear<number, number>;
  private readonly _nodeMap = new Map<number, GraphNode>();

  @ViewChild('canvas')
  private _canvasRef: ElementRef<SVGElement>;

  private _timer: any;

  constructor(private readonly _tooltipService: TooltipService) {
    this._xScale = scaleLinear();
    this._yScale = scaleLinear();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this._canvasRef) {
      if (this.resolvedWidth === 0 || this.resolvedHeight === 0) {
        this._resolveGraphCanvasDimensions();
      }
      if ('graph' in changes && this.graph) {
        this._setupXyScales();
        this._renderNodes(this.graph.nodes);
        this._renderEdges(this.graph.edges);
      }
    }
  }

  private _resolveGraphCanvasDimensions() {
    const boundingBox = this._canvasRef.nativeElement.getBoundingClientRect();
    this.resolvedWidth = boundingBox.width - this.margin.left - this.margin.right;
    this.resolvedHeight = boundingBox.height - this.margin.top - this.margin.bottom;
  }

  private _setupXyScales() {
    const xExtent = [Infinity, -Infinity];
    const yExtent = [Infinity, -Infinity];
    for (const node of this.graph.nodes) {
      if (node.x < xExtent[0]) {
        xExtent[0] = node.x;
      } else if (node.x > xExtent[1]) {
        xExtent[1] = node.x;
      }
      if (node.y < yExtent[0]) {
        yExtent[0] = node.y;
      } else if (node.y > yExtent[1]) {
        yExtent[1] = node.y;
      }
    }
    this._xScale.domain(xExtent).range([0, this.resolvedWidth]);
    this._yScale.domain(yExtent).range([0, this.resolvedHeight]);
  }

  private _renderNodes(nodes: GraphNode[]) {
    const nodeContainer = this._canvasRef.nativeElement.querySelector('.graph__node-container');
    const fragment = document.createDocumentFragment();
    for (const node of nodes) {
      const renderedNode = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
      node.displayX = this._xScale(node.x);
      node.displayY = this._yScale(node.y);
      renderedNode.setAttribute('class', 'graph__node');
      renderedNode.setAttribute('data-node-id', String(node.id));
      renderedNode.setAttribute('x', String(node.displayX));
      renderedNode.setAttribute('y', String(node.displayY));
      renderedNode.innerHTML = `
        <div class='graph__node__circle'>
          <div class='graph__node__label'>${node.id}</div>
        </div>
      `;
      fragment.appendChild(renderedNode);
      this._nodeMap.set(node.id, node);
    }
    nodeContainer.appendChild(fragment);
  }

  private _renderEdges(edges: GraphEdge[]) {
    const edgeContainer = this._canvasRef.nativeElement.querySelector('.graph__edge-container');
    const fragment = document.createDocumentFragment();
    for (const edge of edges) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const source = this._nodeMap.get(edge.source);
      const target = this._nodeMap.get(edge.target);
      line.setAttribute('x1', String(source.displayX));
      line.setAttribute('y1', String(source.displayY));
      line.setAttribute('x2', String(target.displayX));
      line.setAttribute('y2', String(target.displayY));
      line.setAttribute('class', `graph__edge ${edge.gid}`);
      fragment.appendChild(line);
    }
    edgeContainer.appendChild(fragment);
  }

  showNodeTooltip(target: SVGElement) {
    if (target.hasAttribute('data-node-id')) {
      this._waitDuration(500)
        .then(() => {
          const node = this._nodeMap.get(+target.dataset.nodeId);
          const tooltipContent = JSON.stringify({
            id: node.id,
            x: node.x,
            y: node.y
          }, null, 4);
          this._tooltipService.show(target, tooltipContent);
        });
    }
  }

  private _waitDuration(duration: number) {
    return new Promise(resolve => {
      this._timer = setTimeout(resolve, duration);
    });
  }

  hideNodeTooltip() {
    clearTimeout(this._timer);
    this._tooltipService.hide();
  }

}
