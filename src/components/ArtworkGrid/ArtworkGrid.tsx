import React, { useState } from 'react';
import './ArtworkGrid.css';
import { ArtworkItem } from '../ArtworkItem/ArtworkItem';
import { Modal } from '../Modal/Modal';

type ArtworkProps = {
  title: string;
  dimensions: string;
  medium: string;
  imageSrc: string;
};

const artworks: ArtworkProps[] = [
  {
    title: 'NOCTURNE GRENWALD',
    dimensions: '16\u201d x 20\u201d',
    medium: 'Acrylic on Panel',
    imageSrc: 'https://picsum.photos/800/500?random=1',
  },
  {
    title: 'Another Artwork',
    dimensions: '14\u201d x 18\u201d',
    medium: 'Oil on Canvas',
    imageSrc: 'https://picsum.photos/800/500?random=2',
  },
  {
    title: 'NOCTURNE GRENWALD',
    dimensions: '16\u201d x 20\u201d',
    medium: 'Acrylic on Panel',
    imageSrc: 'https://picsum.photos/800/1500?random=3',
  },
  {
    title: 'Another Artwork',
    dimensions: '14\u201d x 18\u201d',
    medium: 'Oil on Canvas',
    imageSrc: 'https://picsum.photos/1500/800?random=4',
  },
];

export const ArtworkGrid: React.FC = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkProps | null>(null);

  const openModal = (artwork: ArtworkProps) => setSelectedArtwork(artwork);
  const closeModal = () => setSelectedArtwork(null);

  return (
    <div>
      <div className="artwork-grid">
        {artworks.map((artwork) => (
          <ArtworkItem
            key={artwork.imageSrc}
            artwork={artwork}
            onClick={() => openModal(artwork)}
          />
        ))}
      </div>
      {selectedArtwork && (
        <Modal
          isOpen={!!selectedArtwork}
          onClose={closeModal}
          imageSrc={selectedArtwork.imageSrc}
          title={selectedArtwork.title}
          dimensions={selectedArtwork.dimensions}
          medium={selectedArtwork.medium}
        />
      )}
    </div>
  );
};
