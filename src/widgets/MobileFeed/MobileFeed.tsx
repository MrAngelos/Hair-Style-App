import { useLayoutEffect, useRef } from 'react';

import { slides } from '@entities/slide/model';
import { BlurBall } from '@shared/ui/BlurBall/BlurBall';
import { Icon } from '@shared/ui/Icon/Icon';
import { StarBadge } from '@shared/ui/StarBadge/StarBadge';

import styles from './mobileFeed.module.css';

const DESIGN_W = 320;

const DESC_LINES = [
  'Уменьшает усталость рук',
  'при сушке волос, делая',
  'процедуру удобной и приятной',
  'даже после напряжённого',
  'рабочего дня.',
];

export function MobileFeed() {
  const feedRef = useRef<HTMLDivElement>(null);
  const [duo, light, compact] = slides;
  const fen = duo.devices?.[0];
  const styler = duo.devices?.[1];

  useLayoutEffect(() => {
    const el = feedRef.current;
    if (!el) return;

    const update = () => {
      el.style.setProperty('--m-scale', String(el.clientWidth / DESIGN_W));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className={styles.feed} ref={feedRef}>
      <section className={styles.section1}>
        <div className={styles.stage}>
          <div className={styles.model1Wrap}>
            <BlurBall
              className={styles.blurWhite}
              blur={44}
              opacity={0.89}
              color="#ffffff"
              style={{ width: '68.25%', height: 'auto', aspectRatio: '1' }}
            />
            <BlurBall
              className={styles.blurPeach}
              blur={44}
              opacity={0.49}
              color="#f5d4ac"
              style={{ width: '68.25%', height: 'auto', aspectRatio: '1' }}
            />
            <BlurBall
              className={styles.blurOrange}
              blur={44}
              opacity={0.5}
              color="#ff976a"
              style={{ width: '62.91%', height: 'auto', aspectRatio: '1' }}
            />
            <img className={styles.model1} src={duo.image} alt={duo.imageAlt} loading="eager" />
          </div>

          <h2 className={styles.title1}>
            {duo.title.map((line) => (
              <span key={line} className={styles.title1Line}>
                {line}
              </span>
            ))}
          </h2>

          <div className={styles.badgeDuo}>{duo.badge}</div>

          <div className={styles.devices}>
            <div className={styles.deviceFen}>
              <img className={styles.deviceImg} src={fen?.image} alt={fen?.label ?? 'Фен'} />
              <span className={styles.badgeFen}>{fen?.label ?? 'Фен'}</span>
            </div>
            <div className={styles.deviceStyler}>
              <img className={styles.deviceImg} src={styler?.image} alt={styler?.label ?? 'Стайлер'} />
              <span className={styles.badgeStyler}>{styler?.label ?? 'Стайлер'}</span>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.section2}>
        <div className={styles.stage}>
          <div className={styles.bigBadge}>
            <span className={styles.bigBadgeFeather}>
              <Icon name={light.wheelIcon} active size={81} />
            </span>
            <span className={styles.bigBadgeText}>
              лёгкость
              <br />и комфорт
              <br />в руке
            </span>
          </div>

          <h2 className={styles.title2}>СУПЕРЛЁГКИЙ</h2>

          <div className={styles.stat}>{light.stat ?? '500 г'}</div>

          <div className={styles.starLight}>
            <StarBadge size={99.46} fontSize={10} textWidth={70} textHeight={40} textRotate={-10}>
              {light.floatingBadge}
            </StarBadge>
          </div>

          <img className={styles.image2} src={light.imageMobile} alt={light.imageAlt} loading="eager" />

          <p className={styles.desc2}>
            {DESC_LINES.map((line) => (
              <span key={line} className={styles.descLine}>
                {line}
              </span>
            ))}
          </p>
        </div>
      </section>
      <section className={styles.section3}>
        <div className={styles.stage}>
          <div className={styles.bigBadge}>
            <span className={styles.bigBadgeEngine}>
              <Icon name={compact.wheelIcon} active size={76} />
            </span>
            <span className={styles.bigBadgeTextSmall}>
              ИННОВАЦИОННЫЙ
              <br />
              ЯПОНСКИЙ МОТОР
            </span>
          </div>

          <h2 className={styles.title3a}>ДЛЯ ЦЕНИТЕЛЕЙ</h2>
          <h2 className={styles.title3b}>
            <span className={styles.title3bLine}>КОМФОРТА</span>
            <span className={styles.title3bLine2}>И КАЧЕСТВА</span>
          </h2>
          <h2 className={styles.title3c}>В УХОДЕ ЗА ВОЛОСАМИ</h2>

          <div className={styles.image3Wrap}>
            <img className={styles.image3} src={compact.imageMobile} alt={compact.imageAlt} loading="eager" />
            <p className={styles.subtitle3}>{compact.description}</p>
          </div>

          <div className={styles.starCompact}>
            <StarBadge size={180} fontSize={21.86}>
              {compact.floatingBadge}
            </StarBadge>
          </div>
        </div>
      </section>
    </div>
  );
}
