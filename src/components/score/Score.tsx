import React from "react";
import useGameStore from "../../store/useGameStore";

// Extending CSSProperties to support custom CSS variables
declare module "react" {
  interface CSSProperties {
    "--main-color"?: string;
    "--main-bg-color"?: string;
    "--pattern-color"?: string;
  }
}

const Score = () => {
  const { score } = useGameStore();

  const customStyle: React.CSSProperties = {
    '--main-color': 'rgb(46, 213, 115)',
    '--main-bg-color': 'rgba(46, 213, 116, 0.36)',
    '--pattern-color': 'rgba(46, 213, 116, 0.073)',
    filter: 'hue-rotate(0deg)',
    background: `radial-gradient(circle, var(--main-bg-color) 0%, rgba(0, 0, 0, 0) 95%), 
                 linear-gradient(var(--pattern-color) 1px, transparent 1px), 
                 linear-gradient(to right, var(--pattern-color) 1px, transparent 1px)`,
    backgroundSize: 'cover, 15px 15px, 15px 15px',
    backgroundPosition: 'center center, center center, center center',
    borderImage: `radial-gradient(circle, var(--main-color) 0%, rgba(0, 0, 0, 0) 100%) 1`,
    borderWidth: '1px 0 1px 0',
    color: 'rgb(46, 213, 115)',
    width: '100vw'
  };

  return (
    <button
      className="relative cursor-pointer uppercase tracking-wide font-bold text-xl py-4 px-12 transition-all ease-in-out"
      style={customStyle}  
    >
      {score}
    </button>
  );
};

export default Score;
