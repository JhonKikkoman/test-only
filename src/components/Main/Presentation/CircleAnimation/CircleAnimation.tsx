import { gsap } from 'gsap';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';

import { IDataArr } from '../../../fakeData/data';

type pointRef = HTMLLIElement | null;

interface IProp {
  dataArr: IDataArr[];
  slide: number;
  setSlide: React.Dispatch<SetStateAction<number>>;
}

export default function CircleAnimation({ dataArr, slide, setSlide }: IProp) {
  const [angle, setAngle] = useState<number>(0);
  const [mobileHint, setMobileHint] = useState('');
  const containerRef = useRef<HTMLUListElement | null>(null);
  const pointsRef = useRef<pointRef[]>([]);

  const calcRotation = (num: number) => {
    const totalPoints = dataArr.length;
    const anglePerItem = 360 / totalPoints;
    const newAngle = (num + 1) * anglePerItem;
    const targetRotation = (num + 1 - totalPoints) * -anglePerItem;

    gsap.to(containerRef.current, {
      rotation: targetRotation,
      duration: 2.5,
      ease: 'power2.out',
    });
    setAngle(-newAngle);
  };

  useEffect(() => {
    if (containerRef.current) {
      const totalPoints = dataArr.length;
      const radius = containerRef.current?.offsetWidth / 2;
      const angleIncrement = (2 * Math.PI) / totalPoints;

      pointsRef.current.forEach((point, index) => {
        const angle = (index + 1) * angleIncrement;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        gsap.to(point, { x, y, duration: 0.2, ease: 'power2.out' });
      });
    }
  }, []);

  useEffect(() => {
    const currentHint = dataArr.filter(el => el.numSlide === slide)[0];
    setMobileHint(currentHint.hint);
    calcRotation(slide);
  }, [slide]);

  const handleClick = (slideNum: number) => {
    calcRotation(slideNum);
    setSlide(slideNum);
  };

  return (
    <div className="animation">
      <ul className="animation__circle-list" ref={containerRef}>
        {dataArr.map((el, index) => (
          <li
            className={`${slide === index + 1 ? 'active-element' : 'animation__circle-item'}`}
            key={index}
            ref={el => (pointsRef.current[index] = el)}
            onClick={() => handleClick(index + 1)}
          >
            <div className="content" style={{ rotate: `${-angle}deg` }}>
              <div className="content__wrapper">
                <span className="content__slide-position">{el.numSlide}</span>
                <span className="content__slide-hint">{el.hint}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="category visible-mobile">
        <span className="content__slide-hint">{mobileHint}</span>
      </div>
    </div>
  );
}
