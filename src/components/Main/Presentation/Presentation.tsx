import React, { useState } from 'react';

import { arr } from '../../fakeData/data';
import CircleAnimation from './CircleAnimation';
import CircleNavigation from './CircleNavigation';
import Swiper from './Swiper';
import YearsAnimation from './YearsAnimation';

export default function Presentation(): React.JSX.Element {
  const [selectedSlide, setSelectedSlide] = useState<number>(1);

  return (
    <section className="section container">
      <div className="presentation">
        <header className="presentation__header">
          <h2 className="presentation__title">Исторические даты</h2>
        </header>
        <div className="presentation__body">
          <CircleAnimation
            dataArr={arr}
            slide={selectedSlide}
            setSlide={setSelectedSlide}
          />
          <YearsAnimation dataArr={arr} numSlide={selectedSlide} />
          <div className="divider visible-mobile"></div>
          <CircleNavigation
            total={arr.length}
            slide={selectedSlide}
            setSlide={setSelectedSlide}
          />
        </div>
        <div className="corusel">
          <Swiper numSlide={selectedSlide} />
        </div>
      </div>
    </section>
  );
}
