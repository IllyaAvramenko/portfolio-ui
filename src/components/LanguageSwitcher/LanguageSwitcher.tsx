import React, { useState } from 'react';
import './LanguageSwitcher.css';
import { FaChevronDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [isHidden, setIsHidden] = useState(false);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ua', label: 'UA' },
  ];

  const selectedLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageSelect = (language: { code: string; label: string }) => {
    setIsHidden(true);
    i18n.changeLanguage(language.code);
  };

  return (
    <div className="custom-dropdown" onMouseEnter={() => setIsHidden(false)}>
      <button className="dropdown-toggle">
        {selectedLanguage.label}
        <FaChevronDown className="dropdown-icon" />
      </button>
      <ul className="dropdown-menu" style={isHidden ? { visibility: 'hidden' } : undefined}>
        {languages.map((lang) => (
          <li
            key={lang.code}
            className={`dropdown-item ${lang.code === selectedLanguage.code ? 'selected' : ''}`}
            onClick={() => handleLanguageSelect(lang)}
          >
            {lang.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
