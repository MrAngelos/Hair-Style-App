import { useEffect, useRef } from 'react';

import { slidesCount } from '@entities/slide/model';
import { useActiveSlide } from '@features/slideNavigation/useActiveSlide';
import { useScrollToSlide } from '@features/slideNavigation/useScrollToSlide';

import { SideWheel } from './SideWheel';
import { SlideDeck } from './SlideDeck';

export function SlideShow() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef(false);
  const timerRef = useRef<number | undefined>(undefined);
  const deltaRef = useRef(0);
  const activeIndex = useActiveSlide(scrollRef, slidesCount);
  const scrollToSlide = useScrollToSlide(scrollRef);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    root.scrollTo({ top: root.clientHeight, behavior: 'auto' });
  }, [scrollRef]);

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const THRESHOLD = 30;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.deltaY === 0) return;
      event.preventDefault();
      if (lockRef.current) return;

      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      deltaRef.current += event.deltaY * unit;

      if (Math.abs(deltaRef.current) < THRESHOLD) return;

      const direction = Math.sign(deltaRef.current);
      deltaRef.current = 0;

      lockRef.current = true;
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        lockRef.current = false;
      }, 900);

      const next = direction > 0 ? (activeIndex + 1) % slidesCount : (activeIndex + slidesCount - 1) % slidesCount;

      scrollToSlide(next);
    };

    const jump = () => {
      const position = Math.round(root.scrollTop / root.clientHeight);

      if (position === 0) {
        root.scrollTo({ top: slidesCount * root.clientHeight, behavior: 'auto' });
      } else if (position === slidesCount + 1) {
        root.scrollTo({ top: root.clientHeight, behavior: 'auto' });
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    root.addEventListener('scrollend', jump);

    return () => {
      window.removeEventListener('wheel', onWheel);
      root.removeEventListener('scrollend', jump);
    };
  }, [scrollRef, activeIndex, scrollToSlide]);

  return (
    <>
      <SlideDeck ref={scrollRef} activeIndex={activeIndex} />
      <SideWheel activeIndex={activeIndex} onSelect={scrollToSlide} />
    </>
  );
}
