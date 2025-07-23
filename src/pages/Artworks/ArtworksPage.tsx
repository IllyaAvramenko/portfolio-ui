import React, { FC } from 'react';
import './ArtworksPage.css';
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, ArtworkGrid, Paragraph } from "../../components";
import { useTranslation } from 'react-i18next';

export const ArtworksPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getActiveTabKey = (pathname: string): string => (
    pathname.includes("works-on-paper") ? "works-on-paper" : "paintings"
  );

  const handleTabChange = (key: string) => {
    navigate(`/artwork/${key}`);
  };

  const activeKey = getActiveTabKey(location.pathname);

  return (
    <div>
      <Tabs
        title={t('header.artwork.title')}
        activeKey={activeKey}
        onTabChange={handleTabChange}
      >
        <Tab value="paintings" label={t('header.artwork.paintings')}>
          <ArtworkGrid />
        </Tab>

        <Tab value="works-on-paper" label={t('header.artwork.worksOnPaper')}>
          <Paragraph>Works on Paper content here...</Paragraph>
        </Tab>
      </Tabs>
    </div>
  );
};