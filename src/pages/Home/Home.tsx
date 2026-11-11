import { MobileFeed } from '@widgets/MobileFeed/MobileFeed';
import { SlideShow } from '@widgets/SlideShow/SlideShow';

import styles from './home.module.css';

export function Home() {
  return (
    <main className={styles.home}>
      <div className={styles.desktop}>
        <SlideShow />
      </div>
      <MobileFeed />
    </main>
  );
}
