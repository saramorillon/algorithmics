import { discoid, getRandomPoint, lineoid, polyline, rand } from './math'
import { settings } from './settings'

export function river() {
  const { x, y } = getRandomPoint({
    minX: settings.width / 4,
    maxX: 3 * (settings.width / 4),
    minY: settings.height / 4,
    maxY: 3 * (settings.height / 4),
  })
  const o = rand(0, 1)
  const d = o === 0 ? (y < settings.height / 2 ? 2 : 0) : x < settings.width / 2 ? 1 : 3
  return lineoid(x, y, d, 10)
}

export function road() {
  const { x, y } = getRandomPoint({
    minX: settings.width / 4,
    maxX: 3 * (settings.width / 4),
    minY: settings.height / 4,
    maxY: 3 * (settings.height / 4),
  })
  const o = rand(0, 1)
  const d = o === 0 ? (y < settings.height / 2 ? 2 : 0) : x < settings.width / 2 ? 1 : 3
  return polyline(x, y, d, 10)
}

export function village() {
  let { x, y } = getRandomPoint()
  return discoid(x, y, settings.villages.size, 4)
}
