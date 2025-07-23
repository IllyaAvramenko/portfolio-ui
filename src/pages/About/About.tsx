import React, { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Image, Tab, Tabs, Text } from '../../components';
import { useTranslation } from 'react-i18next';

export const AboutPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const activeKey = location.pathname.includes("bio") ? "bio" : "education";

  return (
    <div>
      <Tabs
        title={t('header.about.title')}
        activeKey={activeKey}
        onTabChange={(key) => navigate(`/about/${key}`)}
      >
        <Tab value="bio" label={t('header.about.bio')}>
          <Image src="https://picsum.photos/800/500?random=10" alt="Description of image" />
          <Text 
            title="Artist Biography" 
            paragraphs={[
              "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat omnis molestias, obcaecati aperiam esse veniam voluptatibus autem est non beatae blanditiis quae debitis rerum laboriosam, numquam voluptas iure eaque atque, nobis officia. Iste consequuntur, sunt eaque ipsam, quas delectus tenetur pariatur numquam quos nulla provident quisquam explicabo rerum modi suscipit?", 
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quibusdam praesentium fugit voluptas est nemo aliquid laboriosam, enim, ad dolore iste corrupti molestiae recusandae perspiciatis harum pariatur neque quo, corporis accusantium voluptate in rerum natus esse modi. Culpa minus totam ipsum quasi cupiditate porro non reiciendis corporis saepe impedit? Voluptate exercitationem asperiores vitae optio, necessitatibus eveniet cum pariatur aut, excepturi quisquam illo veniam nihil! Mollitia eius architecto quam non odit!",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam maiores tempora rem consequuntur quidem deleniti eaque ab officia distinctio asperiores!",
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam maiores tempora rem consequuntur quidem deleniti eaque ab officia distinctio asperiores!",
            ]}
          />
        </Tab>
  
        <Tab value="education" label={t('header.about.education')}>
          <Text
            title="Education"
            paragraphs={[
              "School of Representational Art",
              "Chicago, IL",
              "1997 - 2001",
              "",
              "American Academy of Art",
              "Chicago, IL",
              "1996 - 1997",
              "",
              "B.A Columbia College",
              "Columbia, MO",
              "1975 - 1979"
            ]}
            grouped
          />
        </Tab>
      </Tabs>
    </div>
  );
};
