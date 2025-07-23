import React, { FC } from 'react';
import './Footer.css';
import { FaInstagram } from 'react-icons/fa';

// const FacebookIcon = FaFacebookF as FC;
const InstagramIcon = FaInstagram as FC;
const FB_LINK = process.env.REACT_APP_FB_LINK;
const INST_LINK = process.env.REACT_APP_INST_LINK;

export const Footer: FC = () => {
  console.log(FB_LINK, INST_LINK)
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