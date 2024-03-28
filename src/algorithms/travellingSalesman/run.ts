import { rand } from '../../utils/math'
import { createRunner } from '../../utils/runner'
import { clean, drawPoint } from './draw'
import { Path, Point, Settings } from './types'

const runner = createRunner('frame')

export function run(canvas: HTMLCanvasElement, settings: Settings) {
  runner.cancelFrame()

  canvas.width = settings.width
  canvas.height = settings.height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Undefined 2D context')

  clean(ctx, settings)

  const points: Point[] = []
  for (let i = 0; i < settings.nPoints; i++) {
    const point = { x: rand(0, settings.width), y: rand(0, settings.height) }
    points.push(point)
    drawPoint(ctx, point)
  }

  const paths: Path[] = []

  function update(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < points.length; i++) {
      const sx = points[i].x
      const sy = points[i].y

      for (const point of points) {
        if (point.x === points[i].x && point.y === points[i].y) {
          // Ignore
          continue
        }
      }
    }
    // if (!node) {
    //   return
    // }
    // if ((node.x !== source.x || node.y !== source.y) && (node.x !== target.x || node.y !== target.y)) {
    //   drawCell(ctx, node, colors.path, settings)
    // }
    // runner.requestFrame(() => update(ctx))
    // node = node.parent
  }

  update(ctx)
}
