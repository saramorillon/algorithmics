import { distance, rand } from '../../utils/math'
import { createRunner } from '../../utils/runner'
import { adaptSpeed, dropPheromone, getTracesWeight, moveToward, turnAround, updatePosition, wander } from './behaviour'
import { clean, drawAnt, drawFood, drawNest, drawTrace } from './draw'
import { Ant, Food, Nest, Settings, Trace } from './types'

const runner = createRunner('frame')

export function run(canvas: HTMLCanvasElement, settings: Settings) {
  runner.cancelFrame()

  canvas.width = settings.width
  canvas.height = settings.height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Undefined 2D context')

  const nest: Nest = {
    x: rand(0, settings.width),
    y: rand(0, settings.height),
    type: 'nest',
    size: 10,
  }

  const food: Food = {
    x: rand(0, settings.width),
    y: rand(0, settings.height),
    type: 'food',
    size: 20,
  }

  const ants: Ant[] = []
  for (let i = 0; i < settings.nAnts; i++) {
    ants.push({
      x: nest.x,
      y: nest.y,
      vx: rand(-1, 1),
      vy: rand(-1, 1),
      to: 'food',
      pheromones: 100,
      lastFocus: null,
    })
  }

  const traces: Trace[] = []

  let frame = 0
  function update(ctx: CanvasRenderingContext2D) {
    clean(ctx, settings)
    drawNest(ctx, nest)
    drawFood(ctx, food)

    for (let i = traces.length - 1; i >= 0; i--) {
      traces[i].force -= 0.1
      if (traces[i].force <= 0) {
        traces.splice(i, 1)
      } else {
        drawTrace(ctx, traces[i])
      }
    }

    for (const ant of ants) {
      if (frame % 5 === 0) {
        dropPheromone(ant, traces)
      }

      if (ant.to === 'food' && distance(ant.x, ant.y, food.x, food.y) < food.size + settings.visibleDistance) {
        moveToward(ant, food)
      } else if (ant.to === 'nest' && distance(ant.x, ant.y, nest.x, nest.y) < nest.size + settings.visibleDistance) {
        moveToward(ant, nest)
      } else {
        const point = getTracesWeight(ant, traces, settings)
        if (point) {
          moveToward(ant, nest)
        } else {
          wander(ant)
        }
      }

      if (ant.to === 'food' && distance(ant.x, ant.y, food.x, food.y) < food.size) {
        ant.to = 'nest'
        ant.pheromones = 100
        turnAround(ant)
      } else if (ant.to === 'nest' && distance(ant.x, ant.y, nest.x, nest.y) < nest.size) {
        ant.to = 'food'
        ant.pheromones = 100
        turnAround(ant)
      }

      adaptSpeed(ant, settings)
      updatePosition(ant, settings)
      drawAnt(ctx, ant)
    }

    runner.requestFrame(() => update(ctx))
    frame++
  }

  update(ctx)
}
