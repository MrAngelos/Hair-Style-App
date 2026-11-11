import type { SlideData } from '@entities/slide/types';
import { BlurBall } from '@shared/ui/BlurBall/BlurBall';
import { StarBadge } from '@shared/ui/StarBadge/StarBadge';
import { TextContainer } from '@shared/ui/TextContainer/TextContainer';

import styles from './slideLight.module.css';

type Props = {
  slide: SlideData;
};

export function SlideLight({ slide }: Props) {
  const descriptionLines = slide.descriptionLines ?? (slide.description ? [slide.description] : []);

  return (
    <>
      <BlurBall className={styles.blurBall} />

      <picture className={styles.picture}>
        {slide.imageMobile && <source media="(max-width: 900px)" srcSet={slide.imageMobile} />}
        <img className={styles.image} src={slide.image} alt={slide.imageAlt} loading="eager" />
      </picture>

      {slide.floatingBadge && (
        <div className={styles.star}>
          <StarBadge size={180} fontSize={20} textWidth={132} textHeight={44} textRotate={-10.99}>
            {slide.floatingBadge}
          </StarBadge>
        </div>
      )}

      <div className={styles.textBlock}>
        <h2 className={styles.title}>
          {slide.title.map((line) => (
            <span key={line} className={styles.titleLine}>
              {line}
            </span>
          ))}
        </h2>

        {descriptionLines.length > 0 && (
          <p className={styles.subtitle}>
            {descriptionLines.map((line) => (
              <span key={line} className={styles.subtitleLine}>
                {line}
              </span>
            ))}
          </p>
        )}
      </div>

      {slide.stat && (
        <TextContainer
          className={styles.statPill}
          width={126}
          height={55}
          paddingX={29}
          paddingY={10}
          gap={10}
          radius={60}
          background="#ffffff"
          textStyle={{
            fontFamily: "'Euclid Circular A', 'Poppins', 'Montserrat', 'Arial', sans-serif",
            fontWeight: 600,
            fontSize: '27.73px',
            lineHeight: 1.27,
            letterSpacing: '-0.01em',
            textAlign: 'right',
            whiteSpace: 'nowrap',
            color: '#4b4b4b',
          }}
        >
          {slide.stat}
        </TextContainer>
      )}
    </>
  );
}
