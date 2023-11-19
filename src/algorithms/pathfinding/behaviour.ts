import { manathan } from '../../utils/math'
import { getCell } from '../../utils/plan'
import { Node } from './types'

function getLeastF(open: Node[]) {
  let min = 0
  for (let i = 1; i < open.length; i++) {
    if (open[i].f < open[min].f) {
      min = i
    }
  }
  return min
}

export function getPath(cells: number[][], sx: number, sy: number, dx: number, dy: number) {
  const open: Node[] = []
  const closed: Node[] = []

  open.push({ x: sx, y: sy, f: 0, g: 0, h: 0 })

  while (open.length > 0) {
    const index = getLeastF(open)
    const [current] = open.splice(index, 1)
    closed.push(current)

    const successors = [
      { x: current.x + 1, y: current.y, f: 0, g: 1, h: 0, parent: current },
      { x: current.x, y: current.y + 1, f: 0, g: 1, h: 0, parent: current },
      { x: current.x - 1, y: current.y, f: 0, g: 1, h: 0, parent: current },
      { x: current.x, y: current.y - 1, f: 0, g: 1, h: 0, parent: current },
    ]

    for (const next of successors) {
      if (next.x === dx && next.y === dy) {
        // If successor is the destination, return it
        return next
      }

      const weight = getCell(cells, next.x, next.y)

      if (weight === undefined) {
        // Ignore successor which is outside grid bounds
        continue
      }

      if (weight === 0) {
        // Ignore successor which is a wall
        continue
      }

      if (closed.some((node) => node.x === next.x && node.y === next.y)) {
        // Ignore successor which is already in the closed list
        continue
      }

      next.g += current.g
      next.h = manathan(next.x, next.y, dx, dy)
      next.f = next.g + next.h + weight

      const index = open.findIndex((node) => node.x === next.x && node.y === next.y)
      if (index === -1) {
        // Add the successor to the open list
        open.push(next)
      } else if (open[index].f > next.f) {
        // Replace better successor in the open list
        open[index] = next
      }
    }
  }
}
