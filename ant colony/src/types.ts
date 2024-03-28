export type Type = 'nest' | 'food' | 'trace'

export type State = 'searching' | 'collecting' | 'returning' | 'dropping'

export type Cell =
  | { type: 'empty' }
  | { type: 'nest' }
  | { type: 'food'; quantity: number }
  | { type: 'trace'; force: number }

export type Point = {
  x: number
  y: number
}

export type Food = Point & {
  quantity: number
}

export type Trace = Point & {
  force: number
}
