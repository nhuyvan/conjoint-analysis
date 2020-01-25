export interface GraphPayload {
  nodes: Array<{
    id: number;
    x: number;
    y: number;
  }>;
  edges: Array<{
    src: number;
    dst: number;
  }>;
}
