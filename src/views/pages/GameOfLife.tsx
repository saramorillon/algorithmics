import { useEffect, useRef } from 'react'
import { run } from '../../algorithms/gameOfLife/run'

export function GameOfLife() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current) {
      run(ref.current, {
        width: 128,
        height: 72,
        size: 10,
      })
    }
  }, [])

  return (
    <div className="flex">
      <canvas ref={ref} />
    </div>
  )
}
