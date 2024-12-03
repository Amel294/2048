import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import { areBoardsEqual, generateRandomBoard, getTileColor, shiftAndMergeLeft, transpose } from "../../utils/gameUtils";

const Board: React.FC = () => {
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

  return (
    <div className="w-fit h-fit m-2 border-solid border-2 border-gray-950 p-4 rounded-lg">
      <div className="grid grid-cols-4 gap-2">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Tile key={`${rowIndex}-${colIndex}`} value={cell} colorClass={getTileColor(cell)} />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
