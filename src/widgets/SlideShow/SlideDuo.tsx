import { clsx } from 'clsx';

import type { SlideData } from '@entities/slide/types';
import { BlurBall } from '@shared/ui/BlurBall/BlurBall';
import { TextContainer } from '@shared/ui/TextContainer/TextContainer';

import styles from './slideDuo.module.css';

type Props = {
  slide: SlideData;
};

const EUCLID = "'Euclid Circular A', 'Poppins', 'Montserrat', 'Arial', sans-serif";

export function SlideDuo({ slide }: Props) {
  const [fen, styler] = slide.devices ?? [];

  return (
    <div className={styles.duo}>
      <h2 className={styles.title}>
        {slide.title.map((line) => (
          <span key={line} className={styles.titleLine}>
            {line}
          </span>
        ))}
      </h2>

      <TextContainer
        className={styles.badgeDuo}
        width={161.49}
        height={73.83}
        radius={49.57}
        paddingX={29.74}
        paddingY={9.91}
        gap={4.96}
        background="#ffffff"
        textStyle={{
          fontFamily: EUCLID,
          fontWeight: 600,
          fontSize: '53.03px',
          lineHeight: 1.01,
          letterSpacing: '-0.01em',
          textTransform: 'lowercase',
          color: '#4b4b4b',
          whiteSpace: 'nowrap',
        }}
      >
        {slide.badge}
      </TextContainer>

      <div className={styles.blurs}>
        <BlurBall className={styles.blurWhite} width={460} height={459} opacity={0.89} color="#ffffff" />
        <BlurBall className={styles.blurPeach} width={460} height={459} opacity={0.49} color="#f5d4ac" />
        <BlurBall className={styles.blurOrange} width={424} height={423} opacity={0.5} color="#ff976a" />
      </div>

      <img className={styles.model} src={slide.image} alt={slide.imageAlt} loading="eager" />

      <div className={styles.devicesRow}>
        <div className={clsx(styles.deviceColumn, styles.deviceColumnFen)}>
          <TextContainer
            className={styles.badgeFen}
            width={113.74}
            height={55.86}
            radius={33.58}
            paddingX={27.87}
            paddingY={10.43}
            gap={6.72}
            background="#4b4b4b"
            textStyle={{
              fontFamily: EUCLID,
              fontWeight: 600,
              fontSize: '27.73px',
              lineHeight: 1.27,
              letterSpacing: '-0.01em',
              textAlign: 'right',
              color: '#ffffff',
              whiteSpace: 'nowrap',
            }}
          >
            {fen?.label ?? 'Фен'}
          </TextContainer>
          <img className={styles.deviceFen} src={fen?.image} alt={fen?.label ?? 'Фен'} loading="eager" />
        </div>

        <div className={clsx(styles.deviceColumn, styles.deviceColumnStyler)}>
          <TextContainer
            className={styles.badgeStyler}
            width={172.74}
            height={55.86}
            radius={33.58}
            paddingX={27.87}
            paddingY={10.43}
            gap={6.72}
            background="#ffffff"
            textStyle={{
              fontFamily: EUCLID,
              fontWeight: 600,
              fontSize: '27.73px',
              lineHeight: 1.27,
              letterSpacing: '-0.01em',
              textAlign: 'right',
              color: '#4b4b4b',
              whiteSpace: 'nowrap',
            }}
          >
            {styler?.label ?? 'Стайлер'}
          </TextContainer>
          <img className={styles.deviceStyler} src={styler?.image} alt={styler?.label ?? 'Стайлер'} loading="eager" />
        </div>
      </div>
    </div>
  );
}
