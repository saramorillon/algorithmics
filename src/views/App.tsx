import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import { Boids } from './pages/Boids'
import { CityGenerator } from './pages/CityGenerator'
import { GameOfLife } from './pages/GameOfLife'
import { Pathfinding } from './pages/Pathfinding'

export function App(): JSX.Element | null {
  return (
    <>
      <BrowserRouter>
        <nav aria-label="Main">
          <strong>Algorithmics</strong>
          <Link to="/boids">Boids</Link>
          <Link to="/game-of-life">Game of life</Link>
          <Link to="/pathfinding">Pathfinding</Link>
          <Link to="/city-generator">City generator</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/boids" element={<Boids />} />
            <Route path="/game-of-life" element={<GameOfLife />} />
            <Route path="/pathfinding" element={<Pathfinding />} />
            <Route path="/city-generator" element={<CityGenerator />} />
            <Route path="*" element={<Navigate to="/boids" />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}
