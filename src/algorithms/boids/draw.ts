import { Boid, Settings } from './types'

export function clean(ctx: CanvasRenderingContext2D, settings: Settings) {
  ctx.save()
  ctx.fillStyle = '#F1F3F5'
  ctx.fillRect(0, 0, settings.width, settings.height)
  ctx.restore()
}

export function drawBoid(ctx: CanvasRenderingContext2D, boid: Boid) {
  ctx.save()
  ctx.fillStyle = '#303030'
  ctx.translate(boid.x, boid.y)
  ctx.rotate(Math.atan2(boid.vy, boid.vx))
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(0 - 10, 0 + 4)
  ctx.lineTo(0 - 10, 0 - 4)
  ctx.lineTo(0, 0)
  ctx.fill()
  ctx.restore()
}
