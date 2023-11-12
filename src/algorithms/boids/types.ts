export type Boid = {
  x: number
  y: number
  vx: number
  vy: number
}

export type Settings = {
  width: number
  height: number
  nBoids: number
  speed: number
  rotationFactor: number
  nearDistance: number
  visibleDistance: number
  avoidFactor: number
  centeringFactor: number
  matchingFactor: number
}
