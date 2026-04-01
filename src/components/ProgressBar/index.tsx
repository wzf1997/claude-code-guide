import React, { useEffect, useState } from 'react';
import { useProgress } from '../../hooks/useProgress';
import styles from './styles.module.css';

export default function ProgressBar(): React.ReactElement {
  const { completedCount, totalArticles } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const count = mounted ? completedCount : 0;
  const percent = totalArticles > 0 ? (count / totalArticles) * 100 : 0;

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <span>学习进度</span>
        <span className={styles.count}>
          {count} / {totalArticles} 篇已完成
        </span>
      </div>
      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={count}
          aria-valuemin={0}
          aria-valuemax={totalArticles}
        />
      </div>
    </div>
  );
}
