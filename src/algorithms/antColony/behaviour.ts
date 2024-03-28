import { distance, rand } from '../../utils/math'
import { Ant, Food, Nest, Settings, Trace } from './types'

export function dropPheromone(ant: Ant, traces: Trace[]) {
  if (ant.pheromones > 0) {
    traces.push({ x: ant.x, y: ant.y, type: 'trace', to: ant.to === 'food' ? 'nest' : 'food', force: ant.pheromones })
    ant.pheromones -= 1
  }
}

export function moveToward(ant: Ant, point: Nest | Food) {
  ant.vx += point.x - ant.x
  ant.vy += point.y - ant.y
}

export function turnAround(ant: Ant) {
  ant.vx = -ant.vx
  ant.vy = -ant.vy
}

export function getTracesWeight(ant: Ant, traces: Trace[], settings: Settings) {
  // Take 3 points : right before, slightly to the left and slightly to the right
  // Compute the weight of each point according to the pheromones visible in each point
  // Move toward the most weighted point
  // TODO debug this
  const points = [
    { x: ant.vx + ant.x, y: ant.vy + ant.y, weight: 0 },
    { x: ant.vx + ant.x + 1, y: ant.vy + ant.y, weight: 0 },
    { x: ant.vx + ant.x, y: ant.vy + ant.y + 1, weight: 0 },
  ]

  for (const point of points) {
    for (const trace of traces) {
      if (trace.to === ant.to && distance(point.x, point.y, trace.x, trace.y) < settings.visibleDistance) {
        point.weight += trace.force
      }
    }
  }

  const point = points.sort((point1, point2) => point2.weight - point1.weight)[0]
  if (point.weight > 0) {
    return point
  }
}

export function wander(ant: Ant) {
  const randR = rand(0, 0.2)
  const randT = rand(0, 2 * Math.PI)
  ant.vx += randR * Math.cos(randT)
  ant.vy += randR * Math.sin(randT)
}

export function adaptSpeed(ant: Ant, settings: Settings) {
  const antSpeed = Math.sqrt(Math.pow(ant.vx, 2) + Math.pow(ant.vy, 2))
  ant.vx = (ant.vx * settings.speed) / antSpeed
  ant.vy = (ant.vy * settings.speed) / antSpeed
}

export function updatePosition(ant: Ant, settings: Settings) {
  if (ant.x < 0 || ant.x > settings.width) {
    ant.vx = -ant.vx
  }
  if (ant.y < 0 || ant.y > settings.height) {
    ant.vy = -ant.vy
  }
  ant.x += ant.vx
  ant.y += ant.vy
}
