import { useCallback, useRef } from 'react';

export function useScrollToSlide(scrollRef: React.RefObject<HTMLDivElement | null>) {
  const frameRef = useRef<number | undefined>(undefined);

  return useCallback(
    (index: number) => {
      const root = scrollRef.current;
      if (!root) return;

      const matches = Array.from(root.querySelectorAll<HTMLElement>(`[data-slide-index="${index}"]`));
      if (matches.length === 0) return;

      const rootTop = root.getBoundingClientRect().top;
      const current = root.scrollTop;
      const topOf = (el: HTMLElement) => el.getBoundingClientRect().top - rootTop + current;

      const target = matches.reduce((best, el) =>
        Math.abs(topOf(el) - current) < Math.abs(topOf(best) - current) ? el : best,
      );
      const targetTop = topOf(target);

      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = undefined;
      }

      const start = current;
      const diff = targetTop - start;
      if (Math.abs(diff) < 1) return;

      const duration = 520;
      const startTime = performance.now();

      root.style.scrollSnapType = 'none';

      const step = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        root.scrollTop = start + diff * eased;

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(step);
        } else {
          frameRef.current = undefined;
          root.style.scrollSnapType = '';
        }
      };

      frameRef.current = requestAnimationFrame(step);
    },
    [scrollRef],
  );
}
