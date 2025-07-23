import React, { FC } from 'react';
import cn from 'classnames';
import './Text.css';

interface ITextProps {
  title: string;
  paragraphs: string[];
  className?: string;
};

export const Text: FC<ITextProps> = ({ title, paragraphs, className }) => (
  <div className={cn('text-wrapper', className)}>
    <h2 className="text-title">{title}</h2>
    {paragraphs.map((paragraph, index) => (
      <p key={index} className="text-paragraph">{paragraph}</p>
    ))}
  </div>
);