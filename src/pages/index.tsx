import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ProgressBar from '../components/ProgressBar';
import styles from './index.module.css';

const CHAPTERS = [
  { id: 'chapter-01-intro', title: '第一章：认识 Claude Code', articles: 4, path: '/chapter-01-intro/what-is-claude-code', tag: '入门' },
  { id: 'chapter-02-overview', title: '第二章：项目全貌（导览）', articles: 4, path: '/chapter-02-overview/source-structure', tag: '进阶' },
  { id: 'chapter-03-startup', title: '第三章：启动流程', articles: 4, path: '/chapter-03-startup/cli-entry', tag: '进阶' },
  { id: 'chapter-04-query', title: '第四章：查询循环（核心）', articles: 6, path: '/chapter-04-query/query-overview', tag: '深度' },
  { id: 'chapter-05-tools', title: '第五章：工具系统', articles: 7, path: '/chapter-05-tools/tool-interface', tag: '深度' },
  { id: 'chapter-06-permissions', title: '第六章：权限系统', articles: 5, path: '/chapter-06-permissions/permission-modes', tag: '进阶' },
  { id: 'chapter-07-state', title: '第七章：状态管理与 UI', articles: 5, path: '/chapter-07-state/ink-framework', tag: '进阶' },
  { id: 'chapter-08-skills', title: '第八章：Skills 技能系统', articles: 5, path: '/chapter-08-skills/skills-intro', tag: '进阶' },
  { id: 'chapter-09-memory', title: '第九章：Memory 记忆系统', articles: 6, path: '/chapter-09-memory/memory-concept', tag: '深度' },
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

const TOTAL_ARTICLES = CHAPTERS.reduce((sum, ch) => sum + ch.articles, 0);

function QrModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose} aria-label="关闭">✕</button>
        <p className={styles.modalTitle}>{title}</p>
        <img src={src} alt={title} className={styles.modalQr} />
      </div>
    </div>
  );
}

