import { gsap } from 'gsap';
import React, { useEffect, useRef } from 'react';

import { IDataArr } from '../../../fakeData/data';

interface IProp {
  dataArr: IDataArr[];
  numSlide: number;
}

export default function YearsAnimation({ dataArr, numSlide }: IProp) {
  const firstDateRef = useRef<HTMLSpanElement | null>(null);
  const secondDateRef = useRef<HTMLSpanElement | null>(null);

  const firstTargetValue = useRef({ value: 1 });
  const secondTargetValue = useRef({ value: 1 });

  useEffect(() => {
    const currentSlideObj = dataArr.filter(el => el.numSlide === numSlide)[0];
    const { years } = currentSlideObj;

    const counterYears = (
      ref: React.MutableRefObject<HTMLSpanElement | null>,
      targetValue: React.MutableRefObject<{ value: number }>,
      date: number,
    ) => {
      gsap.to(targetValue.current, {
        value: date,
        duration: 3,
        ease: 'power1.out',
        onUpdate: () => {
          if (ref.current) {
            ref.current.innerText = String(
              Math.floor(targetValue.current.value),
            );
          }
        },
        onComplete: () => {
          targetValue.current.value = date;
        },
      });
    };

    counterYears(firstDateRef, firstTargetValue, years.firstDate);
    counterYears(secondDateRef, secondTargetValue, years.secondDate);
  }, [numSlide]);

  return (
    <div className="date-title">
      <span className="date-title__first" ref={firstDateRef}></span>
      <span className="date-title__second" ref={secondDateRef}></span>
    </div>
  );
}
