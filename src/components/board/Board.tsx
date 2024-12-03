import  { useEffect } from "react";

const board = [
  [2, 2, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const Board = () => {
    
    useEffect(() => {
        
        const handleKeyPress = (event: KeyboardEvent) => {
          switch (event.key) {
            case "ArrowLeft":
              console.log("Left arrow pressed");
              break;
            case "ArrowDown":
              console.log("Down arrow pressed");
              break;
            case "ArrowRight":
              console.log("Right arrow pressed");
              break;
            case "ArrowUp":
              console.log("Up arrow pressed");
              break;
            default:
              console.log("Other key pressed:", event.key);
          }
        };
    
        window.addEventListener("keydown", handleKeyPress);
    
        return () => {
          window.removeEventListener("keydown", handleKeyPress);
        };
      }, []);
      
  return (
    <div className="w-fit h-fit m-2 border-solid border-2 border-gray-950 p-4 rounded-lg">
      <div className="grid grid-cols-4 gap-2">
        {board.map((row, rowIndex) => 
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="flex items-center justify-center h-16 w-16 bg-gray-200 rounded-md text-xl font-bold"
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
