import React, { useEffect, useState } from 'react';
import { useLocation } from '@docusaurus/router';
import { useProgress } from '../../hooks/useProgress';
import styles from './styles.module.css';

export default function ArticleComplete(): React.ReactElement {
  const location = useLocation();
  const articleId = location.pathname.replace(/^\//, '').replace(/\/$/, '');
  const { isComplete, toggle } = useProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const complete = mounted && isComplete(articleId);

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${complete ? styles.buttonComplete : ''}`}
        onClick={() => toggle(articleId)}
        title={complete ? '点击取消完成标记' : '点击标记本文已读完'}
      >
        <span className={styles.icon}>{complete ? '✅' : '⬜'}</span>
        {complete ? '已完成' : '标记已完成'}
      </button>
    </div>
  );
}
