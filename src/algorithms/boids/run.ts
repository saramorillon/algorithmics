import { rand } from '../../utils/math'
import { adaptSpeed, alignWith, moveAway, moveCloser, updatePosition } from './behaviour'
import { clean, drawBoid } from './draw'
import { Boid, Settings } from './types'

let requestId: number | null = null

export function run(canvas: HTMLCanvasElement, settings: Settings) {
  if (requestId !== null) {
    cancelAnimationFrame(requestId)
  }

  canvas.width = settings.width
  canvas.height = settings.height
  const ctx = canvas.getContext('2d')

  const boids: Boid[] = []
  for (let i = 0; i < settings.nBoids; i++) {
    boids.push({ x: rand(0, settings.width), y: rand(0, settings.height), vx: rand(-1, 1), vy: rand(-1, 1) })
  }

  function update() {
    if (ctx) {
      clean(ctx, settings)
      for (const boid of boids) {
        moveCloser(boid, boids, settings)
        moveAway(boid, boids, settings)
        alignWith(boid, boids, settings)
        adaptSpeed(boid, settings)
        updatePosition(boid, settings)
        drawBoid(ctx, boid)
      }
      requestId = requestAnimationFrame(update)
    }
  }

  update()
}
