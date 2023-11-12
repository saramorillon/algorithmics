import { Settings } from './types'

let requestId: number | null = null

export function run(canvas: HTMLCanvasElement, settings: Settings) {
  if (requestId !== null) {
    clearTimeout(requestId)
  }

  canvas.width = settings.width * settings.size
  canvas.height = settings.height * settings.size
  const ctx = canvas.getContext('2d')

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

  function update() {
    for (let x = 0; x < settings.width; x++) {
      for (let y = 0; y < settings.height; y++) {
        const neighbours = [
          currentCells[x - 1]?.[y],
          currentCells[x - 1]?.[y - 1],
          currentCells[x]?.[y - 1],
          currentCells[x + 1]?.[y - 1],
          currentCells[x + 1]?.[y],
          currentCells[x + 1]?.[y + 1],
          currentCells[x]?.[y + 1],
          currentCells[x - 1]?.[y + 1],
        ]
        const aliveNeighbours = neighbours.filter(Boolean).length
        if (currentCells[x][y]) {
          if (aliveNeighbours >= 2 && aliveNeighbours <= 3) {
            nextCells[x][y] = true // Stay alive
          } else {
            nextCells[x][y] = false // Death by overpopulation/underpopulation
          }
        } else {
          if (aliveNeighbours === 3) {
            nextCells[x][y] = true // Birth
          } else {
            nextCells[x][y] = false // Stay dead
          }
        }
        if (ctx) {
          const rectX = x * settings.size
          const rectY = y * settings.size
          ctx.save()
          ctx.fillStyle = '#F1F3F5'
          ctx.fillRect(rectX + 1, rectY + 1, settings.width - 2, settings.height - 2)
          if (nextCells[x][y]) {
            ctx.fillStyle = '#303030'
            ctx.beginPath()
            ctx.arc(rectX + settings.size / 2, rectY + settings.size / 2, settings.size / 2 - 2, 0, Math.PI * 2)
            ctx.closePath()
            ctx.fill()
          }
          ctx.restore()
        }
      }
    }
    for (let x = 0; x < settings.width; x++) {
      for (let y = 0; y < settings.height; y++) {
        currentCells[x][y] = nextCells[x][y]
        nextCells[x][y] = false
      }
    }
    requestId = setTimeout(update, 100)
  }

  update()
}
