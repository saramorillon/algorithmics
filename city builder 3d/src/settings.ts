import { Cell } from './types'

export const settings = {
  width: 64,
  height: 36,
  size: 20,
  roads: {
    quantity: 3,
  },
  villages: {
    quantity: 3,
    size: 10,
  },
}

export const colors: Record<Cell, string> = {
  road: 'grey',
  house: 'brown',
  grass: 'green',
  forest: 'forestgreen',
  water: 'blue',
  bridge: 'darkgrey',
}
