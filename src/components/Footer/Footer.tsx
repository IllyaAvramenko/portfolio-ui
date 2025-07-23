import React, { FC } from 'react';
import './Footer.css';
import { FaInstagram } from 'react-icons/fa';

// const FacebookIcon = FaFacebookF as FC;
const InstagramIcon = FaInstagram as FC;
const INST_LINK = process.env.REACT_APP_INST_LINK;

export const Footer: FC = () => {
  return (
    <footer className="footer">
      {/*<a*/}
      {/*  href={FB_LINK}*/}
      {/*  target="_blank"*/}
      {/*  rel="noopener noreferrer"*/}
      {/*  className="footer__icon"*/}
      {/*  aria-label="Facebook"*/}
      {/*>*/}
      {/*  <FacebookIcon />*/}
      {/*</a>*/}
      <a
        href={INST_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="footer__icon"
        aria-label="Instagram"
      >
        <InstagramIcon />
      </a>
    </footer>
  );
};