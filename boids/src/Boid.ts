import { rand } from './math'
import { settings } from './settings'

export class Boid {
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

  moveAway(boids: Boid[]) {
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

  moveCloser(boids: Boid[]) {
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

  alignWith(boids: Boid[]) {
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

  update(boids: Boid[]) {
    this.moveCloser(boids)
    this.moveAway(boids)
    this.alignWith(boids)
    this.adaptSpeed()
    this.updatePosition()
  }
}
