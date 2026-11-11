import type { SlideIconKey } from '@shared/ui/Icon/slideIcons';

export type SlideId = string;

export type SlideKind = string;

export interface DeviceItem {
  label: string;
  image: string;
  tone: 'dark' | 'light';
}

export interface SlideData {
  id: SlideId;
  kind: SlideKind;
  eyebrow: string;
  title: string[];
  badge?: string;
  description?: string;
  descriptionLines?: string[];
  image?: string;
  imageMobile?: string;
  imageAlt: string;
  devices?: DeviceItem[];
  stat?: string;
  floatingBadge?: string;
  wheelLabel: string;
  wheelLabelLines?: string[];
  wheelIcon: SlideIconKey;
}
