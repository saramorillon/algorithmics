import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import { Boids } from './pages/Boids'
import { GameOfLife } from './pages/GameOfLife'

export function App(): JSX.Element | null {
  return (
    <>
      <BrowserRouter>
        <nav aria-label="Main">
          <strong>Algorithmics</strong>
          <Link to="/boids">Boids</Link>
          <Link to="/game-of-life">Game of life</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/boids" element={<Boids />} />
            <Route path="/game-of-life" element={<GameOfLife />} />
            <Route path="*" element={<Navigate to="/boids" />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}
