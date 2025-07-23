import React, { ReactNode } from 'react';
import './Main.css';

interface IMainProps {
  children: ReactNode;
}

export const Main: React.FC<IMainProps> = ({ children }) => {
  return (
    <main className="main">
      <div className="main-wrapper">
        {children}
      </div>
    </main>
  );
};