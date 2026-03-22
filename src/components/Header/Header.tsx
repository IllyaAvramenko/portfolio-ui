import React, { FC } from 'react';
import './Header.css';
import cn from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HamburgerMenu } from './HamburgerMenu/HamburgerMenu';
import { Button } from '../Button/Button';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../LanguageSwitcher/LanguageSwitcher';
import { useIsMobile } from '../../hooks';

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

const getHeaderNavigation = (t: TFunction): NavItem[] => [
  {
    title: t('header.home'),
    url: '/',
  },
  {
    title: t('header.artwork.title'),
    url: '/artwork',
    subitems: [
      { title: t('header.artwork.paintings'), url: '/artwork/paintings' },
      { title: t('header.artwork.worksOnPaper'), url: '/artwork/works-on-paper' },
    ],
  },
  {
    title: t('header.about.title'),
    url: '/about',
    subitems: [
      { title: t('header.about.bio'), url: '/about/bio' },
      { title: t('header.about.education'), url: '/about/education' },
    ],
  },
  {
    title: t('header.contact'),
    url: '/contact',
    className: 'contact-btn',
    disabled: true,
  },
];

export const isMenuItemActive = (item: NavItem, pathname: string) => {
  if (pathname === item.url || pathname.startsWith(item.url + '/')) return true;
  return item.subitems?.some((sub) => pathname === sub.url) ?? false;
};

export const Header: FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const isMobile = useIsMobile(880);
  const HEADER_NAV = getHeaderNavigation(t);

  return (
    <header>
      <Link to="/" className="logo">
        {'Anna Budzinska'.toUpperCase()}
      </Link>
      {isMobile ? (
        <HamburgerMenu navItems={HEADER_NAV} />
      ) : (
        <nav className="main-nav">
          {HEADER_NAV.map((item) => {
            if (item.disabled) return <React.Fragment key={item.url}></React.Fragment>;
            return (
              <div
                key={item.url}
                className={cn('nav__item-wrapper', {
                  'has-dropdown': item.subitems?.length,
                })}
              >
                <Link
                  to={item.url}
                  className={cn('nav__item', item.className, {
                    active: isMenuItemActive(item, pathname),
                  })}
                >
                  {item.title.toUpperCase()}
                </Link>
                {item.subitems && (
                  <div className="dropdown">
                    {item.subitems.map((subitem) => (
                      <Link
                        key={subitem.url}
                        to={subitem.url}
                        className={cn('dropdown__item', {
                          active: pathname === subitem.url,
                        })}
                      >
                        {subitem.title.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <LanguageSwitcher />
          <Button
            onClick={() => navigate('/contact')}
            kind="secondary"
            style={{ fontWeight: 'normal' }}
          >
            {t('header.contact')}
          </Button>
        </nav>
      )}
    </header>
  );
};
