import { Point, Settings } from './types'

export function clean(ctx: CanvasRenderingContext2D, settings: Settings) {
  ctx.save()
  ctx.fillStyle = '#F1F3F5'
  ctx.fillRect(0, 0, settings.width, settings.height)
  ctx.restore()
}

export function drawPoint(ctx: CanvasRenderingContext2D, point: Point) {
  ctx.save()
  ctx.fillStyle = '#303030'
  ctx.beginPath()
  ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}
