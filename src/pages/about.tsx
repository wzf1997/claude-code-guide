import React, { useState } from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './about.module.css';

function QrModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>
        <p className={styles.modalTitle}>{title}</p>
        <img src={src} alt={title} className={styles.modalQr} />
      </div>
    </div>
  );
}

const SKILLS = [
  { icon: '🤖', label: 'AI Agent', desc: '深研 Claude Code、LangChain 等 Agent 框架源码与架构' },
  { icon: '📊', label: 'A/B 测试', desc: '数据驱动决策，落地页实验设计与统计显著性分析' },
  { icon: '🎨', label: 'AI 生图 & 换肤', desc: 'Stable Diffusion、ComfyUI、即梦等 AI 图像实战' },
  { icon: '🔊', label: 'AI 音效', desc: 'AI 音频生成、音乐创作与多媒体内容自动化' },
  { icon: '🚀', label: '落地页优化', desc: '智能调流、CTR 分析、皮肤策略与流量分配' },
  { icon: '🧠', label: '数据分析', desc: 'Python / SQL 数据处理，BI 可视化与业务洞察' },
];

const TIMELINE = [
  {
    period: '2024 — 至今',
    title: '深耕 AI Agent 领域',
    desc: '系统研读 Claude Code 源码，输出 14 章 84 篇深度技术文章，建立「Fly的AI研习社」知识品牌。',
  },
  {
    period: '2023 — 2024',
    title: '电商 AI 落地探索',
    desc: '主导落地页 AI 换肤、智能调流系统建设，将 CTR 数据分析能力与 AI 生图流水线深度结合。',
  },
  {
    period: '2021 — 2023',
    title: '数据分析与 A/B 实验',
    desc: '专注用户增长与转化率优化，构建完整 A/B 测试体系，积累大量数据驱动决策经验。',
  },
];

export default function About(): React.ReactElement {
  const [qr, setQr] = useState<{ src: string; title: string } | null>(null);
  const imgAvatar = useBaseUrl('/img/avatar.jpg');
  const imgGzh = useBaseUrl('/img/gzh.jpg');
  const imgWx = useBaseUrl('/img/wx.jpg');

  return (
    <Layout title="关于我" description="Fly — AI 技术探索者，深耕 AI Agent、数据分析与落地页优化">
      <main className={styles.main}>

        {/* ─── Profile hero ─── */}
        <section className={styles.profileSection}>
          <div className={styles.profileCard}>
            {/* Background decoration */}
            <div className={styles.profileBg} aria-hidden />

            <div className={styles.profileInner}>
              <div className={styles.avatarWrap}>
                <img src={imgAvatar} alt="Fly" className={styles.avatar} />
              </div>

              <div className={styles.profileInfo}>
                <div className={styles.profileBadge}>AI 技术探索者</div>
                <h1 className={styles.profileName}>Fly</h1>
                <p className={styles.profileHandle}>@wzf1997 · 上海 · 普陀</p>
                <p className={styles.profileBio}>
                  深耕 AI 技术落地与数据分析领域，聚焦 AI Agent、A/B 测试、落地页智能优化，
                  玩转 AI 换肤、AI 音效、AI 生图等实战玩法。让复杂的 AI 变简单，
                  让你的技术与认知一起「起飞」！
                </p>

                <div className={styles.profileLinks}>
                  <a
                    href="https://github.com/wzf1997"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.linkBtn}
                  >
                    <GitHubIcon />
                    GitHub · wzf1997
                  </a>
                  <button
                    className={styles.linkBtn}
                    onClick={() => setQr({ src: imgGzh, title: '公众号：Fly的AI研习社' })}
                  >
                    <WechatMpIcon />
                    公众号：Fly的AI研习社
                  </button>
                  <button
                    className={styles.linkBtn}
                    onClick={() => setQr({ src: imgWx, title: '微信：加好友交流' })}
                  >
                    <WechatIcon />
                    微信好友
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Skills ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>技术方向</h2>
          <div className={styles.skillGrid}>
            {SKILLS.map((s) => (
              <div key={s.label} className={styles.skillCard}>
                <span className={styles.skillIcon}>{s.icon}</span>
                <h3 className={styles.skillLabel}>{s.label}</h3>
                <p className={styles.skillDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Timeline ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>经历</h2>
          <div className={styles.timeline}>
            {TIMELINE.map((item, i) => (
              <div key={i} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <span className={styles.timelinePeriod}>{item.period}</span>
                  <h3 className={styles.timelineTitle}>{item.title}</h3>
                  <p className={styles.timelineDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Contact ─── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>联系我</h2>
          <div className={styles.contactGrid}>
            <div
              className={styles.contactCard}
              onClick={() => setQr({ src: imgGzh, title: '公众号：Fly的AI研习社' })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setQr({ src: imgGzh, title: '公众号：Fly的AI研习社' })}
            >
              <img src={imgGzh} alt="公众号" className={styles.contactQr} />
              <div className={styles.contactInfo}>
                <p className={styles.contactName}>公众号</p>
                <p className={styles.contactDesc}>Fly的AI研习社</p>
                <p className={styles.contactHint}>扫码关注，获取 AI 技术干货</p>
              </div>
            </div>
            <div
              className={styles.contactCard}
              onClick={() => setQr({ src: imgWx, title: '微信：加好友交流' })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setQr({ src: imgWx, title: '微信：加好友交流' })}
            >
              <img src={imgWx} alt="微信" className={styles.contactQr} />
              <div className={styles.contactInfo}>
                <p className={styles.contactName}>微信</p>
                <p className={styles.contactDesc}>一对一交流</p>
                <p className={styles.contactHint}>扫码添加，探讨 AI 技术与实战</p>
              </div>
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

function WechatMpIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
      <path d="M11.5 2C6.26 2 2 6.26 2 11.5S6.26 21 11.5 21c.92 0 1.8-.12 2.64-.35l3.07 1.59-.67-2.9C18.26 18.16 21 15.08 21 11.5 21 6.26 16.74 2 11.5 2zm-1.8 6.2c.66 0 1.2.54 1.2 1.2s-.54 1.2-1.2 1.2-1.2-.54-1.2-1.2.54-1.2 1.2-1.2zm3.6 0c.66 0 1.2.54 1.2 1.2s-.54 1.2-1.2 1.2-1.2-.54-1.2-1.2.54-1.2 1.2-1.2z"/>
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
