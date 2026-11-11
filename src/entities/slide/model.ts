import type { SlideData } from './types';

export const slides: SlideData[] = [
  {
    id: 'duo',
    kind: 'duo',
    eyebrow: 'фен-стайлер 2 в 1',
    title: ['ФЕН и СТАЙЛЕР', 'в уникальном дизайне'],
    badge: '2 в 1',
    image: 'images/slide1-model.png',
    imageAlt: 'Модель с феном-стайлером',
    devices: [
      { label: 'Фен', image: 'images/device-fen.png', tone: 'dark' },
      { label: 'Стайлер', image: 'images/device-styler.png', tone: 'light' },
    ],
    wheelLabel: 'ФЕН-СТАЙЛЕР 2 В 1',
    wheelLabelLines: ['ФЕН-СТАЙЛЕР', '2 В 1'],
    wheelIcon: 'duo',
  },
  {
    id: 'light',
    kind: 'light',
    eyebrow: 'суперлёгкий',
    title: ['супер-', 'лёгкий'],
    description:
      'Уменьшает усталость рук при сушке волос, делая процедуру удобной и приятной даже после напряжённого рабочего дня.',
    descriptionLines: [
      'Уменьшает усталость рук',
      'при сушке волос, делая процедуру',
      'удобной и приятной даже после',
      'напряжённого рабочего дня.',
    ],
    image: 'images/slide2-model.png',
    imageMobile: 'images/slide2-model-mobile.png',
    imageAlt: 'Девушка сушит волосы лёгким стайлером',
    stat: '500 г',
    floatingBadge: 'Не тяжелее чашки кофе',
    wheelLabel: 'СУПЕРЛЁГКИЙ',
    wheelLabelLines: ['СУПЕРЛЁГКИЙ'],
    wheelIcon: 'light',
  },
  {
    id: 'compact',
    kind: 'compact',
    eyebrow: 'инновационный японский мотор',
    title: ['Для ценителей комфорта', 'и качества в уходе за волосами'],
    description: 'Бесщеточный мотор BLDC',
    image: 'images/slide3-device.png',
    imageMobile: 'images/slide3-device-mobile.png',
    imageAlt: 'Инновационный японский мотор фена-стайлера',
    floatingBadge: 'Салонная мощность',
    wheelLabel: 'ИННОВАЦИОННЫЙ ЯПОНСКИЙ МОТОР',
    wheelLabelLines: ['ИННОВАЦИОННЫЙ', 'ЯПОНСКИЙ МОТОР'],
    wheelIcon: 'compact',
  },
];

export const slidesCount = slides.length;
