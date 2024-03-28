import { settings } from './settings'
import { Cell } from './types'

const canvas = document.createElement('canvas')
canvas.width = settings.width * settings.size
canvas.height = settings.height * settings.size
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')!
if (!ctx) throw new Error('Undefined context')
ctx.imageSmoothingEnabled = false

export function drawCell(x: number, y: number, cell?: Cell) {
  const rectX = x * settings.size + 1
  const rectY = y * settings.size + 1
  const width = settings.size - 2
  const height = settings.size - 2
  ctx.clearRect(rectX, rectY, width, height)

  ctx.save()
  ctx.fillStyle = '#F1F3F5'
  ctx.fillRect(rectX, rectY, width, height)

  if (cell?.type === 'nest') {
    ctx.fillStyle = '#303030'
    ctx.fillRect(rectX, rectY, width, height)
  } else if (cell?.type === 'food') {
    ctx.fillStyle = `rgba(34, 139, 34, ${cell.quantity / 100})`
    ctx.fillRect(rectX, rectY, width, height)
  } else if (cell?.type === 'trace') {
    ctx.fillStyle = `rgba(178, 34, 34, ${cell.force})`
    ctx.fillRect(rectX, rectY, width, height)
  }

  ctx.restore()
}

export function drawAnt(x: number, y: number) {
  const rectX = x * settings.size
  const rectY = y * settings.size
  ctx.save()
  ctx.fillStyle = '#303030'
  ctx.beginPath()
  ctx.arc(rectX + settings.size / 2, rectY + settings.size / 2, settings.size / 2 - 4, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}
