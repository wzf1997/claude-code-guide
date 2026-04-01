---
sidebar_position: 1
title: 源码结构总览——4756 个文件怎么看
description: 俯瞰整个 claude-code 源码仓库，建立宏观的目录认知。
---

import DifficultyBadge from '@site/src/components/DifficultyBadge';

# 源码结构总览——4756 个文件怎么看

<DifficultyBadge level="进阶" />

> 4756 个 TypeScript 文件，但真正需要读的核心文件不超过 20 个。本文给你地图。

## 顶层目录

```
source/src/
├── entrypoints/    # 程序入口
├── tools/          # 70+ 内置工具
├── commands/       # 斜杠命令
├── components/     # React/Ink UI 组件
├── services/       # 业务逻辑（MCP、auth 等）
├── state/          # Zustand 全局状态
├── hooks/          # React hooks
├── utils/          # 工具函数
└── coordinator/    # 多 Worker 协调器
```

import ArticleComplete from '@site/src/components/ArticleComplete';

<ArticleComplete />
