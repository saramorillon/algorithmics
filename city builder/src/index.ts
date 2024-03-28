import { drawCell } from './canvas'
import { river, road, village } from './mollecules'
import { Plan } from './plan'
import { settings } from './settings'

function generateCountry() {
  const plan = new Plan()

  for (const point of river()) {
    plan.setCell(point.x, point.y, 'water')
  }

  for (let i = 0; i < settings.roads.quantity; i++) {
    for (const point of road()) {
      plan.setCell(point.x, point.y, 'road')
    }
  }

  for (let i = 0; i < settings.villages.quantity; i++) {
    for (const point of village()) {
      if (plan.getCell(point.x, point.y) === 'grass') {
        plan.setCell(point.x, point.y, 'house')
      }
    }
  }

  return plan
}

const plan = generateCountry()

for (let x = 0; x < settings.width; x++) {
  for (let y = 0; y < settings.height; y++) {
    drawCell(x, y, plan.getCell(x, y))
  }
}
