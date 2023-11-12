export type Cell = 'grass' | 'water' | 'road' | 'tree' | 'house'

export type Settings = {
  width: number
  height: number
  size: number
  villages: {
    quantity: number
    size: number
  }
}
