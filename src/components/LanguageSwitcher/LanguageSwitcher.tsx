import React, { useRef } from 'react';
import './LanguageSwitcher.css';
import { FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const ref = useRef<HTMLUListElement | null>(null);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ua', label: 'UA' },
  ];

  const selectedLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageSelect = (language: { code: string; label: string }) => {
      if (ref.current) {
          ref.current.style.visibility = 'hidden';
      }
    i18n.changeLanguage(language.code);
  };

  const removeInlineStyle = () => {
    if (ref.current) {
        ref.current.style.visibility = '';
    }
  };

  return (
    <div className="custom-dropdown" onMouseEnter={removeInlineStyle}>
      <button className="dropdown-toggle">
        {selectedLanguage.label}
        <FaChevronDown className="dropdown-icon" />
      </button>
      <ul className="dropdown-menu" ref={ref}>
        {languages.map((lang) => (
          <li
            key={lang.code}
            className={`dropdown-item ${
              lang.code === selectedLanguage.code ? 'selected' : ''
            }`}
            onClick={() => handleLanguageSelect(lang)}
          >
            {lang.label}
          </li>
        ))}
      </ul>
    </div>
  );
};