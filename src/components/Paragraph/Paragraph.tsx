import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import './Paragraph.css';

interface ParagraphProps {
  weight?: 'normal' | 'bold';
  children: ReactNode;
}

export const Paragraph: FC<ParagraphProps> = ({ weight = 'normal', children }) => {

  return (
    <p className={cn('paragraph', `paragraph-${weight}`)}>
      {children}
    </p>
  );
};