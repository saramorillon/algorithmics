import { isInsideBounds } from './math'
import { settings } from './settings'
import { Cell } from './types'

export class Plan {
  cells: Cell[]

  constructor() {
    this.cells = []
    for (let x = 0; x < settings.width; x++) {
      for (let y = 0; y < settings.height; y++) {
        this.cells.push('grass')
      }
    }
  }

  getIndex(x: number, y: number) {
    if (!isInsideBounds(x, y)) return -1
    return settings.width * y + x
  }

  getCoordinates(index: number) {
    return {
      x: index % settings.width,
      y: Math.floor(index / settings.width),
    }
  }

  getCell(x: number, y: number) {
    const index = this.getIndex(x, y)
    if (index >= -1) {
      return this.cells[this.getIndex(x, y)]
    }
  }

  setCell(x: number, y: number, cell: Cell) {
    const index = this.getIndex(x, y)
    if (index > -1) {
      this.cells[index] = cell
    }
  }
}
