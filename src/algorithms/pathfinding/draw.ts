import { Cell, Settings } from './types'

export const colors: Record<number | 'path' | 'source' | 'target', string> = {
  0: '#303030',
  1: '#F1F3F5',
  2: '#C1C3C5',
  3: '#B1A3A5',
  path: '#FF8C00',
  source: '#DC143C',
  target: '#228B22',
}

export function drawCell(ctx: CanvasRenderingContext2D, cell: Cell, color: string, settings: Settings) {
  const rectX = cell.x * settings.size
  const rectY = cell.y * settings.size
  ctx.save()
  ctx.fillStyle = color
  ctx.fillRect(rectX + 1, rectY + 1, settings.size - 2, settings.size - 2)
  ctx.fill()
  ctx.restore()
}
