import { useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

import { activeSlideIndexAtom } from './atoms';

export function useActiveSlide(scrollRef: React.RefObject<HTMLDivElement | null>, count: number) {
  const [activeIndex, setActiveIndex] = useAtom(activeSlideIndexAtom);
  const ratiosRef = useRef<Map<Element, number>>(new Map());

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const ratios = ratiosRef.current;
    ratios.clear();

    const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide-index]'));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target, entry.intersectionRatio);
        }

        let best: Element | null = null;
        let bestRatio = 0;
        ratios.forEach((ratio, element) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = element;
          }
        });

        if (best && bestRatio > 0.15) {
          const index = Number((best as HTMLElement).dataset.slideIndex);
          setActiveIndex(index);
        }
      },
      { root, threshold: [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1] },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [scrollRef, count, setActiveIndex]);

  return activeIndex;
}
