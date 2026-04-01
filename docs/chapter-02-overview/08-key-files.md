---
sidebar_position: 4
title: 关键文件速查表——10 个必读文件
description: 把握 Claude Code 的核心，先读这 10 个文件。
---

import DifficultyBadge from '@site/src/components/DifficultyBadge';
import SourceRef from '@site/src/components/SourceRef';

# 关键文件速查表——10 个必读文件

<DifficultyBadge level="入门" />

| 文件 | 行数 | 职责 |
|------|------|------|
| `entrypoints/cli.tsx` | ~400 | CLI 入口，快速路径处理 |
| `main.tsx` | ~600 | 主应用初始化 |
| `query.ts` | 1729 | **核心**：AI↔Tool 交互循环 |
| `Tool.ts` | 793 | Tool 接口定义 |
| `tools.ts` | ~200 | 工具注册表 |
| `state/AppStateStore.ts` | 454 | Zustand 全局状态 |
| `hooks/useCanUseTool.tsx` | ~300 | 权限决策逻辑 |
| `services/mcp/` | 多文件 | MCP 集成 |
| `coordinator/` | 多文件 | 多 Worker 协调 |
| `context.ts` | ~300 | 系统提示注入 |

<SourceRef file="source/src/query.ts" lines="1-50" />

import ArticleComplete from '@site/src/components/ArticleComplete';

<ArticleComplete />
