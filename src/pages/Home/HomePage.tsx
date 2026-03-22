import { FC, useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './HomePage.css';
import { useTranslation } from 'react-i18next';

const imageUrls = [
  'https://picsum.photos/800/500?random=1',
  'https://picsum.photos/800/500?random=2',
  'https://picsum.photos/800/500?random=3',
  'https://picsum.photos/800/500?random=4',
  'https://picsum.photos/800/500?random=5',
  'https://picsum.photos/800/500?random=6',
];

export const HomePage: FC = () => {
  const { t } = useTranslation();

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    if (prevRef.current && nextRef.current) {
      setNavReady(true);
    }
  }, []);

  return (
    <div className="home">
      <section className="quote">
        <p className="quote-symbol">{'//'}</p>
        <blockquote className="quote-text">{t('home.quote')}</blockquote>
        <cite className="quote-author">— Anna Budzinska</cite>
      </section>
      <section className="image-slider-wrapper">
        <button ref={prevRef} className="custom-nav-button prev-button">
          &#8249;
        </button>

        {navReady && (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onInit={(swiper: SwiperType) => {
              const nav = swiper.params.navigation;
              if (nav && typeof nav !== 'boolean') {
                nav.prevEl = prevRef.current;
                nav.nextEl = nextRef.current;
              }
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            loop={true}
            slidesPerView={1}
            spaceBetween={50}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={1000}
          >
            {imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <img src={url} alt={t('home.slideAlt')} className="slider-image" />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <button ref={nextRef} className="custom-nav-button next-button">
          &#8250;
        </button>
      </section>
    </div>
  );
};
