import React, { FC } from 'react';
import cn from 'classnames';
import './Image.css';

interface IImageProps {
  src: string;
  alt: string;
  className?: string;
};

export const Image: FC<IImageProps> = ({ src, alt, className }) => (
  <div className={cn('image-wrapper', className)}>
    <img src={src} alt={alt} className="image" />
  </div>
);