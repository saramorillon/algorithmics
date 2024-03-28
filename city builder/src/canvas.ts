import { colors } from './colors'
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
  if (cell) {
    const rectX = x * settings.size + 1
    const rectY = y * settings.size + 1
    const width = settings.size - 2
    const height = settings.size - 2
    ctx.save()
    ctx.fillStyle = colors[cell]()
    ctx.fillRect(rectX, rectY, width, height)
    ctx.restore()
  }
}
