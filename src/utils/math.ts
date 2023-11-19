export function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function oneOf<T>(...values: T[]): T {
  const r = randInt(0, values.length)
  return values[r]
}

export function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

export function manathan(x1: number, y1: number, x2: number, y2: number) {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}
