export function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export function randExc(min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min)
}

export function randInc(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

export function oneOf<T>(...values: T[]): T {
  const r = Math.floor(rand(0, values.length))
  return values[r]
}

export function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}
