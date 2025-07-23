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
            title={t('about.bio.title')}
            paragraphs={[
                t('about.bio.c1'),
                t('about.bio.c2'),
                t('about.bio.c3'),
                t('about.bio.c4'),
                t('about.bio.c5'),
                t('about.bio.c6'),
                t('about.bio.c7'),
                t('about.bio.c8'),
                t('about.bio.c9'),
            ]}
          />
        </Tab>
  
        <Tab value="education" label={t('header.about.education')}>
          <Text
            title="Education"
            paragraphs={[
                t('about.education.school.title'),
                t('about.education.school.place'),
                t('about.education.school.date'),
                "",
                t('about.education.mentorship.title'),
                t('about.education.mentorship.place'),
                t('about.education.mentorship.date'),
                "",
                t('about.education.institute.title'),
                t('about.education.institute.place'),
                t('about.education.institute.date')
            ]}
            grouped
          />
        </Tab>
      </Tabs>
    </div>
  );
};
