import { randInt } from '../../utils/math'
import { getCell, getRandomPoint } from '../../utils/plan'
import { getPath } from './behaviour'
import { drawCell } from './draw'
import { Cell, Node, Settings } from './types'

let requestId: number | null = null

export function run(canvas: HTMLCanvasElement, settings: Settings) {
  if (requestId !== null) {
    clearTimeout(requestId)
  }

  canvas.width = settings.width * settings.size
  canvas.height = settings.height * settings.size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Undefined 2D context')

  const cells: number[][] = []
  for (let x = 0; x < settings.width; x++) {
    cells[x] = []
    for (let y = 0; y < settings.height; y++) {
      const weight = randInt(0, 4)
      cells[x][y] = weight
      drawCell(ctx, x, y, `weight${weight}` as Cell, settings)
    }
  }

  const [sx, sy] = getRandomPoint(0, settings.width, 0, settings.height, settings.width, settings.height)
  const [dx, dy] = getRandomPoint(0, settings.width, 0, settings.height, settings.width, settings.height)

  drawCell(ctx, sx, sy, 'source', settings)
  drawCell(ctx, dx, dy, 'target', settings)

  // Revert source and destination because the path is drawn backward
  let node: Node | undefined = getPath(cells, dx, dy, sx, sy)
  if (!node) {
    console.log('Could not find path')
    return
  }

  function update(ctx: CanvasRenderingContext2D) {
    if (!node) {
      return
    }

    if ((node.x !== sx || node.y !== sy) && (node.x !== dx || node.y !== dy)) {
      drawCell(ctx, node.x, node.y, 'path', settings)
    }

    const weight = getCell(cells, node.x, node.y)
    if (weight !== undefined) {
      node = node.parent
      requestId = setTimeout(() => update(ctx), 100 * weight)
    }
  }

  update(ctx)
}
