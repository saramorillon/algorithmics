import { manathan } from '../../utils/math'
import { copyCell } from '../../utils/plan'
import { Cell } from './types'

function getLeastF(open: Cell[]) {
  let min = 0
  for (let i = 1; i < open.length; i++) {
    if (open[i].f < open[min].f) {
      min = i
    }
  }
  return min
}

export function getPath(cells: Cell[][], source: Cell, target: Cell) {
  const open: Cell[] = []
  const closed: Cell[] = []

  open.push(source)

  while (open.length > 0) {
    const index = getLeastF(open)
    const [current] = open.splice(index, 1)
    closed.push(current)

    const successors = [
      [current.x + 1, current.y],
      [current.x, current.y + 1],
      [current.x - 1, current.y],
      [current.x, current.y - 1],
    ]

    for (const [x, y] of successors) {
      // Copy cell to prevent circular references
      const successor = copyCell(cells, x, y)

      if (successor === undefined) {
        // Ignore successor which is outside grid bounds
        continue
      }

      successor.parent = current

      if (successor.x === target.x && successor.y === target.y) {
        // If successor is the destination, return it
        return successor
      }

      if (successor.weight === 0) {
        // Ignore walls
        continue
      }

      if (closed.some((node) => node.x === successor.x && node.y === successor.y)) {
        // Ignore successor which is already in the closed list
        continue
      }

      successor.g = current.g + 1
      successor.h = manathan(successor.x, successor.y, target.x, target.y)
      successor.f = successor.g + successor.h + successor.weight

      const index = open.findIndex((node) => node.x === successor.x && node.y === successor.y)
      if (index === -1) {
        // Add the successor to the open list
        open.push(successor)
      } else if (open[index].f > successor.f) {
        // Replace with better successor in the open list
        open[index] = successor
      }
    }
  }
}
