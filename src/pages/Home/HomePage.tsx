import React, {FC, useRef, useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './HomePage.css';

const imageUrls = [
  'https://picsum.photos/800/500?random=1',
  'https://picsum.photos/800/500?random=2',
  'https://picsum.photos/800/500?random=3',
  'https://picsum.photos/800/500?random=4',
  'https://picsum.photos/800/500?random=5',
  'https://picsum.photos/800/500?random=6',
];

// const imageUrls = [
//     'https://www.dropbox.com/scl/fi/ww15ml9rc0ke9aw7r2kko/image.jpg?rlkey=5dtn42w5tfk4publvvg8hhm8d&st=obn008ki&raw=1',
//     'https://www.dropbox.com/scl/fi/x4qo7twysbt2nyw1pw6td/image2.jpg?rlkey=dklfh8js0kyks2cmej6by10a3&st=hnqup0zv&raw=1',
//     'https://www.dropbox.com/scl/fi/tuygpgjkdglq111jm2aop/image3.jpg?rlkey=eutojlaeunyensh9ybzc6j88z&st=fe39b0pb&raw=1',
//     'https://www.dropbox.com/scl/fi/qfsbdna7h4f5hvxop6fqz/image4.jpg?rlkey=ceuuf726pgpb2sbjb5s8o2t2h&st=7vpkld27&raw=1'
// ];


export const HomePage: FC = () => {
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);
    const [navReady, setNavReady] = useState(false);

    useEffect(() => {
        if (prevRef.current && nextRef.current) {
            setNavReady(true);
        }
    }, []);

    return (
        <main>
            <section className="quote">
                {/* eslint-disable-next-line */}
                <p className="quote-symbol">//</p>
                <blockquote className="quote-text">
                    Art became my refuge, and later — my voice.
                </blockquote>
                <cite className="quote-author">— Anna Budzinska</cite>
            </section>
            <section className="image-slider-wrapper">
                <button ref={prevRef} className="custom-nav-button prev-button">&#8249;</button>

                {navReady && (
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onInit={(swiper: any) => {
                            // @ts-ignore
                            swiper.params.navigation.prevEl = prevRef.current;
                            // @ts-ignore
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }}
                        loop={true}
                        slidesPerView={1}
                        spaceBetween={50}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false
                        }}
                        speed={1000}
                    >
                        {imageUrls.map((url, index) => (
                            <SwiperSlide key={index}>
                                <img src={url} alt={`Slide ${index}`} className="slider-image"/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}


                <button ref={nextRef} className="custom-nav-button next-button">&#8250;</button>
            </section>
        </main>
    );
};