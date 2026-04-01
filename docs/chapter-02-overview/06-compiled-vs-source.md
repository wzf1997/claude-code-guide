---
sidebar_position: 2
title: 编译产物 vs 源码：cli.js 与 source/src/ 的关系
description: 理解 cli.js（13MB）和 source/src/ 的关系，以及 sourceMap 反编译的工作原理。
---

import DifficultyBadge from '@site/src/components/DifficultyBadge';
import SourceRef from '@site/src/components/SourceRef';

# 编译产物 vs 源码：cli.js 与 source/src/ 的关系

<DifficultyBadge level="进阶" />

## 发布包的结构

npm 发布的 `@anthropic-ai/claude-code` 包含：

- `cli.js`（13MB）：Bun 编译的单文件产物
- `cli.js.map`（60MB）：完整 sourceMap，包含所有原始 TypeScript 源码

<SourceRef file="cli.js" lines="1-10" />

## 如何从 sourceMap 还原源码

sourceMap 的 `sourcesContent` 字段包含每个源文件的原始内容，可以用脚本批量提取。

import ArticleComplete from '@site/src/components/ArticleComplete';

<ArticleComplete />
