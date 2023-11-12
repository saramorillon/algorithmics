import { colors } from './colors'
import { Cell, Settings } from './types'

export function drawCell(ctx: CanvasRenderingContext2D, x: number, y: number, cell: Cell, settings: Settings) {
  ctx.save()
  ctx.fillStyle = colors[cell]()
  ctx.fillRect(x * settings.size, y * settings.size, settings.size, settings.size)
  ctx.restore()
}
