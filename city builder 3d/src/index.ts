import { PerspectiveCamera, Scene, TextureLoader, WebGLRenderer } from 'three'
import { mesh } from './atoms'
import { generateCountry } from './generators/country'
import { settings } from './settings'

// const camera = new OrthographicCamera(0, settings.width, settings.height, 0, 1, 2)
export const camera = new PerspectiveCamera(75, settings.width / settings.height, 0.1, 1000)
camera.position.x = 31
camera.position.y = -7
camera.position.z = 25
camera.rotateX(0.6)

export const scene = new Scene()

const plan = generateCountry()

async function run() {
  const textures = {
    dirt: await new TextureLoader().loadAsync('assets/dirt.png'),
    water: await new TextureLoader().loadAsync('assets/water.png'),
    grass: await new TextureLoader().loadAsync('assets/grass.png'),
    road: await new TextureLoader().loadAsync('assets/road.png'),
  }

  for (let x = 0; x < settings.width; x++) {
    for (let y = 0; y < settings.height; y++) {
      const cell = plan.getCell(x, y)
      if (cell) {
        scene.add(mesh[cell](x, y, textures))
      }
    }
  }

  const renderer = new WebGLRenderer({ antialias: true })
  document.body.appendChild(renderer.domElement)
  renderer.setSize(settings.width * settings.size, settings.height * settings.size)
  renderer.render(scene, camera)
}

void run()
