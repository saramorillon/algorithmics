import { useEffect, useRef } from 'react'
import { generateGameOfLife } from '../../algorithms/generateGameOfLife'

export function GameOfLife() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current) {
      generateGameOfLife(ref.current)
    }
  }, [])

  return (
    <div className="flex">
      <canvas ref={ref} />
    </div>
  )
}
