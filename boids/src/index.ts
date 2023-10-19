import { Boid } from './Boid'
import { clearCanvas, drawBoid } from './canvas'
import { settings } from './settings'

const boids: Boid[] = []
for (let i = 0; i < settings.nBoids; i++) {
  boids.push(new Boid())
}

function update() {
  clearCanvas()
  for (const boid of boids) {
    boid.update(boids)
    drawBoid(boid)
  }
  requestAnimationFrame(update)
}

update()
