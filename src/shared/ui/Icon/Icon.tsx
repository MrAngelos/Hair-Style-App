import { clsx } from 'clsx';

import styles from './icon.module.css';
import { slideIcons, type SlideIconKey } from './slideIcons';

type Props = {
  name: SlideIconKey;
  active?: boolean;
  size?: number;
  className?: string;
};

export function Icon({ name, active = false, size, className }: Props) {
  const svg = slideIcons[name];
  const px = size ?? (active ? 103 : 74);

  return (
    <span
      className={clsx(styles.wrap, active && styles.active, className)}
      style={{ width: px, height: px }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
