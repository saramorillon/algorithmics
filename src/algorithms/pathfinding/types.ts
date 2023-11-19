export type Cell = {
  x: number
  y: number
  f: number
  g: number
  h: number
  weight: number
  parent?: Cell
}

export type Settings = {
  width: number
  height: number
  size: number
}
