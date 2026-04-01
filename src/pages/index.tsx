import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import ProgressBar from '../components/ProgressBar';
import styles from './index.module.css';

const CHAPTERS = [
  { id: 'chapter-01-intro', title: '第一章：认识 Claude Code', articles: 4, path: '/chapter-01-intro/01-what-is-claude-code', tag: '入门' },
  { id: 'chapter-02-overview', title: '第二章：项目全貌（导览）', articles: 4, path: '/chapter-02-overview/05-source-structure', tag: '进阶' },
  { id: 'chapter-03-startup', title: '第三章：启动流程', articles: 4, path: '/chapter-03-startup/cli-entry', tag: '进阶' },
  { id: 'chapter-04-query', title: '第四章：查询循环（核心）', articles: 6, path: '/chapter-04-query/overview', tag: '深度' },
  { id: 'chapter-05-tools', title: '第五章：工具系统', articles: 7, path: '/chapter-05-tools/tool-interface', tag: '深度' },
  { id: 'chapter-06-permissions', title: '第六章：权限系统', articles: 5, path: '/chapter-06-permissions/permission-modes', tag: '进阶' },
  { id: 'chapter-07-state', title: '第七章：状态管理与 UI', articles: 5, path: '/chapter-07-state/why-ink', tag: '进阶' },
  { id: 'chapter-08-skills', title: '第八章：Skills 技能系统', articles: 5, path: '/chapter-08-skills/what-is-skill', tag: '进阶' },
  { id: 'chapter-09-memory', title: '第九章：Memory 记忆系统', articles: 6, path: '/chapter-09-memory/what-is-memory', tag: '深度' },
  { id: 'chapter-10-context', title: '第十章：上下文管理与压缩', articles: 7, path: '/chapter-10-context/why-compact', tag: '深度' },
  { id: 'chapter-11-tasks', title: '第十一章：Subagent 与多任务', articles: 7, path: '/chapter-11-tasks/task-types', tag: '深度' },
  { id: 'chapter-12-hooks', title: '第十二章：Hooks 机制深度解析', articles: 10, path: '/chapter-12-hooks/hooks-overview', tag: '深度' },
  { id: 'chapter-13-swarm', title: '第十三章：Agent Teams / Swarm', articles: 11, path: '/chapter-13-swarm/swarm-overview', tag: '深度' },
  { id: 'chapter-14-dev', title: '第十四章：二次开发与生态', articles: 3, path: '/chapter-14-dev/plugin-development', tag: '进阶' },
] as const;

const tagColor: Record<string, string> = {
  '入门': '#22c55e',
  '进阶': '#f59e0b',
  '深度': '#ef4444',
};

export default function Home(): React.ReactElement {
  return (
    <Layout
      title="Claude Code 源码精读"
      description="从零到深，读懂 AI Agent 的工程实现"
    >
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <h1 className={styles.heroTitle}>Claude Code 源码精读</h1>
          <p className={styles.heroSubtitle}>
            从零到深，读懂 AI Agent 的工程实现
          </p>
          <div className={styles.heroButtons}>
            <Link className={styles.btnPrimary} to="/chapter-01-intro/01-what-is-claude-code">
              开始学习 →
            </Link>
            <Link
              className={styles.btnSecondary}
              to="https://github.com/your-github-username/claude-code-guide"
            >
              GitHub
            </Link>
          </div>
        </section>

        {/* Progress */}
        <section className={styles.progressSection}>
          <ProgressBar />
        </section>

        {/* Chapter grid */}
        <section className={styles.grid}>
          {CHAPTERS.map((ch) => (
            <Link key={ch.id} to={ch.path} className={styles.card}>
              <div className={styles.cardHeader}>
                <span
                  className={styles.cardTag}
                  style={{ color: tagColor[ch.tag] }}
                >
                  {ch.tag}
                </span>
              </div>
              <h3 className={styles.cardTitle}>{ch.title}</h3>
              <p className={styles.cardMeta}>{ch.articles} 篇文章</p>
            </Link>
          ))}
        </section>
      </main>
    </Layout>
  );
}
