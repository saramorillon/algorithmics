import { useEffect, useRef } from 'react'
import { run } from '../../algorithms/antColony/run'

export function AntColony() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current) {
      run(ref.current, {
        width: 500,
        height: 500,
        nAnts: 10,
        speed: 2,
        visibleDistance: 60,
      })
    }
  }, [])

  return (
    <div className="flex">
      <canvas ref={ref} />
    </div>
  )
}
