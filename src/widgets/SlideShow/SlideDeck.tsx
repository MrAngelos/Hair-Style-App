import { forwardRef } from 'react';

import { slides } from '@entities/slide/model';

import { Slide } from './Slide';
import styles from './slideDeck.module.css';

type Props = {
  activeIndex: number;
};

type DeckItem = {
  slide: (typeof slides)[number];
  index: number;
  clone: boolean;
};

const deckItems: DeckItem[] = [
  { slide: slides[slides.length - 1], index: slides.length - 1, clone: true },
  ...slides.map((slide, index) => ({ slide, index, clone: false })),
  { slide: slides[0], index: 0, clone: true },
];

export const SlideDeck = forwardRef<HTMLDivElement, Props>(function SlideDeck({ activeIndex }, ref) {
  return (
    <div className={styles.deck} ref={ref}>
      {deckItems.map(({ slide, index, clone }) => (
        <Slide
          key={`${slide.id}-${clone ? 'clone' : 'real'}`}
          slide={slide}
          index={index}
          active={index === activeIndex}
        />
      ))}
    </div>
  );
});
