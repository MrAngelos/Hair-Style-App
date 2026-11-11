import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';

import { slides } from '@entities/slide/model';
import { Icon } from '@shared/ui/Icon/Icon';

import styles from './sideWheel.module.css';

type Props = {
  activeIndex: number;
  onSelect: (index: number) => void;
};

const STEP = 20;
const R = 320;

function signedSlot(index: number, activeIndex: number, count: number) {
  const rel = (((index - activeIndex) % count) + count) % count;
  return rel <= count / 2 ? rel : rel - count;
}

function normalize(deg: number) {
  let d = deg;
  while (d > 180) d -= 360;
  while (d <= -180) d += 360;
  return d;
}

export function SideWheel({ activeIndex, onSelect }: Props) {
  const initialAngles = () => slides.map((_, index) => signedSlot(index, activeIndex, slides.length) * STEP);

  const [angles, setAngles] = useState<number[]>(initialAngles);
  const [instant, setInstant] = useState(false);
  const prevActiveRef = useRef(activeIndex);

  useLayoutEffect(() => {
    if (prevActiveRef.current === activeIndex) return;

    const prevActive = prevActiveRef.current;
    prevActiveRef.current = activeIndex;

    setAngles((prev) =>
      slides.map((_, index) => {
        const slot = signedSlot(index, activeIndex, slides.length);
        const target = slot * STEP;
        const prevSlot = signedSlot(index, prevActive, slides.length);
        const prevAngle = prev[index];
        const isWrap = Math.abs(slot - prevSlot) === 2;

        const short = prevAngle + normalize(target - prevAngle);

        if (isWrap) {
          return short > prevAngle ? short - 360 : short + 360;
        }

        return short;
      }),
    );
  }, [activeIndex]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (!angles.some((angle) => normalize(angle) !== angle)) return;
      setInstant(true);
      setAngles((prev) => prev.map((angle) => normalize(angle)));
    }, 700);

    return () => clearTimeout(id);
  }, [angles]);

  useEffect(() => {
    if (!instant) return;
    const raf = requestAnimationFrame(() => setInstant(false));
    return () => cancelAnimationFrame(raf);
  }, [instant]);

  return (
    <aside className={styles.wheel} aria-label="Навигация по слайдам">
      <div className={styles.frame} aria-hidden="true" />

      {slides.map((slide, index) => {
        const active = index === activeIndex;
        const angle = angles[index];
        const iconSize = active ? 103 : 74;

        return (
          <div
            key={slide.id}
            className={styles.orbit}
            style={{ transform: `rotate(${angle}deg)`, transition: instant ? 'none' : undefined }}
          >
            <div
              className={styles.slot}
              style={{
                transform: `translateX(${R}px) rotate(${-angle}deg)`,
                transition: instant ? 'none' : undefined,
              }}
            >
              <button
                type="button"
                className={clsx(styles.item, active && styles.item_active)}
                style={{ left: -(iconSize / 2 + 8), top: -(iconSize / 2 + 8) }}
                onClick={() => onSelect(index)}
                aria-label={slide.wheelLabel}
                aria-current={active ? 'true' : undefined}
              >
                <Icon name={slide.wheelIcon} active={active} />
                {active && (
                  <span className={styles.label}>
                    {(slide.wheelLabelLines ?? [slide.wheelLabel]).map((line) => (
                      <span key={line} className={styles.labelLine}>
                        {line}
                      </span>
                    ))}
                  </span>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
