import { rand } from '../../utils/math'
import { adaptSpeed, alignWith, moveAway, moveCloser, updatePosition } from './behaviour'
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
      ctx.save()
      ctx.fillStyle = '#F1F3F5'
      ctx.fillRect(0, 0, settings.width, settings.height)
      ctx.restore()
      for (const boid of boids) {
        moveCloser(boid, boids, settings)
        moveAway(boid, boids, settings)
        alignWith(boid, boids, settings)
        adaptSpeed(boid, settings)
        updatePosition(boid, settings)
        ctx.save()
        ctx.fillStyle = '#303030'
        ctx.translate(boid.x, boid.y)
        ctx.rotate(Math.atan2(boid.vy, boid.vx))
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0 - 10, 0 + 4)
        ctx.lineTo(0 - 10, 0 - 4)
        ctx.lineTo(0, 0)
        ctx.fill()
        ctx.restore()
      }
      requestId = requestAnimationFrame(update)
    }
  }

  update()
}
