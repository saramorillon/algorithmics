import { randInt } from '../../utils/math'
import { getRandomCell } from '../../utils/plan'
import { getPath } from './behaviour'
import { colors, drawCell } from './draw'
import { Cell, Settings } from './types'

let requestId: number | null = null

export function run(canvas: HTMLCanvasElement, settings: Settings) {
  if (requestId !== null) {
    clearTimeout(requestId)
  }

  canvas.width = settings.width * settings.size
  canvas.height = settings.height * settings.size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Undefined 2D context')

  const cells: Cell[][] = []
  for (let x = 0; x < settings.width; x++) {
    cells[x] = []
    for (let y = 0; y < settings.height; y++) {
      const cell = { x, y, f: 0, g: 0, h: 0, weight: randInt(0, 4) }
      cells[x][y] = cell
      drawCell(ctx, cell, colors[cell.weight], settings)
    }
  }

  const source = getRandomCell(cells)
  const target = getRandomCell(cells, [source])

  drawCell(ctx, source, colors.source, settings)
  drawCell(ctx, target, colors.target, settings)

  // Revert source and destination because the path is drawn backward
  let node: Cell | undefined = getPath(cells, target, source)
  if (!node) {
    console.log('Could not find path')
    return
  }

  function update(ctx: CanvasRenderingContext2D) {
    if (!node) {
      return
    }

    if ((node.x !== source.x || node.y !== source.y) && (node.x !== target.x || node.y !== target.y)) {
      drawCell(ctx, node, colors.path, settings)
    }

    requestId = setTimeout(() => update(ctx), 50)
    node = node.parent
  }

  update(ctx)
}
