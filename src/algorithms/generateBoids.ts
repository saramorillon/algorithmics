import { distance, rand } from '../utils/math'

const width = 1280
const height = 720

type Boid = { x: number; y: number; vx: number; vy: number }

type Settings = {
  nBoids: number
  speed: number
  rotationFactor: number
  nearDistance: number
  visibleDistance: number
  avoidFactor: number
  centeringFactor: number
  matchingFactor: number
}

function moveAway(boid1: Boid, boids: Boid[], settings: Settings) {
  let vx = 0
  let vy = 0
  for (const boid2 of boids) {
    if (boid2 !== boid1 && distance(boid1.x, boid1.y, boid2.x, boid2.y) < settings.nearDistance) {
      vx += boid1.x - boid2.x
      vy += boid1.y - boid2.y
    }
  }
  boid1.vx += vx * settings.avoidFactor
  boid1.vy += vy * settings.avoidFactor
}

function moveCloser(boid1: Boid, boids: Boid[], settings: Settings) {
  let x = 0
  let y = 0
  let n = 0
  for (const boid2 of boids) {
    if (boid2 !== boid1 && distance(boid1.x, boid1.y, boid2.x, boid2.y) < settings.visibleDistance) {
      x += boid1.x
      y += boid1.y
      n++
    }
  }
  if (n > 0) {
    boid1.vx += (x / n - boid1.x) * settings.centeringFactor
    boid1.vy += (y / n - boid1.y) * settings.centeringFactor
  }
}

function alignWith(boid1: Boid, boids: Boid[], settings: Settings) {
  let vx = 0
  let vy = 0
  let n = 0
  for (const boid2 of boids) {
    if (boid2 !== boid1 && distance(boid1.x, boid1.y, boid2.x, boid2.y) < settings.visibleDistance) {
      vx += boid2.vx
      vy += boid2.vy
      n++
    }
  }
  if (n > 0) {
    boid1.vx += (vx / n - boid1.vx) * settings.matchingFactor
    boid1.vy += (vy / n - boid1.vy) * settings.matchingFactor
  }
}

function adaptSpeed(boid1: Boid, settings: Settings) {
  const speed = settings.speed * rand(0.8, 1.2)
  const boidSpeed = Math.sqrt(Math.pow(boid1.vx, 2) + Math.pow(boid1.vy, 2))
  boid1.vx = (boid1.vx * speed) / boidSpeed
  boid1.vy = (boid1.vy * speed) / boidSpeed
}

function updatePosition(boid1: Boid, settings: Settings) {
  if (boid1.x < settings.visibleDistance) boid1.vx += settings.rotationFactor
  if (boid1.x > width - settings.visibleDistance) boid1.vx -= settings.rotationFactor
  if (boid1.y < settings.visibleDistance) boid1.vy += settings.rotationFactor
  if (boid1.y > height - settings.visibleDistance) boid1.vy -= settings.rotationFactor

  boid1.x += boid1.vx
  boid1.y += boid1.vy
}

let requestId: number | null = null

export function generateBoids(canvas: HTMLCanvasElement, settings: Settings) {
  if (requestId !== null) {
    cancelAnimationFrame(requestId)
  }

  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')

  const boids: Boid[] = []
  for (let i = 0; i < settings.nBoids; i++) {
    boids.push({ x: rand(0, width), y: rand(0, height), vx: rand(-1, 1), vy: rand(-1, 1) })
  }

  function update() {
    if (ctx) {
      ctx.save()
      ctx.fillStyle = '#F1F3F5'
      ctx.fillRect(0, 0, width, height)
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
