import { settings } from './settings'

const canvas = document.createElement('canvas')
canvas.width = settings.width * settings.size
canvas.height = settings.height * settings.size
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')!
if (!ctx) throw new Error('Undefined context')
ctx.imageSmoothingEnabled = false

export function drawCell(x: number, y: number, value: boolean) {
  const rectX = x * settings.size
  const rectY = y * settings.size
  const width = settings.size
  const height = settings.size
  const radius = (settings.size - 2) / 2
  ctx.save()
  ctx.clearRect(rectX, rectY, width, height)
  ctx.fillStyle = '#F1F3F5'
  ctx.fillRect(rectX + 1, rectY + 1, width - 2, height - 2)
  if (value) {
    ctx.fillStyle = '#303030'
    ctx.beginPath()
    ctx.arc(rectX + radius + 1, rectY + radius + 1, radius, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }
  ctx.restore()
}
