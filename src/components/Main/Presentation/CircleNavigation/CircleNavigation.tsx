import React, { SetStateAction } from 'react';

interface IProp {
  total: number;
  slide: number;
  setSlide: React.Dispatch<SetStateAction<number>>;
}

type clickT = React.MouseEvent<HTMLButtonElement>;

export default function CircleNavigation({ total, slide, setSlide }: IProp) {
  const handleClick = ({ currentTarget }: clickT) => {
    if (currentTarget.name === 'left-arrow') {
      const currentSlide = slide === 1 ? slide : slide - 1;
      setSlide(currentSlide);
    }
    if (currentTarget.name === 'right-arrow') {
      const currentSlide = slide === total ? slide : slide + 1;
      setSlide(currentSlide);
    }
  };

  return (
    <div className="date-navigation">
      <p className="date-navigation__title">{`${slide >= 10 ? slide : '0' + slide}/${total >= 10 ? total : '0' + total}`}</p>
      <div className="date-navigation__wrapper-button">
        <button
          type="button"
          name="left-arrow"
          className="date-navigation__wrapper-button-icon"
          onClick={handleClick}
        >
          <svg
            className="date-navigation__icon"
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6 6L1 11" stroke="#42567A" strokeWidth="2" />
          </svg>
        </button>
        <button
          type="button"
          name="right-arrow"
          className="date-navigation__wrapper-button-icon"
          onClick={handleClick}
        >
          <svg
            className="date-navigation__icon"
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L6 6L1 11" stroke="#42567A" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
