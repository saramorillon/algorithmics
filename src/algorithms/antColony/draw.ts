import { addAlpha } from '../../utils/colors'
import { Ant, Food, Nest, Settings, Trace } from './types'

export function clean(ctx: CanvasRenderingContext2D, settings: Settings) {
  ctx.save()
  ctx.fillStyle = '#F1F3F5'
  ctx.fillRect(0, 0, settings.width, settings.height)
  ctx.restore()
}

export function drawAnt(ctx: CanvasRenderingContext2D, ant: Ant) {
  ctx.save()
  ctx.fillStyle = '#303030'
  ctx.translate(ant.x, ant.y)
  ctx.rotate(Math.atan2(ant.vy, ant.vx))
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(0 - 10, 0 + 4)
  ctx.lineTo(0 - 10, 0 - 4)
  ctx.lineTo(0, 0)
  ctx.fill()
  ctx.restore()
}

export function drawNest(ctx: CanvasRenderingContext2D, nest: Nest) {
  ctx.save()
  ctx.fillStyle = '#8B4513'
  ctx.beginPath()
  ctx.arc(nest.x, nest.y, nest.size, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export function drawFood(ctx: CanvasRenderingContext2D, food: Food) {
  ctx.save()
  ctx.fillStyle = '#2E8B57'
  ctx.beginPath()
  ctx.arc(food.x, food.y, food.size, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export function drawTrace(ctx: CanvasRenderingContext2D, trace: Trace) {
  if (trace.force > 0) {
    ctx.save()
    ctx.fillStyle = addAlpha(trace.to === 'food' ? '#008080' : '#663399', trace.force / 15)
    ctx.fillRect(trace.x - 2, trace.y - 2, 4, 4)
    ctx.restore()
  }
}
