export type Ant = {
  x: number
  y: number
  vx: number
  vy: number
  to: 'food' | 'nest'
  pheromones: number
  lastFocus: Nest | Food | Trace | null
}

export type Trace = {
  x: number
  y: number
  type: 'trace'
  force: number
  to: 'food' | 'nest'
}

export type Food = {
  x: number
  y: number
  type: 'food'
  size: number
}

export type Nest = {
  x: number
  y: number
  type: 'nest'
  size: number
}

export type Settings = {
  width: number
  height: number
  nAnts: number
  speed: number
  visibleDistance: number
}
