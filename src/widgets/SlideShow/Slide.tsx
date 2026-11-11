import { useLayoutEffect, useRef } from 'react';

import type { SlideData } from '@entities/slide/types';

import { SlideCompact } from './SlideCompact';
import { SlideDuo } from './SlideDuo';
import { SlideLight } from './SlideLight';
import styles from './slide.module.css';

type Props = {
  slide: SlideData;
  index: number;
  active: boolean;
};

const DESIGN_W = 1240;
const DESIGN_H = 800;

const SAFE_W = 220;
const SAFE_H = 100;

export function Slide({ slide, index, active }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      const scale = Math.min(1, (width - SAFE_W) / DESIGN_W, (height - SAFE_H) / DESIGN_H);

      el.style.setProperty('--slide-scale', String(Math.max(scale, 0.2)));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      className={styles.slide}
      data-slide-index={index}
      data-active={active || undefined}
      aria-label={slide.eyebrow}
      ref={sectionRef}
    >
      <div className={styles.card}>
        <div className={styles.content}>
          {slide.kind === 'light' ? (
            <SlideLight slide={slide} />
          ) : slide.kind === 'compact' ? (
            <SlideCompact slide={slide} />
          ) : (
            <SlideDuo slide={slide} />
          )}
        </div>
      </div>
    </section>
  );
}
