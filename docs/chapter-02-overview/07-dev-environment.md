---
sidebar_position: 3
title: 开发环境搭建：dev-patch.ts 做了什么
description: 详解 dev-patch.ts 的 5 类转换，搭建可以直接运行 TypeScript 源码的开发环境。
---

import DifficultyBadge from '@site/src/components/DifficultyBadge';
import SourceRef from '@site/src/components/SourceRef';

# 开发环境搭建：dev-patch.ts 做了什么

<DifficultyBadge level="进阶" />

## 为什么需要 dev-patch.ts？

源码中有 Bun 特有的 `bun:bundle` 导入，以及构建时宏（`MACRO.VERSION`），
直接运行 `src/` 会报错。`dev-patch.ts` 将 `src/` 复制到 `src-dev/`，同时做 5 类修复。

## 5 类转换

| 转换 | 原因 |
|------|------|
| `bun:bundle` → shim 绝对路径 | Bun 内置模块运行时不可用 |
| `from 'src/xxx'` → 相对路径 | 模块解析路径修正 |
| `*.md` import → 空字符串 | 文本文件非 JS 模块 |
| `*.d.ts` import → 删除 | 类型声明无运行时实体 |
| `-d2e` 短参数 → 删除 | commander v13 兼容 |

<SourceRef file="source/dev-patch.ts" lines="1-50" />

import ArticleComplete from '@site/src/components/ArticleComplete';

<ArticleComplete />
