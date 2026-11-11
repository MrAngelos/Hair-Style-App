import { clsx } from 'clsx';

import styles from './blurBall.module.css';

type Props = {
  width?: number;
  height?: number;
  blur?: number;
  opacity?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

export function BlurBall({
  width = 507,
  height = 505,
  blur = 90,
  opacity = 0.6,
  color = '#f5d4ac',
  className,
  style,
}: Props) {
  return (
    <div
      className={clsx(styles.ball, className)}
      style={{
        width,
        height,
        background: color,
        opacity,
        filter: `blur(${blur}px)`,
        ...style,
      }}
    />
  );
}
