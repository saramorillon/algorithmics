import { settings } from './settings'
import { Cell } from './types'

const cells: Cell[] = []
for (let x = 0; x < settings.width; x++) {
  for (let y = 0; y < settings.height; y++) {
    cells.push({ type: 'empty' })
  }
}

export function getIndex(x: number, y: number) {
  if (x < 0 || x >= settings.width || y < 0 || y >= settings.height) {
    return -1
  }
  return settings.width * y + x
}

export function getCoordinates(index: number) {
  return {
    x: index % settings.width,
    y: Math.floor(index / settings.width),
  }
}

export function getCell(x: number, y: number) {
  const index = getIndex(x, y)
  if (index >= -1) {
    return cells[getIndex(x, y)]
  }
}

export function setCell(x: number, y: number, cell: Cell) {
  const index = getIndex(x, y)
  if (index > -1) {
    cells[index] = cell
  }
}

export function updateCells() {
  for (let x = 0; x < settings.width; x++) {
    for (let y = 0; y < settings.height; y++) {
      const cell = getCell(x, y)
      if (cell?.type === 'trace') {
        cell.force = Math.max(0, cell.force - 0.01)
        if (cell.force === 0) {
          setCell(x, y, { type: 'empty' })
        }
      }
    }
  }
}
