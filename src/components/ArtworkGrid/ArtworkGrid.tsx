import React, { useState } from "react";
import "./ArtworkGrid.css";
import { ArtworkItem } from "../ArtworkItem/ArtworkItem";
import { Modal } from "../Modal/Modal";
// import { CardIcon } from "../icons/Card/CardIcon";

type ArtworkProps = {
  title: string;
  dimensions: string;
  medium: string;
  imageSrc: string;
};

const artworks: ArtworkProps[] = [
  {
    title: "NOCTURNE GRENWALD",
    dimensions: "16” x 20”",
    medium: "Acrylic on Panel",
    imageSrc: "https://picsum.photos/800/500?random=1",
  },
  {
    title: "Another Artwork",
    dimensions: "14” x 18”",
    medium: "Oil on Canvas",
    imageSrc: "https://picsum.photos/800/500?random=2",
  },
  {
    title: "NOCTURNE GRENWALD",
    dimensions: "16” x 20”",
    medium: "Acrylic on Panel",
    imageSrc: "https://picsum.photos/800/1500?random=3",
  },
  {
    title: "Another Artwork",
    dimensions: "14” x 18”",
    medium: "Oil on Canvas",
    imageSrc: "https://picsum.photos/1500/800?random=4",
  },
];

export const ArtworkGrid: React.FC = () => {
  const [isSingleColumn, setIsSingleColumn] = useState(false);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkProps | null>(null);

  const toggleColumn = () => setIsSingleColumn((prev) => !prev);

  const openModal = (artwork: ArtworkProps) => setSelectedArtwork(artwork);
  const closeModal = () => setSelectedArtwork(null);

  return (
    <div>
      {/* <button
        className="button-toggle"
        onClick={toggleColumn}
        aria-label="Toggle Column Layout"
      >
      </button> */}
      <div className={`artwork-grid ${!isSingleColumn ? "single-column" : ""}`}>
        {artworks.map((artwork, index) => (
          <ArtworkItem key={index} artwork={artwork} onClick={() => openModal(artwork)} />
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