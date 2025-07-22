import React, { useEffect, useRef, useState } from "react";
import "./Modal.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  dimensions: string;
  medium: string;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  title,
  dimensions,
  medium,
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (isOpen && imageRef.current) {
      const container = imageRef.current.parentElement;
      if (container) {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;
        const imageWidth = imageRef.current.naturalWidth;
        const imageHeight = imageRef.current.naturalHeight;

        let newWidth = imageWidth;
        let newHeight = imageHeight;

        if (imageWidth > containerWidth) {
          const widthRatio = containerWidth / imageWidth;
          newWidth = containerWidth;
          newHeight = imageHeight * widthRatio;
        }

        if (newHeight > containerHeight) {
          const heightRatio = containerHeight / newHeight;
          newHeight = containerHeight;
          newWidth = newWidth * heightRatio;
        }

        imageRef.current.style.width = `${newWidth}px`;
        imageRef.current.style.height = `${newHeight}px`;
        setImageDimensions({ width: newWidth, height: newHeight });
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // @ts-ignore
    if (!event.target.classList.contains('modal-image')) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <button className="modal-close" onClick={onClose}>
        &times;
      </button>
      <div
        className="modal-content"
        ref={contentRef}
      >
        <div className="modal-image-container">
          <img
            src={imageSrc}
            alt={title}
            ref={imageRef}
            className="modal-image"
          />
          <div
            className="modal-info"
            style={{ width: `${imageDimensions.width}px` }}
          >
            <h3>{title}</h3>
            <p>
              {dimensions} {medium}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};