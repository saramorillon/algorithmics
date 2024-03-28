import { river, road, village } from '../mollecules'
import { Plan } from '../plan'
import { settings } from '../settings'

export function generateCountry() {
  const plan = new Plan()

  for (const point of river()) {
    plan.setCell(point.x, point.y, 'water')
  }

  for (let i = 0; i < settings.roads.quantity; i++) {
    for (const point of road()) {
      if (plan.getCell(point.x, point.y) === 'water') {
        plan.setCell(point.x, point.y, 'bridge')
      } else {
        plan.setCell(point.x, point.y, 'road')
      }
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

  // // 4 : définir le(s) village(s)

  // village = []

  // for c in range(0, villagesNum):
  // 	r = randint(0, len(grid) - 1)
  // 	village.append(grid[r])

  // // 5 : générer des bâtiments sur les points de la grille qui restent

  // def distance(p, c):
  // 	return sqrt((p[0] - c[0]) * (p[0] - c[0]) + (p[1] - c[1]) * (p[1] - c[1]))

  // farm = False

  // for point in grid:
  // 	for c in village:
  // 		if(distance(point, c) < sqrt(villageSize * mapW * mapH / pi ) / 2):
  // 			farm = True
  // 			break
  // 		else:
  // 			farm = False

  // 	if(farm):
  // 		r = randint(0,2)
  // 		h = uniform(3,5)
  // 		if(r == 0):
  // 			house(uniform(0.5, 0.9), point)
  // 		else if(r == 1):
  // 			house(uniform(0.6, 0.9), point)
  // 		else if(r == 2):
  // 			road(point)

  // 	else:
  // 		grass(point)
  // 		context.scene.objects.active.data.materials.append(material("Grass"))

  // ops.object.select_all(action='TOGGLE')
  // ops.object.select_all()
  // ops.object.join()

  // return context.scene.objects.active
}
