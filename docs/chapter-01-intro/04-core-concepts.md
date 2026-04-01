---
sidebar_position: 4
title: 核心概念速览：Tool、Permission、Session
description: 掌握 Claude Code 的三个核心概念，为后续源码阅读打好基础。
---

import DifficultyBadge from '@site/src/components/DifficultyBadge';

# 核心概念速览：Tool、Permission、Session

<DifficultyBadge level="入门" />

## Tool（工具）

工具是 Claude Code 操作外部世界的"手"。每个工具有明确的输入输出契约。
内置工具包括：`BashTool`、`ReadTool`、`EditTool`、`GlobTool`、`GrepTool` 等。

## Permission（权限）

每次调用工具前，系统检查是否有权限。
五种权限模式：`default`、`acceptEdits`、`bypassPermissions`、`plan`、`dontAsk`。

## Session（会话）

一次 `claude` 运行就是一个 Session。Session 维护消息历史、工具权限上下文和状态。

import ArticleComplete from '@site/src/components/ArticleComplete';

<ArticleComplete />
