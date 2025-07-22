import React, { useState } from 'react';
import './CardIcon.css';

type CardIconProps = {
  isSingleColumn: boolean;
  theme: 'dark' | 'transparent';
  onToggle: () => void;
};

export const CardIcon: React.FC<CardIconProps> = ({ isSingleColumn, theme, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button 
      className={`card-icon ${theme}`}
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className={`card-back ${isSingleColumn && !isHovered ? 'hidden' : ''}`}
          x="20"
          y="12"
          width="28"
          height="40"
          rx="4"
          stroke={theme === 'dark' ? "#333" : "rgba(0, 0, 0, 0.5)"}
          strokeWidth="2"
        />
        <rect
          x="16"
          y="16"
          width="28"
          height="40"
          rx="4"
          stroke={theme === 'dark' ? "#333" : "rgba(0, 0, 0, 0.5)"}
          strokeWidth="2"
          className="card-front"
        />
      </svg>
    </button>
  );
};