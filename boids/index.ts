const settings = {
  width: 1280,
  height: 720,
  nBoids: 200,
  speed: 5,
  rotationFactor: 0.5,
  nearDistance: 10,
  visibleDistance: 40,
  avoidFactor: 0.3,
  centeringFactor: 0.005,
  matchingFactor: 0.5,
}

const canvas = document.createElement('canvas')
canvas.width = settings.width
canvas.height = settings.height
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')!
if (!ctx) throw new Error('Undefined context')

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

class Boid {
  x: number
  y: number
  vx: number
  vy: number

  constructor() {
    this.x = rand(0, settings.width)
    this.y = rand(0, settings.height)
    this.vx = rand(-1, 1)
    this.vy = rand(-1, 1)
  }

  distance(boid: Boid) {
    return Math.sqrt(Math.pow(this.x - boid.x, 2) + Math.pow(this.y - boid.y, 2))
  }

  moveAway() {
    let vx = 0
    let vy = 0
    for (const boid of boids) {
      if (boid !== this && this.distance(boid) < settings.nearDistance) {
        vx += this.x - boid.x
        vy += this.y - boid.y
      }
    }
    this.vx += vx * settings.avoidFactor
    this.vy += vx * settings.avoidFactor
  }

  moveCloser() {
    let x = 0
    let y = 0
    let n = 0
    for (const boid of boids) {
      if (boid !== this && this.distance(boid) < settings.visibleDistance) {
        x += this.x
        y += this.y
        n++
      }
    }
    if (n > 0) {
      this.vx += (x / n - this.x) * settings.centeringFactor
      this.vy += (y / n - this.y) * settings.centeringFactor
    }
  }

  alignWith() {
    let vx = 0
    let vy = 0
    let n = 0
    for (const boid of boids) {
      if (boid !== this && this.distance(boid) < settings.visibleDistance) {
        vx += boid.vx
        vy += boid.vy
        n++
      }
    }
    if (n > 0) {
      this.vx += (vx / n - this.vx) * settings.matchingFactor
      this.vy += (vy / n - this.vy) * settings.matchingFactor
    }
  }

  adaptSpeed() {
    const speed = settings.speed * rand(0.8, 1.2)
    const boidSpeed = Math.sqrt(Math.pow(this.vx, 2) + Math.pow(this.vy, 2))
    this.vx = (this.vx * speed) / boidSpeed
    this.vy = (this.vy * speed) / boidSpeed
  }

  updatePosition() {
    if (this.x < settings.visibleDistance) this.vx += settings.rotationFactor
    if (this.x > settings.width - settings.visibleDistance) this.vx -= settings.rotationFactor
    if (this.y < settings.visibleDistance) this.vy += settings.rotationFactor
    if (this.y > settings.height - settings.visibleDistance) this.vy -= settings.rotationFactor

    this.x += this.vx
    this.y += this.vy
  }

  update() {
    this.moveCloser()
    this.moveAway()
    this.alignWith()
    this.adaptSpeed()
    this.updatePosition()
  }
}

const boids: Boid[] = []
for (let i = 0; i < settings.nBoids; i++) {
  boids.push(new Boid())
}

function drawBoid(boid: Boid) {
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

function update() {
  ctx.clearRect(0, 0, settings.width, settings.height)
  for (const boid of boids) {
    boid.update()
    drawBoid(boid)
  }
  requestAnimationFrame(update)
}

update()
