import { getNextState } from './behaviour'
import { drawCell } from './draw'
import { Settings } from './types'

let requestId: NodeJS.Timeout | null = null

export function run(canvas: HTMLCanvasElement, settings: Settings) {
  if (requestId !== null) {
    clearTimeout(requestId)
  }

  canvas.width = settings.width * settings.size
  canvas.height = settings.height * settings.size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Undefined 2D context')

  const currentCells: boolean[][] = []
  const nextCells: boolean[][] = []

  for (let x = 0; x < settings.width; x++) {
    currentCells[x] = []
    nextCells[x] = []
    for (let y = 0; y < settings.height; y++) {
      currentCells[x][y] = Math.random() > 0.5
      nextCells[x][y] = false
    }
  }

  function update(ctx: CanvasRenderingContext2D) {
    for (let x = 0; x < settings.width; x++) {
      for (let y = 0; y < settings.height; y++) {
        nextCells[x][y] = getNextState(x, y, currentCells)
        drawCell(ctx, x, y, nextCells[x][y], settings)
      }
    }
    for (let x = 0; x < settings.width; x++) {
      for (let y = 0; y < settings.height; y++) {
        currentCells[x][y] = nextCells[x][y]
        nextCells[x][y] = false
      }
    }
    requestId = setTimeout(() => update(ctx), 100)
  }

  update(ctx)
}
