import React, { FC, ReactNode } from 'react';
import './Title.css';

interface TitleProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'small' | 'medium' | 'large';
  weight?: 'normal' | 'bold';
  children: ReactNode;
}

export const Title: FC<TitleProps> = ({
  level = 2,
  size = 'medium',
  weight = 'normal',
  children,
}) => {
  const tagName = `h${level}`;

  return React.createElement(
    tagName,
    { className: `title title-${size} title-${weight}` },
    children
  );
};