import { randInt } from './math'

export function isInsideBounds(x: number, y: number, width: number, height: number): boolean {
  return x >= 0 && x < width && y >= 0 && y < height
}

export function getCell<T>(cells: T[][], x: number, y: number): T | undefined {
  return cells[x]?.[y]
}

export function setCell<T>(cells: T[][], x: number, y: number, cell: T): void {
  if (cells[x] && cells[x][y]) {
    cells[x][y] = cell
  }
}

export function getRandomPoint(
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  width: number,
  height: number,
): [number, number] {
  const x = randInt(minX, maxX)
  const y = randInt(minY, maxY)
  if (isInsideBounds(x, y, width, height)) {
    return [x, y]
  }
  return getRandomPoint(minX, maxX, minY, maxY, width, height)
}
