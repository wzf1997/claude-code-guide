import React, {useEffect, useMemo, useRef, useState} from 'react';
import styles from './styles.module.css';
import {githubUrlToRawUrl, parseLineAnchor, type SourceLineRange} from './sourceUrl';

interface Props {
  file: string;
  lines?: string;
}

const GITHUB_BASE = 'https://github.com/wzf1997/claude-code-source/tree/master';

export default function SourceRef({ file, lines }: Props): React.ReactElement {
  const href = lines
    ? `${GITHUB_BASE}/${file}#L${lines}`
    : `${GITHUB_BASE}/${file}`;
  const lineRange = useMemo<SourceLineRange | null>(() => {
    try {
      return parseLineAnchor(new URL(href).hash);
    } catch {
      return null;
    }
  }, [href]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState('');
  const drawerBodyRef = useRef<HTMLDivElement | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !content || !activeLineRef.current) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      const drawerBody = drawerBodyRef.current;
      const activeLine = activeLineRef.current;

      if (!drawerBody || !activeLine) {
        return;
      }

      const targetTop =
        activeLine.offsetTop - drawerBody.clientHeight / 2 + activeLine.clientHeight / 2;

      drawerBody.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth',
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [content, isOpen]);

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const handleOpen = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsOpen(true);
    setIsLoading(true);
    setError(null);
    setContent('');

    try {
      const response = await fetch(githubUrlToRawUrl(href));

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setContent(await response.text());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : '未知错误');
    } finally {
      setIsLoading(false);
    }
  };

  const lineLabel = lineRange
    ? `L${lineRange.start}${lineRange.end ? `-L${lineRange.end}` : ''}`
    : null;
  const codeLines = content.split('\n');

  return (
    <>
      <div className={styles.card}>
        <span className={styles.icon}>📄</span>
        <span className={styles.path}>{file}</span>
        {lines && <span className={styles.lines}>L{lines}</span>}
        <a
          className={styles.link}
          href={href}
          onClick={(event) => {
            void handleOpen(event);
          }}
        >
          查看源码 →
        </a>
      </div>

      {isOpen && (
        <>
          <button
            type="button"
            className={styles.backdrop}
            aria-label="关闭源码预览遮罩"
            onClick={closeDrawer}
          />
          <aside
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="源码预览"
          >
            <div className={styles.drawerHeader}>
              <div className={styles.drawerHeaderText}>
                <div className={styles.drawerTitle}>{file}</div>
                {lineLabel && <div className={styles.drawerMeta}>{lineLabel}</div>}
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={closeDrawer}
              >
                关闭
              </button>
            </div>

            <div ref={drawerBodyRef} className={styles.drawerBody}>
              {isLoading && <p className={styles.state}>源码加载中...</p>}
              {!isLoading && error && (
                <p className={styles.stateError}>加载失败：{error}</p>
              )}
              {!isLoading && !error && (
                <pre className={styles.codeBlock}>
                  {codeLines.map((line, index) => {
                    const lineNumber = index + 1;
                    const isActive = Boolean(
                      lineRange &&
                        lineNumber >= lineRange.start &&
                        lineNumber <= (lineRange.end ?? lineRange.start),
                    );
                    const isScrollTarget = lineRange?.start === lineNumber;

                    return (
                      <div
                        key={lineNumber}
                        ref={isScrollTarget ? activeLineRef : undefined}
                        className={
                          isActive ? styles.codeLineActive : styles.codeLine
                        }
                      >
                        <span className={styles.lineNumber}>{lineNumber}</span>
                        <code className={styles.lineContent}>{line || ' '}</code>
                      </div>
                    );
                  })}
                </pre>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  );
}
