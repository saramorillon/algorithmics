export function getNextState(x: number, y: number, currentCells: boolean[][]): boolean {
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
