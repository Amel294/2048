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
        return "bg-gradient-to-br from-green-100 to-green-300"; // Soft green gradient
      case 4:
        return "bg-gradient-to-br from-blue-100 to-blue-300"; // Soft blue gradient
      case 8:
        return "bg-gradient-to-br from-yellow-200 to-yellow-400"; // Light yellow gradient
      case 16:
        return "bg-gradient-to-br from-orange-200 to-orange-400"; // Light orange gradient
      case 32:
        return "bg-gradient-to-br from-red-200 to-red-400"; // Light coral gradient
      case 64:
        return "bg-gradient-to-br from-pink-200 to-pink-400"; // Light pink gradient
      case 128:
        return "bg-gradient-to-br from-purple-200 to-purple-400"; // Soft purple gradient
      case 256:
        return "bg-gradient-to-br from-indigo-200 to-indigo-400"; // Lavender gradient
      case 512:
        return "bg-gradient-to-br from-teal-200 to-teal-400"; // Light teal gradient
      case 1024:
        return "bg-gradient-to-br from-blue-200 to-blue-400"; // Light blue gradient
      case 2048:
        return "bg-gradient-to-br from-yellow-300 to-yellow-500"; // Soft gold gradient
      default:
        return "bg-gradient-to-br from-gray-200 to-gray-300"; // Default gradient for empty or unrecognized tiles
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
  