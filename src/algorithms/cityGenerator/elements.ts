import { oneOf, rand } from '../../utils/math'
import { getRandomPoint } from '../../utils/plan'
import { discoid, lineoid, polyline } from '../../utils/xxxoids'
import { Settings } from './types'

export function getRiver(settings: Settings) {
  const { x, y } = getRandomPoint(
    settings.width / 4,
    3 * (settings.width / 4),
    settings.height / 4,
    3 * (settings.height / 4),
    settings.width,
    settings.height,
  )
  const direction = oneOf(y < settings.height / 2 ? 2 : 0, x < settings.width / 2 ? 1 : 3)
  return lineoid(x, y, direction, settings.width, settings.height, 10)
}

export function getVillage(settings: Settings) {
  const { x, y } = getRandomPoint(0, settings.width, 0, settings.height, settings.width, settings.height)
  return discoid(x, y, settings.villages.size, settings.width, settings.height)
}

export function getRoad(settings: Settings) {
  const { x, y } = getRandomPoint(
    settings.width / 4,
    3 * (settings.width / 4),
    settings.height / 4,
    3 * (settings.height / 4),
    settings.width,
    settings.height,
  )
  const o = rand(0, 1)
  const d = o === 0 ? (y < settings.height / 2 ? 2 : 0) : x < settings.width / 2 ? 1 : 3
  return polyline(x, y, d, settings.width, settings.height)
}
