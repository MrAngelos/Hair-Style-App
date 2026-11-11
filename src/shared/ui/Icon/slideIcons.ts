import engine from '../../../../public/icons/engine.svg?raw';
import feather from '../../../../public/icons/feather.svg?raw';
import harddriver from '../../../../public/icons/harddriver.svg?raw';

export const slideIcons = {
  duo: harddriver,
  light: feather,
  compact: engine,
} as const;

export type SlideIconKey = keyof typeof slideIcons;
