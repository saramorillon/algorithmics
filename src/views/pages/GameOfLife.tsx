import { useEffect, useRef } from 'react'
import { gameOfLife } from '../../algorithms/game-of-life'

export function GameOfLife() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current) {
      gameOfLife(ref.current)
    }
  }, [])

  return (
    <div className="flex">
      <canvas ref={ref} />
    </div>
  )
}
