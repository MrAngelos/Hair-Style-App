import { clsx } from 'clsx';

import styles from './textContainer.module.css';

type Props = {
  children: React.ReactNode;
  width?: number;
  height?: number;
  paddingX?: number;
  paddingY?: number;
  gap?: number;
  radius?: number;
  background?: string;
  textStyle?: React.CSSProperties;
  className?: string;
};

export function TextContainer({
  children,
  width,
  height,
  paddingX = 29,
  paddingY = 10,
  gap = 10,
  radius = 60,
  background,
  textStyle,
  className,
}: Props) {
  return (
    <div
      className={clsx(styles.container, className)}
      style={{
        width,
        height,
        padding: `${paddingY}px ${paddingX}px`,
        gap,
        borderRadius: radius,
        background,
      }}
    >
      <span className={styles.text} style={textStyle}>
        {children}
      </span>
    </div>
  );
}
