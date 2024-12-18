import React, { useEffect, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper as BaseSwiper, SwiperSlide } from 'swiper/react';

import { arr, factsAarrT } from '../../../fakeData/data';
// @ts-expect-error no types
import 'swiper/css';
// @ts-expect-error no types
import 'swiper/css/pagination';
// @ts-expect-error no types
import 'swiper/css/navigation';

import { Swiper as BasicSwiper } from 'swiper';

interface IProp {
  numSlide: number;
}

export default function Swiper({ numSlide }: IProp): React.JSX.Element {
  const [factsArr, setFactsArr] = useState<factsAarrT[]>([]);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFistSlide, setIsFirstSlide] = useState(true);

  const handleSlideChange = (swiper: BasicSwiper) => {
    if (swiper.isBeginning) {
      setIsFirstSlide(true);
    } else {
      setIsFirstSlide(false);
    }
    if (swiper.isEnd) {
      setIsLastSlide(true);
    } else {
      setIsLastSlide(false);
    }
  };

  const pagination = {
    clickable: true,
    renderBullet: function (_: number, className: string) {
      return '<span class="' + className + '"></span>';
    },
  };

  useEffect(() => {
    const currentObjSlide = arr.filter(el => el.numSlide === numSlide)[0];
    setFactsArr(currentObjSlide.facts);
  }, [numSlide]);
  return (
    <div className="base-swiper container">
      <div className="base-swiper__wrapper">
        <button
          className={`custom-button-prev hidden-mobile ${isFistSlide ? 'visually-hidden' : ''}`}
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
          </svg>
        </button>
        <button
          className={`custom-button-next hidden-mobile ${isLastSlide ? 'visually-hidden' : ''}`}
        >
          <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
          </svg>
        </button>
        <BaseSwiper
          pagination={pagination}
          navigation={{
            hideOnClick: true,
            nextEl: '.custom-button-next',
            prevEl: '.custom-button-prev',
          }}
          modules={[Pagination, Navigation]}
          breakpoints={{
            1240: { slidesPerView: 3, spaceBetween: 10, pagination: false },
            320: { slidesPerView: 1, spaceBetween: 10, navigation: false },
          }}
          onSlideChange={handleSlideChange}
          loop={false}
        >
          {factsArr.map((el, index) => (
            <SwiperSlide key={`${el.year}_${index}`}>
              <div className="swiper-slide-content">
                <h4 className="swiper-slide-content__title">{el.year}</h4>
                <span className="swiper-slide-content__text">{el.text}</span>
              </div>
            </SwiperSlide>
          ))}
        </BaseSwiper>
      </div>
    </div>
  );
}
