export type Cell = 'empty' | 'wall' | 'weight1' | 'weight2' | 'weight3' | 'path' | 'source' | 'target'

export type Node = {
  x: number
  y: number
  f: number
  g: number
  h: number
  parent?: Node
}

export type Settings = {
  width: number
  height: number
  size: number
}
