import React from "react";

interface TileProps {
  value: number;
  colorClass: string;
}

const Tile: React.FC<TileProps> = ({ value, colorClass }) => {
  return (
    <div
      className={`flex items-center justify-center h-16 w-16 ${colorClass} rounded-md text-xl font-bold`}
    >
      {value !== 0 ? value : ""}
    </div>
  );
};

export default Tile;
