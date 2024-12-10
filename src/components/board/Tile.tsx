import React from "react";

interface TileProps {
  value: number;
  colorClass: string;
}

const Tile: React.FC<TileProps> = ({ value, colorClass }) => {
  return (
    <div
      className={`flex items-center justify-center h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 ${colorClass} rounded-lg text-2xl md:text-3xl lg:text-4xl font-extrabold shadow-lg transition-transform text-black`}
    >
      {value !== 0 ? value : ""}
    </div>
  );
};

export default Tile;
