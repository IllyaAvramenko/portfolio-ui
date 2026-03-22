import { FC } from 'react';
import './Footer.css';
import { FaInstagram } from 'react-icons/fa';

const INST_LINK = import.meta.env.VITE_INST_LINK;

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <a
        href={INST_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="footer__icon"
        aria-label="Instagram"
      >
        <FaInstagram />
      </a>
    </footer>
  );
};
