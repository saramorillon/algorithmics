export function getNextState(x: number, y: number, cells: boolean[][]): boolean {
  const neighbours = [
    cells[x - 1]?.[y],
    cells[x - 1]?.[y - 1],
    cells[x]?.[y - 1],
    cells[x + 1]?.[y - 1],
    cells[x + 1]?.[y],
    cells[x + 1]?.[y + 1],
    cells[x]?.[y + 1],
    cells[x - 1]?.[y + 1],
  ]
  const aliveNeighbours = neighbours.filter(Boolean).length
  if (cells[x][y]) {
    if (aliveNeighbours >= 2 && aliveNeighbours <= 3) {
      return true // Stay alive
    } else {
      return false // Death by overpopulation/underpopulation
    }
  } else {
    if (aliveNeighbours === 3) {
      return true // Birth
    } else {
      return false // Stay dead
    }
  }
}
