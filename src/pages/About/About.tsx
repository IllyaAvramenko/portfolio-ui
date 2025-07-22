import React, { FC } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import './About.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab, Tabs } from '../../components';

export const AboutPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const activeKey = location.pathname.includes("bio")
    ? "bio"
    : "education";

  return (
    <main>
      <Tabs
        title="About"
        activeKey={activeKey}
        onTabChange={(key) => navigate(`/about/${key}`)}
      >
        <Tab value="bio" label="Bio">
          <h2>Bio</h2>
          <p>Bio content here...</p>
        </Tab>
  
        <Tab value="education" label="Education">
          <h2>Education</h2>
          <p>Education content here...</p>
        </Tab>
      </Tabs>
    </main>
  );
};