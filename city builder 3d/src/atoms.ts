import {
  BoxGeometry,
  ColorRepresentation,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  SRGBColorSpace,
  Texture,
} from 'three'
import { Cell } from './types'

function surface(x: number, y: number, color: ColorRepresentation) {
  const geometry = new PlaneGeometry()
  const material = new MeshBasicMaterial({ color })
  const mesh = new Mesh(geometry, material)
  mesh.position.x = x
  mesh.position.y = y
  mesh.position.z = 0
  return mesh
}

function cube(x: number, y: number, color: ColorRepresentation) {
  const geometry = new BoxGeometry()
  const material = new MeshBasicMaterial({ color })
  const mesh = new Mesh(geometry, material)
  mesh.position.x = x
  mesh.position.y = y
  mesh.position.z = 0
  return mesh
}

export const mesh: Record<Cell, (x: number, y: number, textures: Record<string, Texture>) => Mesh> = {
  grass(x, y, textures) {
    const texture = textures.grass
    texture.colorSpace = SRGBColorSpace

    const geometry = new BoxGeometry()
    const material = new MeshBasicMaterial({ map: texture })
    const mesh = new Mesh(geometry, material)
    mesh.position.x = x
    mesh.position.y = y
    mesh.position.z = 0

    return mesh
  },

  water(x, y, textures) {
    const texture = textures.dirt
    texture.colorSpace = SRGBColorSpace

    const geometry = new BoxGeometry()
    const material = new MeshBasicMaterial({ map: texture })
    const mesh = new Mesh(geometry, material)
    mesh.position.x = x
    mesh.position.y = y
    mesh.position.z = 0

    return mesh
  },

  road(x, y, textures) {
    const texture = textures.road
    texture.colorSpace = SRGBColorSpace

    const geometry = new BoxGeometry()
    const material = new MeshBasicMaterial({ map: texture })
    const mesh = new Mesh(geometry, material)
    mesh.position.x = x
    mesh.position.y = y
    mesh.position.z = 0

    return mesh
  },

  forest(x, y) {
    return cube(x, y, 'darkgreen')
  },

  house(x, y) {
    return cube(x, y, 'brown')
  },

  bridge(x, y) {
    return cube(x, y, 'darkgrey')
  },
}
