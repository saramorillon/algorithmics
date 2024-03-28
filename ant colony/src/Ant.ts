import { getCell, setCell } from './Cells'
import { rand } from './math'
import { settings } from './settings'
import { Point, State, Type } from './types'

const directions = [
  { vx: 1, vy: 0 },
  { vx: 0, vy: 1 },
  { vx: -1, vy: 0 },
  { vx: 0, vy: -1 },
]

export class Ant implements Point {
  x: number
  y: number
  v: number
  state: State
  pheromones: number
  food: number
  history: Point[]

  constructor(point: Point) {
    this.x = point.x
    this.y = point.y
    this.v = rand(0, 3)
    this.state = 'searching'
    this.food = 0
    this.pheromones = settings.maxPheromones
    this.history = []
  }

  update() {
    if (this.state === 'searching') {
      if (this.move('food')) {
        this.state = 'collecting'
      }
    } else if (this.state === 'collecting') {
      if (this.collect()) {
        this.state = 'returning'
        this.history = []
      }
    } else if (this.state === 'returning') {
      if (this.move('nest')) {
        this.state = 'dropping'
      } else {
        this.trace()
      }
    } else if (this.state === 'dropping') {
      if (this.drop()) {
        this.state = 'searching'
        this.history = []
      }
    }
  }

  getWeight(type: Type, v: number) {
    const { vx, vy } = directions[v]
    const cell = getCell(this.x + vx, this.y + vy)
    if (!cell) return -Infinity
    if (cell.type === type) return Infinity
    if (this.history.some((p) => p.x === this.x + vx && p.y === this.y + vy)) return -1
    if (cell.type === 'trace') return cell.force
    return 0
  }

  getVariation(v: number) {
    const r = Math.random()
    if (r > 0.9) {
      return (v + 1) % 4
    }
    if (r > 0.8) {
      return (v + 3) % 4
    }
    return v
  }

  getDirection(type: Type) {
    const traces: { v: number; force: number }[] = []
    const cell = getCell(this.x, this.y)
    if (cell?.type === 'nest' || cell?.type === 'food') {
      return (this.v + 2) % 4
    }
    for (let v = 0; v < directions.length; v++) {
      const x = this.x + directions[v].vx
      const y = this.y + directions[v].vy
      const cell = getCell(x, y)
      if (cell?.type === type) {
        return v
      }
      if (this.history.some((p) => p.x === x && p.y === y)) {
        continue
      }
      if (cell?.type === 'trace') {
        traces.push({ v, force: cell.force })
      }
    }

    return this.getVariation(this.v)
  }

  resolveBounds(v: number) {
    const x = this.x + directions[v].vx
    const y = this.y + directions[v].vy
    if (x < 0 || x >= settings.width || y < 0 || y >= settings.height) {
      return this.resolveBounds((v + 1) % 4)
    }
    return v
  }

  move(type: Type) {
    this.history.push({ x: this.x, y: this.y })
    this.history = this.history.slice(-50)
    this.v = this.resolveBounds(this.getDirection(type))
    this.x += directions[this.v].vx
    this.y += directions[this.v].vy
    return getCell(this.x, this.y)?.type === type
  }

  collect() {
    const cell = getCell(this.x, this.y)
    if (cell && cell.type === 'food') {
      cell.quantity--
      this.food++
      return cell.quantity === 0 || this.food === settings.maxFood
    }
    return true
  }

  trace() {
    let cell = getCell(this.x, this.y)
    if (cell?.type === 'empty') {
      cell = { type: 'trace', force: 0 }
      setCell(this.x, this.y, cell)
    }
    if (cell?.type === 'trace') {
      cell.force = Math.ceil(cell.force + 1)
    }
  }

  drop() {
    const cell = getCell(this.x, this.y)
    if (cell && cell.type === 'nest') {
      this.food--
      return this.food === 0
    }
    return true
  }
}
