import { FormEvent, useCallback, useRef } from 'react'
import { run } from '../../algorithms/cityGenerator/run'

export function CityGenerator() {
  const ref = useRef<HTMLCanvasElement>(null)

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (ref.current) {
      const settings = Object.fromEntries(new FormData(e.currentTarget))
      run(ref.current, {
        width: 128,
        height: 72,
        size: 10,
        villages: {
          quantity: Number(settings.nVillages.toString()),
          size: Number(settings.villageSize.toString()),
        },
      })
    }
  }, [])

  return (
    <div className="flex">
      <article className="mr2 mb0">
        <em>This algorithm is currently in progress</em>
        <form onSubmit={onSubmit}>
          <label>
            Number of villages
            <input type="number" name="nVillages" defaultValue={3} min={0} step={1} />
          </label>
          <label>
            Village size
            <input type="number" name="villageSize" defaultValue={10} min={0} step={1} />
          </label>
          <button data-variant="primary">Run</button>
        </form>
      </article>
      <canvas ref={ref} />
    </div>
  )
}
