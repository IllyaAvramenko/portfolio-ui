import React from "react";
import './ArtworkItem.css';
import { Title } from "../Title/Title";
import { Paragraph } from "../Paragraph/Paragraph";

type ArtworkItemProps = {
  artwork: {
    title: string;
    dimensions: string;
    medium: string;
    imageSrc: string;
  };
  onClick: () => void;
};

export const ArtworkItem: React.FC<ArtworkItemProps> = ({ artwork, onClick }) => (
  <div className="artwork-item" onClick={onClick}>
    <img src={artwork.imageSrc} alt={artwork.title} />
    <div className="artwork-info">
      <Title level={3} size="medium" weight="bold">
        {artwork.title}
      </Title>
      <Paragraph>{`${artwork.dimensions} ${artwork.medium}`}</Paragraph>
    </div>
  </div>
);