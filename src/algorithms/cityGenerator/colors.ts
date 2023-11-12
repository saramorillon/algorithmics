import { rand } from '../../utils/math'
import { Cell } from './types'

function hsl(h: number, s: number, l: number) {
  return `hsl(${h}deg, ${s}%, ${l}%)`
}
export const colors: Record<Cell, () => string> = {
  grass: () => hsl(rand(100, 110), rand(40, 50), rand(45, 50)),
  //   sand: () => rgb(0.8, rand(0.5, 0.55), 0.1),
  water: () => hsl(rand(205, 210), rand(75, 85), rand(45, 50)),
  //   oasis: () => rgb(0, rand(0.01, 0.03), rand(0.3, 0.4)),
  house: () => hsl(rand(0, 20), rand(40, 50), rand(35, 50)),
  //   desertHouse: () => rgb(rand(0.8, 0.9), rand(0.6, 0.7), 0.3),
  road: () => hsl(rand(0, 20), 10, rand(35, 40)),
  //   desertRoad: () => rgb(0.9, rand(0.6, 0.65), 0.2),
  //   building: () => {
  //     const r = rand(0.01, 0.05)
  //     return rgb(r, r, r + 0.005)
  //   },
  tree: () => hsl(rand(100, 110), rand(40, 50), rand(25, 30)),
  //   desertTree: () => rgb(rand(0.1, 0.3), rand(0.01, 0.03), rand(0.01, 0.03)),
  //   snow: () => rgb(rand(0.85, 0.9), rand(0.85, 0.9), rand(0.95, 1)),
}
