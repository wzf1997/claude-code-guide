# SourceRef Drawer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `SourceRef`'s GitHub navigation with an in-site right drawer that loads and displays the linked source content.

**Architecture:** Keep `SourceRef`'s existing `href` generation unchanged, intercept the click in React, convert the GitHub page URL into a fetchable raw-content URL, and render the fetched text inside a client-side drawer. Keep drawer state and fetch lifecycle inside the component tree so MDX usage stays unchanged.

**Tech Stack:** Docusaurus 3, React 19, TypeScript, CSS modules

---

### Task 1: Add URL conversion tests

**Files:**
- Create: `src/components/SourceRef/sourceUrl.test.ts`
- Create: `src/components/SourceRef/sourceUrl.ts`

- [ ] **Step 1: Write the failing test**

```ts
import {describe, expect, it} from 'node:test';
import {githubUrlToRawUrl, parseLineAnchor} from './sourceUrl';

describe('githubUrlToRawUrl', () => {
  it('converts a GitHub tree URL to a raw content URL', () => {
    expect(
      githubUrlToRawUrl(
        'https://github.com/wzf1997/claude-code-source/tree/master/source/src/foo.ts',
      ),
    ).toBe(
      'https://raw.githubusercontent.com/wzf1997/claude-code-source/master/source/src/foo.ts',
    );
  });

  it('strips the line anchor when converting the URL', () => {
    expect(
      githubUrlToRawUrl(
        'https://github.com/wzf1997/claude-code-source/tree/master/source/src/foo.ts#L12',
      ),
    ).toBe(
      'https://raw.githubusercontent.com/wzf1997/claude-code-source/master/source/src/foo.ts',
    );
  });
});

describe('parseLineAnchor', () => {
  it('returns the start and end line from a GitHub anchor', () => {
    expect(parseLineAnchor('#L12-L16')).toEqual({start: 12, end: 16});
  });

  it('returns null when the anchor is missing', () => {
    expect(parseLineAnchor('')).toBeNull();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test src/components/SourceRef/sourceUrl.test.ts`
Expected: FAIL with module-not-found or missing export errors for `./sourceUrl`

- [ ] **Step 3: Write minimal implementation**

```ts
export function githubUrlToRawUrl(url: string): string {
  const parsed = new URL(url);
  const parts = parsed.pathname.split('/').filter(Boolean);

  if (parts.length < 5 || parts[2] !== 'tree') {
    throw new Error('Unsupported GitHub source URL');
  }

  const [owner, repo, , branch, ...fileParts] = parts;

  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${fileParts.join('/')}`;
}

