import { useEffect, useState } from "react";

const generateRandomBoard = (): number[][] => {
    const board = Array(4)
      .fill(null)
      .map(() => Array(4).fill(0)); 
  
    const randomizeTile = () => {
      const emptyPositions: { row: number; col: number }[] = [];
      
      board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell === 0) emptyPositions.push({ row: rowIndex, col: colIndex });
        });
      });
  
      if (emptyPositions.length > 0) {
        const randomPosition =
          emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
        const newNumber = Math.random() < 0.9 ? 2 : 4;
        board[randomPosition.row][randomPosition.col] = newNumber;
      }
    };
  
    randomizeTile();
    randomizeTile();
  
    return board;
  };
  const getTileColor = (value: number): string => {
    switch (value) {
      case 2:
        return "bg-green-100"; 
      case 4:
        return "bg-blue-100"; 
      case 8:
        return "bg-yellow-200"; 
      case 16:
        return "bg-orange-200"; 
      case 32:
        return "bg-red-200"; 
      case 64:
        return "bg-pink-200"; 
      case 128:
        return "bg-purple-200"; 
      case 256:
        return "bg-indigo-200"; 
      case 512:
        return "bg-teal-200"; 
      case 1024:
        return "bg-blue-200"; 
      case 2048:
        return "bg-yellow-300"; 
      default:
        return "bg-gray-200"; 
    }
  };

const Board = () => {
  const [board, setBoard] = useState(generateRandomBoard);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
        event.preventDefault(); 
      }

      switch (event.key) {
        case "ArrowLeft":
          handleMove("left");
          break;
        case "ArrowRight":
          handleMove("right");
          break;
        case "ArrowUp":
          handleMove("up");
          break;
        case "ArrowDown":
          handleMove("down");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [board]);

  const handleMove = (direction: "left" | "right" | "up" | "down") => {
    let newBoard = structuredClone(board);

    if (direction === "left") {
      newBoard = newBoard.map(shiftAndMergeLeft);
    } else if (direction === "right") {
      newBoard = newBoard.map(row => shiftAndMergeLeft(row.reverse()).reverse());
    } else if (direction === "up") {
      newBoard = transpose(newBoard).map(shiftAndMergeLeft);
      newBoard = transpose(newBoard);
    } else if (direction === "down") {
      newBoard = transpose(newBoard).map(row => shiftAndMergeLeft(row.reverse()).reverse());
      newBoard = transpose(newBoard);
    }

    if (!areBoardsEqual(newBoard, board)) {
      spawnNewNumber(newBoard);
    }
  };

  const shiftAndMergeLeft = (row: number[]): number[] => {
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

  const transpose = (grid: number[][]): number[][] =>
    grid[0].map((_, colIndex) => grid.map(row => row[colIndex]));

  const spawnNewNumber = (currentBoard: number[][]) => {
    const emptyTiles: { row: number; col: number }[] = [];

    currentBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 0) emptyTiles.push({ row: rowIndex, col: colIndex });
      });
    });

    if (emptyTiles.length === 0) {
      console.log("Game Over");
      return;
    }

    const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];

    const newNumber = Math.random() < 0.9 ? 2 : 4;

    const updatedBoard = structuredClone(currentBoard);
    updatedBoard[randomTile.row][randomTile.col] = newNumber;

    setBoard(updatedBoard);
  };

  const areBoardsEqual = (board1: number[][], board2: number[][]): boolean =>
    board1.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === board2[rowIndex][colIndex])
    );

  return (
    <div className="w-fit h-fit m-2 border-solid border-2 border-gray-950 p-4 rounded-lg">
      <div className="grid grid-cols-4 gap-2">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`flex items-center justify-center h-16 w-16 ${getTileColor(cell)} rounded-md text-xl font-bold`}
            >
              {cell !== 0 ? cell : ""}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
