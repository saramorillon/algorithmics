import { Cell, Settings } from './types'

const colors: Record<Cell, string> = {
  empty: '#F1F3F5',
  wall: '#303030',
  path: '#FF8C00',
  source: '#DC143C',
  target: '#228B22',
  weight1: '#F1F3F5',
  weight2: '#C1C3C5',
  weight3: '#B1A3A5',
}

export function drawCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  cell: Cell | undefined,
  settings: Settings,
) {
  const rectX = x * settings.size
  const rectY = y * settings.size
  ctx.save()
  ctx.fillStyle = colors[cell || 'empty']
  ctx.fillRect(rectX + 1, rectY + 1, settings.size - 2, settings.size - 2)
  ctx.fill()
  ctx.restore()
}
