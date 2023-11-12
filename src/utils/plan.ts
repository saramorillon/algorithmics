import { Cell } from '../algorithms/cityGenerator/types'
import { randInc } from './math'

export function isInsideBounds(x: number, y: number, width: number, height: number) {
  return x >= 0 && x < width && y >= 0 && y < height
}

export function getCell(cells: Cell[][], x: number, y: number) {
  return cells[x]?.[y]
}

export function setCell(cells: Cell[][], x: number, y: number, cell: Cell) {
  if (cells[x] && cells[x][y]) {
    cells[x][y] = cell
  }
}

export function getRandomPoint(minX: number, maxX: number, minY: number, maxY: number, width: number, height: number) {
  const x = randInc(minX, maxX)
  const y = randInc(minY, maxY)
  if (isInsideBounds(x, y, width, height)) {
    return { x, y }
  }
  return getRandomPoint(minX, maxX, minY, maxY, width, height)
}
