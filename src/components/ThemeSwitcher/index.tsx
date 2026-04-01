import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

const COLOR_THEMES = [
  { key: 'default', label: '🔵 Default' },
  { key: 'ink', label: '🟣 Ink' },
  { key: 'paper', label: '🟤 Paper' },
] as const;

type ColorTheme = (typeof COLOR_THEMES)[number]['key'];
const STORAGE_KEY = 'claude-code-guide:color-theme';

function applyColorTheme(theme: ColorTheme): void {
  const html = document.documentElement;
  if (theme === 'default') {
    html.removeAttribute('data-color-theme');
  } else {
    html.setAttribute('data-color-theme', theme);
  }
}

export default function ThemeSwitcher(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ColorTheme>('default');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) ?? 'default') as ColorTheme;
    setActive(saved);
    applyColorTheme(saved);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function select(theme: ColorTheme) {
    setActive(theme);
    applyColorTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
    setOpen(false);
  }

  return (
    <div className={styles.switcher} ref={ref}>
      <button
        className={styles.button}
        onClick={() => setOpen((o) => !o)}
        title="切换主题"
        aria-label="切换颜色主题"
      >
        🎨
      </button>
      {open && (
        <div className={styles.dropdown}>
          {COLOR_THEMES.map((t) => (
            <button
              key={t.key}
              className={`${styles.option} ${active === t.key ? styles.optionActive : ''}`}
              onClick={() => select(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
