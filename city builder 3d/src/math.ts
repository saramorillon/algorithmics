import { settings } from './settings'

export function rand(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
}

export function distance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
}

export function isInsideBounds(x: number, y: number) {
  return x >= 0 && x < settings.width && y >= 0 && y < settings.height
}

export function getRandomPoint(options = { minX: 0, maxX: settings.width, minY: 0, maxY: settings.height }) {
  const x = rand(options.minX, options.maxX)
  const y = rand(options.minY, options.maxY)
  if (isInsideBounds(x, y)) {
    return { x, y }
  }
  return getRandomPoint()
}

export function lineoid(x: number, y: number, d: number, f = 10) {
  const result = [{ x, y }]
  for (;;) {
    const r = rand(0, f - 1)
    const v = (d + (r === 0 ? 1 : r === 1 ? 3 : 0)) % 4
    x += v === 1 ? 1 : v === 3 ? -1 : 0
    y += v === 0 ? -1 : v === 2 ? 1 : 0
    if (result.some((coordinates) => coordinates.x === x && coordinates.y === y)) {
      x = result[result.length - 1].x
      y = result[result.length - 1].y
      continue
    }
    if (!isInsideBounds(x, y)) {
      return result
    }
    result.push({ x, y })
  }
}

export function polyline(x: number, y: number, d: number, f = 10) {
  let v = d
  const result = [{ x, y }]
  for (;;) {
    const r = rand(0, f - 1)
    if (v === d) {
      v = (v + (r === 0 ? 1 : r === 1 ? 3 : 0)) % 4
    } else {
      v = (r === 0 ? 1 : r === 1 ? 3 : 0) ? d : v
    }
    x += v === 1 ? 1 : v === 3 ? -1 : 0
    y += v === 0 ? -1 : v === 2 ? 1 : 0
    if (result.some((coordinates) => coordinates.x === x && coordinates.y === y)) {
      x = result[result.length - 1].x
      y = result[result.length - 1].y
      continue
    }
    if (!isInsideBounds(x, y)) {
      return result
    }
    result.push({ x, y })
  }
}

export function discoid(ox: number, oy: number, r: number, f = 2) {
  const result = [{ x: ox, y: oy }]
  const minX = ox + r * Math.cos(Math.PI)
  const maxX = ox + r * Math.cos(0)
  const minY = oy + r * Math.sin(-Math.PI / 2)
  const maxY = oy + r * Math.sin(Math.PI / 2)

  for (let x = minX; x < maxX; x++) {
    for (let y = minY; y < maxY; y++) {
      if (distance(x, y, ox, oy) <= r) {
        if (rand(0, f - 1) === 0) {
          result.push({ x, y })
        }
      }
    }
  }

  return result
}
