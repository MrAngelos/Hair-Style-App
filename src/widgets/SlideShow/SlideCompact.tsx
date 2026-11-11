import type { SlideData } from '@entities/slide/types';
import { StarBadge } from '@shared/ui/StarBadge/StarBadge';

import styles from './slideCompact.module.css';

type Props = {
  slide: SlideData;
};

export function SlideCompact({ slide }: Props) {
  return (
    <>
      <picture className={styles.bg}>
        {slide.imageMobile && <source media="(max-width: 900px)" srcSet={slide.imageMobile} />}
        <img src={slide.image} alt={slide.imageAlt} loading="eager" />
      </picture>

      <div className={styles.content}>
        <h2 className={styles.title}>
          {slide.title.map((line) => (
            <span key={line} className={styles.titleLine}>
              {line}
            </span>
          ))}
        </h2>

        {slide.description && <p className={styles.subtitle}>{slide.description}</p>}

        {slide.floatingBadge && (
          <div className={styles.star}>
            <StarBadge size={180}>{slide.floatingBadge}</StarBadge>
          </div>
        )}
      </div>
    </>
  );
}
