import React, { FC, useEffect, useState } from 'react';
import './Header.css';
import cn from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {HamburgerMenu} from './HamburgerMenu/HamburgerMenu';
import { Button } from '../Button/Button';

export type NavItem = {
  title: string;
  url: string;
  className?: string;
  subitems?: {
    title: string;
    url: string;
  }[];
  disabled?: boolean;
};

const HEADER_NAV: NavItem[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Artwork",
    url: "/artwork",
    subitems: [
      { title: "Paintings", url: "/artwork/paintings" },
      { title: "Works on paper", url: "/artwork/works-on-paper" },
    ],
  },
  {
    title: "About",
    url: "/about",
    subitems: [
      { title: "Bio", url: "/about/bio" },
      { title: "Education", url: "/about/education" },
    ],
  },
  // {
  //   title: "Mentoring",
  //   url: "/mentoring",
  // },
  {
    title: "Contact",
    url: "/contact",
    className: "contact-btn",
    disabled: true
  },
];

export const isMenuItemActive = (item: NavItem, pathname: string) => {
  if (pathname === item.url || pathname.startsWith(item.url + '/')) return true;
  return item.subitems?.some(sub => pathname === sub.url) ?? false;
};

export const Header: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header>
      <div className="logo" onClick={() => navigate('/')}>
        {'Anna Budzinska'.toUpperCase()}
      </div>
      {isMobile ? (
        <HamburgerMenu navItems={HEADER_NAV} />
      ) : (
        <nav className="main-nav">
          {HEADER_NAV.map((item, i) => {
            if (item.disabled) return <React.Fragment key={i}></React.Fragment>
            return (
              <div
                key={i}
                className={cn("nav__item-wrapper", {
                  'has-dropdown': item.subitems?.length,
                })}
              >
                <Link
                  to={item.url}
                  className={cn("nav__item", item.className, {
                    'active': isMenuItemActive(item, pathname)
                  })}
                >
                  {item.title.toUpperCase()}
                </Link>
                {item.subitems && (
                  <div className="dropdown">
                    {item.subitems.map((subitem) => (
                      <Link key={subitem.url} to={subitem.url} className={cn("dropdown__item", {
                        'active': pathname === subitem.url
                      })}>
                        {subitem.title.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          
          })}
          <Button onClick={() => navigate("/contact")} kind='secondary' style={{ 'fontWeight': 'normal' }}>
            CONTACT
          </Button>
        </nav>
      )}
    </header>
  );
};