export default function Home(): React.ReactElement {
  const [qr, setQr] = useState<{ src: string; title: string } | null>(null);
  const imgAvatar = useBaseUrl('/img/avatar.jpg');
  const imgGzh = useBaseUrl('/img/gzh.jpg');
  const imgWx = useBaseUrl('/img/wx.jpg');

  return (
    <Layout
      title="Claude Code 源码精读"
      description="从零到深，读懂 AI Agent 的工程实现"
    >
      <main className={styles.main}>

        {/* ─── Hero ─── */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>

            {/* Left: author card */}
            <div className={styles.authorCard}>
              {/* top: avatar + name/handle side by side */}
              <div className={styles.authorTop}>
                <div className={styles.avatarWrap}>
                  <img src={imgAvatar} alt="Fly" className={styles.avatar} />
                </div>
                <div className={styles.authorMeta}>
                  <h2 className={styles.authorName}>Fly</h2>
                  <p className={styles.authorHandle}>@wzf1997 · 上海</p>
                  <p className={styles.authorAcct}>Fly的AI研习社</p>
                </div>
              </div>

              {/* bio */}
              <p className={styles.authorBio}>
                深耕 AI 技术落地与数据分析领域，聚焦 AI Agent、A/B 测试、
                落地页智能优化，玩转 AI 换肤、AI 音效、AI 生图等实战玩法。
                让复杂的 AI 变简单，让你的技术与认知一起「起飞」！
              </p>

              {/* social buttons */}
              <div className={styles.socialRow}>
                <a
                  href="https://github.com/wzf1997"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.socialBtn}
                >
                  <GitHubIcon />
                  GitHub
                </a>
                <button
                  className={styles.socialBtn}
                  onClick={() => setQr({ src: imgGzh, title: '公众号：Fly的AI研习社' })}
                >
                  <WechatIcon />
                  公众号
                </button>
                <button
                  className={styles.socialBtn}
                  onClick={() => setQr({ src: imgWx, title: '微信：加好友交流' })}
                >
                  <WechatIcon />
                  微信
                </button>
              </div>
            </div>

            {/* Right: book intro */}
            <div className={styles.bookIntro}>
              <div className={styles.bookBadge}>开源教程</div>
              <h1 className={styles.heroTitle}>
                Claude Code
                <span className={styles.heroTitleAccent}>源码精读</span>
              </h1>
              <p className={styles.heroSubtitle}>
                从零到深，系统拆解 AI Agent 的工程实现
              </p>

              <div className={styles.statsRow}>
                <div className={styles.statItem}>
                  <span className={styles.statNum}>14</span>
                  <span className={styles.statLabel}>章节</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statNum}>{TOTAL_ARTICLES}</span>
                  <span className={styles.statLabel}>篇文章</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.statItem}>
                  <span className={styles.statNum}>免费</span>
                  <span className={styles.statLabel}>完全开源</span>
                </div>
              </div>

              <div className={styles.heroButtons}>
                <Link className={styles.btnPrimary} to="/chapter-01-intro/what-is-claude-code">
                  开始学习 →
                </Link>
                <a
                  className={styles.btnSecondary}
                  href="https://github.com/wzf1997/claude-code-guide"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitHubIcon /> Star on GitHub
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ─── Progress ─── */}
        <section className={styles.progressSection}>
          <ProgressBar />
        </section>

        {/* ─── Chapter grid ─── */}
        <section className={styles.chapterSection}>
          <h2 className={styles.sectionTitle}>全部章节</h2>
          <div className={styles.grid}>
            {CHAPTERS.map((ch, i) => (
              <Link key={ch.id} to={ch.path} className={styles.card}>
                <span className={styles.cardGhostNum}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIndex}>{String(i + 1).padStart(2, '0')}</span>
                  <span
                    className={styles.cardTag}
                    style={{ color: tagColor[ch.tag], borderColor: tagColor[ch.tag] }}
                  >
                    {ch.tag}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{ch.title}</h3>
                <p className={styles.cardMeta}>{ch.articles} 篇文章</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ─── Footer contact ─── */}
        <section className={styles.contactSection}>
          <p className={styles.contactTitle}>
            关注 <strong>「Fly的AI研习社」</strong>，持续获取 AI 技术干货
          </p>
          <div className={styles.qrRow}>
            <div
              className={styles.qrItem}
              onClick={() => setQr({ src: imgGzh, title: '公众号：Fly的AI研习社' })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setQr({ src: imgGzh, title: '公众号：Fly的AI研习社' })}
            >
              <img src={imgGzh} alt="公众号二维码" className={styles.qrThumb} />
              <span className={styles.qrLabel}>扫码关注公众号</span>
            </div>
            <div
              className={styles.qrItem}
              onClick={() => setQr({ src: imgWx, title: '微信：加好友交流' })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setQr({ src: imgWx, title: '微信：加好友交流' })}
            >
              <img src={imgWx} alt="微信二维码" className={styles.qrThumb} />
              <span className={styles.qrLabel}>扫码添加微信</span>
            </div>
          </div>
        </section>

      </main>

      {qr && <QrModal src={qr.src} title={qr.title} onClose={() => setQr(null)} />}
    </Layout>
  );
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function WechatIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 4.06-2.087 6.326-1.69C17.495 4.647 13.388 2.188 8.691 2.188zm-2.223 3.651a1.018 1.018 0 110 2.036 1.018 1.018 0 010-2.036zm4.48 0a1.018 1.018 0 110 2.036 1.018 1.018 0 010-2.036zM24 14.886c0-3.313-3.12-6.003-6.97-6.003-3.852 0-6.972 2.69-6.972 6.003 0 3.313 3.12 6.003 6.972 6.003.82 0 1.612-.117 2.35-.329a.71.71 0 01.591.082l1.573.92a.27.27 0 00.139.046c.136 0 .245-.109.245-.245a.48.48 0 00-.04-.176l-.323-1.224a.49.49 0 01.177-.55C23.096 18.354 24 16.71 24 14.886zm-9.22-1.016a.84.84 0 110-1.68.84.84 0 010 1.68zm4.5 0a.84.84 0 110-1.68.84.84 0 010 1.68z" />
    </svg>
  );
}
