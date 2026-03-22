import React from 'react';
import './ArtworkItem.css';
import { Title } from '../Title/Title';
import { Paragraph } from '../Paragraph/Paragraph';

type ArtworkItemProps = {
  artwork: {
    title: string;
    dimensions: string;
    medium: string;
    imageSrc: string;
  };
  onClick: () => void;
};

export const ArtworkItem: React.FC<ArtworkItemProps> = ({ artwork, onClick }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className="artwork-item"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <img src={artwork.imageSrc} alt={artwork.title} loading="lazy" />
      <div className="artwork-info">
        <Title level={3} size="medium" weight="bold">
          {artwork.title}
        </Title>
        <Paragraph>{`${artwork.dimensions} ${artwork.medium}`}</Paragraph>
      </div>
    </div>
  );
};
