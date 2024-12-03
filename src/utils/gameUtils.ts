export const generateRandomBoard = (): number[][] => {
    const board = Array(4)
      .fill(null)
      .map(() => Array(4).fill(0)); // Create an empty 4x4 grid
  
    const randomizeTile = () => {
      const emptyPositions: { row: number; col: number }[] = [];
  
      // Find all empty tiles
      board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell === 0) emptyPositions.push({ row: rowIndex, col: colIndex });
        });
      });
  
      // Pick a random empty tile and assign a random value (2 or 4)
      if (emptyPositions.length > 0) {
        const randomPosition =
          emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
        const newNumber = Math.random() < 0.9 ? 2 : 4;
        board[randomPosition.row][randomPosition.col] = newNumber;
      }
    };
  
    // Place two random tiles at the start
    randomizeTile();
    randomizeTile();
  
    return board;
  };
  
  export const getTileColor = (value: number): string => {
    switch (value) {
      case 2:
        return "bg-green-100"; // Soft green
      case 4:
        return "bg-blue-100"; // Soft blue
      case 8:
        return "bg-yellow-200"; // Light yellow
      case 16:
        return "bg-orange-200"; // Light orange
      case 32:
        return "bg-red-200"; // Light coral
      case 64:
        return "bg-pink-200"; // Light pink
      case 128:
        return "bg-purple-200"; // Soft purple
      case 256:
        return "bg-indigo-200"; // Lavender
      case 512:
        return "bg-teal-200"; // Light teal
      case 1024:
        return "bg-blue-200"; // Light blue
      case 2048:
        return "bg-yellow-300"; // Soft gold
      default:
        return "bg-gray-200"; // Default background for empty or unrecognized tiles
    }
  };
  
  export const shiftAndMergeLeft = (row: number[]): number[] => {
    const nonZero = row.filter(num => num !== 0);
    for (let i = 0; i < nonZero.length - 1; i++) {
      if (nonZero[i] === nonZero[i + 1]) {
        nonZero[i] *= 2;
        nonZero[i + 1] = 0;
      }
    }
    const mergedRow = nonZero.filter(num => num !== 0);
    return [...mergedRow, ...Array(row.length - mergedRow.length).fill(0)];
  };
  
  export const transpose = (grid: number[][]): number[][] =>
    grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));
  
  export const areBoardsEqual = (board1: number[][], board2: number[][]): boolean =>
    board1.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === board2[rowIndex][colIndex])
    );
  