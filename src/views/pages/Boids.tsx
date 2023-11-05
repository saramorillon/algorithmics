import { FormEvent, useCallback, useRef } from 'react'
import { boids } from '../../algorithms/boids'

export function Boids() {
  const ref = useRef<HTMLCanvasElement>(null)

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (ref.current) {
      const settings = Object.fromEntries(new FormData(e.currentTarget))
      boids(ref.current, {
        nBoids: Number(settings.nBoids.valueOf()),
        speed: Number(settings.speed.valueOf()),
        rotationFactor: Number(settings.rotationFactor.valueOf()),
        nearDistance: Number(settings.nearDistance.valueOf()),
        visibleDistance: Number(settings.visibleDistance.valueOf()),
        avoidFactor: Number(settings.avoidFactor.valueOf()),
        centeringFactor: Number(settings.centeringFactor.valueOf()),
        matchingFactor: Number(settings.matchingFactor.valueOf()),
      })
    }
  }, [])

  return (
    <div className="flex">
      <article className="mr2 mb0">
        <aside>
          <form onSubmit={onSubmit}>
            <label>
              Number of boids
              <input type="number" name="nBoids" defaultValue={200} min={0} step={0.01} />
            </label>
            <label>
              Speed
              <input type="number" name="speed" defaultValue={5} min={0} step={0.01} />
            </label>
            <label>
              Rotation Factor
              <input type="number" name="rotationFactor" defaultValue={0.5} min={0} step={0.01} />
            </label>
            <label>
              Near Distance
              <input type="number" name="nearDistance" defaultValue={10} min={0} step={0.01} />
            </label>
            <label>
              Visible Distance
              <input type="number" name="visibleDistance" defaultValue={40} min={0} step={0.01} />
            </label>
            <label>
              Avoid Factor
              <input type="number" name="avoidFactor" defaultValue={0.3} min={0} step={0.01} />
            </label>
            <label>
              Centering Factor
              <input type="number" name="centeringFactor" defaultValue={0.05} min={0} step={0.01} />
            </label>
            <label>
              Matching Factor
              <input type="number" name="matchingFactor" defaultValue={0.5} min={0} step={0.01} />
            </label>
            <button data-variant="primary">Run</button>
          </form>
        </aside>
      </article>
      <canvas ref={ref} />
    </div>
  )
}
