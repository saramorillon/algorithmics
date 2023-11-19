import { getCell, setCell } from '../../utils/plan'
import { drawCell } from './draw'
import { getRiver, getVillage } from './elements'
import { Cell, Settings } from './types'

export function run(canvas: HTMLCanvasElement, settings: Settings) {
  canvas.width = settings.width * settings.size
  canvas.height = settings.height * settings.size
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Undefined 2D context')

  const cells: Cell[][] = []

  for (let x = 0; x < settings.width; x++) {
    cells[x] = []
    for (let y = 0; y < settings.height; y++) {
      cells[x][y] = 'grass'
    }
  }

  const river = getRiver(settings)
  for (const [x, y] of river) {
    setCell(cells, x, y, 'water')
  }

  for (let i = 0; i < settings.villages.quantity; i++) {
    const road = getVillage(settings)
    for (const [x, y] of road) {
      if (getCell(cells, x, y) === 'grass') {
        setCell(cells, x, y, 'house')
      }
    }
  }

  // for (let i = 0; i < settings.nRoads; i++) {
  //   const road = getRoad(settings)
  //   for (const [x, y] of road) {
  //     setCell(cells, x, y, 'road')
  //   }
  // }

  for (let x = 0; x < settings.width; x++) {
    for (let y = 0; y < settings.height; y++) {
      drawCell(ctx, x, y, getCell(cells, x, y), settings)
    }
  }
}
