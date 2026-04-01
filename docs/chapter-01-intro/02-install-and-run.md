---
sidebar_position: 2
title: 安装与基本使用——第一次对话
description: 5 分钟内完成安装，进行你与 Claude Code 的第一次交互。
---

import DifficultyBadge from '@site/src/components/DifficultyBadge';

# 安装与基本使用——第一次对话

<DifficultyBadge level="入门" />

## 安装

```bash
npm install -g @anthropic-ai/claude-code
claude
```

## 第一次对话

运行 `claude` 后，按提示登录 Anthropic 账号，然后在项目目录中说：

```
帮我列出这个项目的所有 TypeScript 文件
```

Claude Code 会自动调用 Glob 工具，返回文件列表。

import ArticleComplete from '@site/src/components/ArticleComplete';

<ArticleComplete />
