# Simulation algorithms

To run simulation, install vite globally (`yarn global add vite`) and run vite command inside the simulation directory.

## Boids

Boids simulates the flocking behaviour of birds. It relies on three rules:

- separation: steer to avoid crowding local flockmates
- alignment: steer towards the average heading of local flockmates
- cohesion: steer to move towards the average position (center of mass) of local flockmates

Source: https://en.wikipedia.org/wiki/Boids

## Conway's Game of Life

Conway's Game of Life is a cellular automaton. It consists in a two-dimensional grid containing cells. Each cell is either alive or dead. It relies on four rules:

- birth: a dead cell emerges if it has more at least 2 alive neighbours
- death by overpopulation: a living cell dies by overpopulation if it has more than 3 alive neighbours
- death by underpopulation: a living cell dies by underpopulation if it has less than 2 alive neighbours
- statu quo: every other cell stays in its previous state

Source: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
