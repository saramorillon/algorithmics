import { Ant } from './Ant'
import { getCell, setCell, updateCells } from './Cells'
import { drawAnt, drawCell } from './canvas'
import { settings } from './settings'
import { Cell } from './types'

function place(cell: Cell) {
  const x = Math.floor(Math.random() * settings.width)
  const y = Math.floor(Math.random() * settings.height)
  if (getCell(x, y)?.type === 'empty') {
    setCell(x, y, cell)
    return { x, y }
  } else {
    return place(cell)
  }
}

const nest = place({ type: 'nest' })
for (let i = 0; i < settings.nFoods; i++) {
  place({ type: 'food', quantity: settings.maxFoodSize })
}

const ants: Ant[] = []
for (let i = 0; i < settings.nAnts; i++) {
  ants.push(new Ant(nest))
}

function drawAll() {
  for (let x = 0; x < settings.width; x++) {
    for (let y = 0; y < settings.height; y++) {
      drawCell(x, y, getCell(x, y))
    }
  }
  for (const ant of ants) {
    drawAnt(ant.x, ant.y)
  }
}

drawAll()

function update() {
  drawAll()
  updateCells()
  for (const ant of ants) {
    ant.update()
  }
  setTimeout(update, 100)
}

update()
