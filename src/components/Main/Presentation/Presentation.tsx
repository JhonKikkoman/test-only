import React, { useState } from 'react';

import { arr } from '../../fakeData/data';
import CircleAnimation from './CircleAnimation';
import CircleNavigation from './CircleNavigation';
import Swiper from './Swiper';
import YearsAnimation from './YearsAnimation';

export default function Presentation(): React.JSX.Element {
  const [slide, setSlide] = useState<number>(1);

  return (
    <section className="section container">
      <div className="presentation">
        <header className="presentation__header">
          <h2 className="presentation__title">Исторические даты</h2>
        </header>
        <div className="presentation__body">
          <CircleAnimation dataArr={arr} slide={slide} setSlide={setSlide} />
          <YearsAnimation dataArr={arr} numSlide={slide} />
          <div className="divider visible-mobile"></div>
          <CircleNavigation
            total={arr.length}
            slide={slide}
            setSlide={setSlide}
          />
        </div>
        <div className="corusel">
          <Swiper numSlide={slide} />
        </div>
      </div>
    </section>
  );
}
