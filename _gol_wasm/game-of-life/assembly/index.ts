export function tick(ptr: usize, width: i32, height: i32): void {
  const size = width * height;
  const current = ptr;
  const next = ptr + size;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let i = y * width + x;
      let liveNeighbors = 0;

      // check 8 neighbors
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx == 0 && dy == 0) continue;
          let nx = x + dx;
          let ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          let ni = ny * width + nx;
          liveNeighbors += load<u8>(current + ni);
        }
      }

      let cell = load<u8>(current + i);
      let newState: u8 = 0;
      if (cell == 1 && (liveNeighbors == 2 || liveNeighbors == 3)) newState = 1;
      if (cell == 0 && liveNeighbors == 3) newState = 1;

      store<u8>(next + i, newState);
    }
  }

  // copy next state to current
  for (let i = 0; i < size; i++) {
    store<u8>(current + i, load<u8>(next + i));
  }
}