export function parseLineAnchor(hash: string): {start: number; end?: number} | null {
  const match = hash.match(/^#L(\d+)(?:-L(\d+))?$/);

  if (!match) {
    return null;
  }

  return {
    start: Number(match[1]),
    end: match[2] ? Number(match[2]) : undefined,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test src/components/SourceRef/sourceUrl.test.ts`
Expected: PASS with 4 passing assertions

- [ ] **Step 5: Commit**

```bash
git add src/components/SourceRef/sourceUrl.ts src/components/SourceRef/sourceUrl.test.ts
git commit -m "test: cover source ref URL conversion"
```

### Task 2: Add the failing interaction test for the drawer

**Files:**
- Modify: `package.json`
- Create: `src/components/SourceRef/SourceRef.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import React from 'react';
import TestRenderer, {act} from 'react-test-renderer';
import SourceRef from './index';

describe('SourceRef', () => {
  it('opens a drawer and keeps the anchor href unchanged on click', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      text: async () => 'const value = 1;',
    }) as typeof fetch;

    const renderer = TestRenderer.create(
      <SourceRef file="source/src/foo.ts" lines="12-16" />,
    );

    const link = renderer.root.findByType('a');
    expect(link.props.href).toBe(
      'https://github.com/wzf1997/claude-code-source/tree/master/source/src/foo.ts#L12-16',
    );

    await act(async () => {
      link.props.onClick({
        preventDefault() {},
      });
    });

    expect(renderer.root.findByProps({role: 'dialog'})).toBeTruthy();
    expect(renderer.root.findByProps({children: 'const value = 1;'})).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm exec jest src/components/SourceRef/SourceRef.test.tsx`
Expected: FAIL because no test runner is configured yet

- [ ] **Step 3: Write minimal implementation support**

```json
{
  "devDependencies": {
    "@types/jest": "^29.5.14",
    "@types/react-test-renderer": "^19.0.0",
    "jest": "^29.7.0",
    "react-test-renderer": "^19.0.0",
    "ts-jest": "^29.2.5"
  },
  "scripts": {
    "test": "jest"
  }
}
```

```js
// jest.config.cjs
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleNameMapper: {
    '\\.module\\.css$': '<rootDir>/src/test/styleModuleStub.ts',
  },
};
```

- [ ] **Step 4: Run test to verify it still fails for the right reason**

Run: `pnpm test -- src/components/SourceRef/SourceRef.test.tsx`
Expected: FAIL because `SourceRef` does not yet render a dialog or intercept clicks

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml jest.config.cjs src/components/SourceRef/SourceRef.test.tsx src/test/styleModuleStub.ts
git commit -m "test: add source ref drawer interaction coverage"
```

### Task 3: Implement the drawer, fetch flow, and line highlighting

**Files:**
- Modify: `src/components/SourceRef/index.tsx`
- Modify: `src/components/SourceRef/styles.module.css`
- Modify: `src/components/SourceRef/sourceUrl.ts`

- [ ] **Step 1: Write the minimal component implementation**

```tsx
const [isOpen, setIsOpen] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [content, setContent] = useState('');

async function handleOpen(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
  setIsOpen(true);
  setIsLoading(true);
  setError(null);

  try {
    const response = await fetch(githubUrlToRawUrl(href));
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    setContent(await response.text());
  } catch (cause) {
    setError(cause instanceof Error ? cause.message : '加载源码失败');
  } finally {
    setIsLoading(false);
  }
}
```

```tsx
{isOpen && (
  <>
    <button className={styles.backdrop} onClick={() => setIsOpen(false)} aria-label="关闭源码预览遮罩" />
    <aside className={styles.drawer} role="dialog" aria-modal="true" aria-label="源码预览">
      <div className={styles.drawerHeader}>
        <div>
          <div className={styles.drawerTitle}>{file}</div>
          {lineRange && <div className={styles.drawerMeta}>L{lineRange.start}{lineRange.end ? `-L${lineRange.end}` : ''}</div>}
        </div>
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>关闭</button>
      </div>
      <div className={styles.drawerBody}>
        {isLoading && <p className={styles.state}>加载中...</p>}
        {error && <p className={styles.stateError}>加载失败：{error}</p>}
        {!isLoading && !error && (
          <pre className={styles.codeBlock}>
            {content.split('\n').map((line, index) => {
              const lineNumber = index + 1;
              const active = lineRange && lineNumber >= lineRange.start && lineNumber <= (lineRange.end ?? lineRange.start);

              return (
                <div key={lineNumber} className={active ? styles.codeLineActive : styles.codeLine}>
                  <span className={styles.lineNumber}>{lineNumber}</span>
                  <code>{line}</code>
                </div>
              );
            })}
          </pre>
        )}
      </div>
    </aside>
  </>
)}
```

- [ ] **Step 2: Run the focused tests**

Run: `pnpm test -- src/components/SourceRef/sourceUrl.test.ts src/components/SourceRef/SourceRef.test.tsx`
Expected: PASS

- [ ] **Step 3: Add keyboard close behavior and target-line scroll**

```tsx
useEffect(() => {
  if (!isOpen) {
    return;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  }

  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [isOpen]);
```

```tsx
useEffect(() => {
  if (!isOpen || !lineRange?.start) {
    return;
  }

  lineRefs.current[lineRange.start]?.scrollIntoView({block: 'center'});
}, [isOpen, content, lineRange]);
```

- [ ] **Step 4: Run the focused tests again**

Run: `pnpm test -- src/components/SourceRef/sourceUrl.test.ts src/components/SourceRef/SourceRef.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/SourceRef/index.tsx src/components/SourceRef/styles.module.css src/components/SourceRef/sourceUrl.ts
git commit -m "feat: preview source refs in a drawer"
```

### Task 4: Verify the site build and typecheck

**Files:**
- Modify: `src/components/SourceRef/SourceRef.test.tsx`
- Modify: `src/components/SourceRef/sourceUrl.test.ts`

- [ ] **Step 1: Align tests with the final implementation details**

```ts
expect(screen.getByRole('dialog', {name: '源码预览'})).toBeInTheDocument();
expect(screen.getByText('L12-L16')).toBeInTheDocument();
```

- [ ] **Step 2: Run unit tests**

Run: `pnpm test -- --runInBand`
Expected: PASS

- [ ] **Step 3: Run typecheck**

Run: `pnpm typecheck`
Expected: PASS with no TypeScript errors

- [ ] **Step 4: Run production build**

Run: `pnpm build`
Expected: PASS with static site output in `build/`

- [ ] **Step 5: Commit**

```bash
git add src/components/SourceRef/SourceRef.test.tsx src/components/SourceRef/sourceUrl.test.ts package.json pnpm-lock.yaml
git commit -m "chore: verify source ref drawer changes"
```
