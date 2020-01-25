export interface Graph {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GraphNode {
  gid: string;
  id: number;
  x: number;
  y: number;
  displayX: number;
  displayY: number;
}

export interface GraphEdge {
  gid: string;
  source: number;
  target: number;
}
