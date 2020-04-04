import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
import './CarouselSeker.css';

const items = [
  {
    src: require('../../../img/1.jpg'),
    altText: 'Slide 1',
    caption: 'Slide 1'
  },
  {
    src: require('../../../img/2.jpg'),
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: require('../../../img/3.jpg'),
    altText: 'Slide 3',
    caption: 'Slide 3'
  },
  {
    src: require('../../../img/4.jpg'),
    altText: 'Slide 4',
    caption: 'Slide 4'
  },
  {
    src: require('../../../img/5.jpg'),
    altText: 'Slide 5',
    caption: 'Slide 5'
  }
];

const CarouselSeker = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img style={{ height: '45vh' }} src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      className='Carousel'
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction='prev'
        directionText='Previous'
        onClickHandler={previous}
      />
      <CarouselControl
        direction='next'
        directionText='Next'
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default CarouselSeker;
