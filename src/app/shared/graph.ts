export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GraphNode {
  guid: string;
  id: string;
  x: number;
  y: number;
  displayX: number;
  displayY: number;
}

export interface GraphEdge {
  guid: string;
  source: GraphNode;
  target: GraphNode;
}
