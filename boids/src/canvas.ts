import { Boid } from './Boid'
import { settings } from './settings'

const canvas = document.createElement('canvas')
canvas.width = settings.width
canvas.height = settings.height
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')!
if (!ctx) throw new Error('Undefined context')

export function drawBoid(boid: Boid) {
  ctx.save()
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

export function clearCanvas() {
  ctx.clearRect(0, 0, settings.width, settings.height)
}
