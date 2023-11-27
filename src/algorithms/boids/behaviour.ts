import { distance, rand } from '../../utils/math'
import { Boid, Settings } from './types'

export function moveAway(boid1: Boid, boids: Boid[], settings: Settings) {
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

export function moveCloser(boid1: Boid, boids: Boid[], settings: Settings) {
  let x = 0
  let y = 0
  let n = 0
  for (const boid2 of boids) {
    if (boid2 !== boid1 && distance(boid1.x, boid1.y, boid2.x, boid2.y) < settings.visibleDistance) {
      x += boid2.x
      y += boid2.y
      n++
    }
  }
  if (n > 0) {
    boid1.vx += (x / n - boid1.x) * settings.centeringFactor
    boid1.vy += (y / n - boid1.y) * settings.centeringFactor
  }
}

export function alignWith(boid1: Boid, boids: Boid[], settings: Settings) {
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

export function adaptSpeed(boid1: Boid, settings: Settings) {
  const speed = settings.speed * rand(0.8, 1.2)
  const boidSpeed = Math.sqrt(Math.pow(boid1.vx, 2) + Math.pow(boid1.vy, 2))
  boid1.vx = (boid1.vx * speed) / boidSpeed
  boid1.vy = (boid1.vy * speed) / boidSpeed
}

export function updatePosition(boid1: Boid, settings: Settings) {
  if (boid1.x < settings.visibleDistance) boid1.vx += settings.rotationFactor
  if (boid1.x > settings.width - settings.visibleDistance) boid1.vx -= settings.rotationFactor
  if (boid1.y < settings.visibleDistance) boid1.vy += settings.rotationFactor
  if (boid1.y > settings.height - settings.visibleDistance) boid1.vy -= settings.rotationFactor

  boid1.x += boid1.vx
  boid1.y += boid1.vy
}
