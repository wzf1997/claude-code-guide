import React from 'react';
import styles from './styles.module.css';

interface Props {
  file: string;
  lines?: string;
}

const NPM_BASE = 'https://www.npmjs.com/package/@anthropic-ai/claude-code';

export default function SourceRef({ file, lines }: Props): React.ReactElement {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>📄</span>
      <span className={styles.path}>{file}</span>
      {lines && <span className={styles.lines}>L{lines}</span>}
      <a
        className={styles.link}
        href={NPM_BASE}
        target="_blank"
        rel="noopener noreferrer"
      >
        查看源码 →
      </a>
    </div>
  );
}
