import { Settings } from './types'

export function drawCell(ctx: CanvasRenderingContext2D, x: number, y: number, value: boolean, settings: Settings) {
  const rectX = x * settings.size
  const rectY = y * settings.size
  ctx.save()
  ctx.fillStyle = '#F1F3F5'
  ctx.fillRect(rectX + 1, rectY + 1, settings.width - 2, settings.height - 2)
  if (value) {
    ctx.fillStyle = '#303030'
    ctx.beginPath()
    ctx.arc(rectX + settings.size / 2, rectY + settings.size / 2, settings.size / 2 - 2, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }
  ctx.restore()
}
