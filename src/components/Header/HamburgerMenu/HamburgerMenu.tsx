import React, { FC, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './HamburgerMenu.css';
import cn from 'classnames';
import { Button } from '../../Button/Button';
import { isMenuItemActive, NavItem } from '../Header';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../../LanguageSwitcher/LanguageSwitcher';

type HamburgerMenuProps = {
  navItems: NavItem[];
};

export const HamburgerMenu: FC<HamburgerMenuProps> = ({ navItems }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [isOpen, setIsOpen] = useState(false);
  const [openSubitems, setOpenSubitems] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const toggleSubitems = (url: string) => {
    setOpenSubitems(openSubitems === url ? null : url);
  };

  const handleNavigate = (url: string) => {
    navigate(url);
    toggleMenu();
  };

  return (
    <>
      <button className={cn('hamburger-icon', { hide: isOpen })} onClick={toggleMenu}>
        ☰
      </button>
      <div className={cn('hamburger-overlay', { show: isOpen })} onClick={toggleMenu}></div>
      <div className={cn('hamburger-menu', { open: isOpen })}>
        <nav className="hamburger-nav">
          {navItems.map((item, i) => {
            if (item.disabled) return <React.Fragment key={i}></React.Fragment>
            return (
              <div key={item.url}>
                <div
                  className={cn('hamburger-item', { 
                    'has-subitems': item.subitems, open: openSubitems === item.url,
                    'active': isMenuItemActive(item, pathname)
                  })}
                  onClick={() => item.subitems ? toggleSubitems(item.url) : handleNavigate(item.url)}
                >
                  {item.subitems && <span className="plus-icon">{openSubitems === item.url ? '-' : '+'}</span>}
                  <span>{item.title.toUpperCase()}</span>
                </div>
                {item.subitems && openSubitems === item.url && (
                  <div className={cn("hamburger-subitems", {
                    'active': isMenuItemActive(item, pathname)
                  })}>
                    {item.subitems.map((subitem) => (
                      <Link
                        key={subitem.url}
                        to={subitem.url}
                        className={cn("hamburger-subitem", {
                          'active': pathname === subitem.url
                        })}
                        onClick={() => handleNavigate(subitem.url)}
                      >
                        {subitem.title.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          <LanguageSwitcher />
          <Button onClick={() => handleNavigate("/contact")} kind='secondary' className='contact-button'>{t("header.contact")}</Button>
        </nav>
      </div>
    </>
  );
};