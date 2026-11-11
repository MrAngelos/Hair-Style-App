import { clsx } from 'clsx';

import styles from './starBadge.module.css';

type Props = {
  children: React.ReactNode;
  size?: number;
  fontSize?: number;
  textWidth?: number;
  textHeight?: number;
  textRotate?: number;
  textStyle?: React.CSSProperties;
  className?: string;
};

const STAR_POINTS =
  '100.00,10.00 117.04,19.84 136.61,17.78 148.17,33.70 166.88,39.78 170.97,59.02 185.60,72.19 181.50,91.43 189.51,109.41 177.94,125.32 177.94,145.00 160.90,154.84 152.90,172.81 133.33,174.87 118.71,188.03 100.00,181.95 81.29,188.03 66.67,174.87 47.10,172.81 39.10,154.84 22.06,145.00 22.06,125.32 10.49,109.41 18.50,91.43 14.40,72.19 29.03,59.02 33.12,39.78 51.83,33.70 63.39,17.78 82.96,19.84';

export function StarBadge({
  children,
  size = 180,
  fontSize = 21.86,
  textWidth,
  textHeight,
  textRotate,
  textStyle,
  className,
}: Props) {
  return (
    <div className={clsx(styles.badge, className)} style={{ width: size, height: size }}>
      <svg className={styles.shape} viewBox="0 0 200 200" aria-hidden="true">
        <polygon points={STAR_POINTS} />
      </svg>

      <span className={styles.textWrap}>
        <span
          className={styles.text}
          style={{
            width: textWidth,
            height: textHeight,
            fontSize,
            transform: textRotate ? `rotate(${textRotate}deg)` : undefined,
            ...textStyle,
          }}
        >
          {children}
        </span>
      </span>
    </div>
  );
}
