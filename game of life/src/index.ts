import { drawCell } from './canvas'
import { settings } from './settings'

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
      drawCell(x, y, nextCells[x][y])
    }
  }
  for (let x = 0; x < settings.width; x++) {
    for (let y = 0; y < settings.height; y++) {
      currentCells[x][y] = nextCells[x][y]
      nextCells[x][y] = false
    }
  }
  setTimeout(update, 100)
}

update()
