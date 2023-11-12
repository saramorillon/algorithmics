import { distance, oneOf, rand, randExc } from './math'
import { isInsideBounds } from './plan'

/**
 * Draw a lineoid on the plan. A lineoid is a line following a global direction, but with small variations along the way.
 * d is the global direction of the road (0, 1, 2 or 3)
 * v is the current direction
 * f is the variation factor
 * Each iteration, v returns back to d, and there is 1/f chance of changing direction (90° turn)
 * @param x Start x
 * @param y Start y
 * @param d General direction
 * @param width Total width of the plan
 * @param height Total height of the plan
 * @param f Variation factor
 * @returns a serie of points
 */
export function lineoid(x: number, y: number, d: number, width: number, height: number, f = 10) {
  const result = [{ x, y }]
  for (;;) {
    let v = d
    if (randExc(0, f) === 0) {
      v = (d + oneOf(1, 3)) % 4
    }
    x += v === 1 ? 1 : v === 3 ? -1 : 0
    y += v === 0 ? -1 : v === 2 ? 1 : 0
    if (result.some((coordinates) => coordinates.x === x && coordinates.y === y)) {
      x = result[result.length - 1].x
      y = result[result.length - 1].y
      continue
    }
    if (!isInsideBounds(x, y, width, height)) {
      return result
    }
    result.push({ x, y })
  }
}

/**
 * Draw a polyline on the plan. A polyline consists in a serie of segments.
 * d is the global direction of the road (0, 1, 2 or 3)
 * v is the current direction
 * f is the variation factor
 * Each iteration, if v is equal to d, there is 1/f chance of changing direction (90° turn)
 * Each iteration, if v is not equal to d, there is 1/f chance of returning back to d
 * @param x Start x
 * @param y Start y
 * @param d General direction
 * @param width Total width of the plan
 * @param height Total height of the plan
 * @param f Variation factor
 * @returns a serie of points
 */

export function polyline(x: number, y: number, d: number, width: number, height: number, f = 5) {
  let v = d
  const result = [{ x, y }]
  for (;;) {
    if (randExc(0, f) === 0) {
      if (v === d) {
        v = (v + oneOf(1, 3)) % 4
      } else {
        v = d
      }
    }
    x += v === 1 ? 1 : v === 3 ? -1 : 0
    y += v === 0 ? -1 : v === 2 ? 1 : 0
    if (result.some((coordinates) => coordinates.x === x && coordinates.y === y)) {
      x = result[result.length - 1].x
      y = result[result.length - 1].y
      continue
    }
    if (!isInsideBounds(x, y, width, height)) {
      return result
    }
    result.push({ x, y })
  }
}

export function discoid(ox: number, oy: number, r: number, width: number, height: number, f = 4) {
  const result = [{ x: ox, y: oy }]
  const minX = ox + r * Math.cos(Math.PI)
  const maxX = ox + r * Math.cos(0)
  const minY = oy + r * Math.sin(-Math.PI / 2)
  const maxY = oy + r * Math.sin(Math.PI / 2)

  for (let x = minX; x < maxX; x++) {
    for (let y = minY; y < maxY; y++) {
      const v = rand(1.2, 1.7)
      if (distance(x, y, ox, oy) * v <= r && randExc(0, f) === 0 && isInsideBounds(x, y, width, height)) {
        result.push({ x, y })
      }
    }
  }

  return result
}
