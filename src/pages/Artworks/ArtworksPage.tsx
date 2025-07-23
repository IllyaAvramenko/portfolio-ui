import React, { FC } from 'react';
import './ArtworksPage.css';
import { useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, ArtworkGrid, Paragraph } from "../../components";

export const ArtworksPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
        title="Artworks"
        activeKey={activeKey}
        onTabChange={handleTabChange}
      >
        <Tab value="paintings" label="Paintings">
          <ArtworkGrid />
        </Tab>

        <Tab value="works-on-paper" label="Works on Paper">
          <Paragraph>Works on Paper content here...</Paragraph>
        </Tab>
      </Tabs>
    </div>
  );
};