---
sidebar_position: 3
title: 和普通 AI 聊天有什么不同？（Agent 思维模型）
description: 理解 Agent 模型：为什么 Claude Code 能"做事"而不只是"说话"。
---

import DifficultyBadge from '@site/src/components/DifficultyBadge';

# 和普通 AI 聊天有什么不同？（Agent 思维模型）

<DifficultyBadge level="入门" />

## 聊天 vs Agent

普通聊天：你问 → AI 答 → 结束。

Agent 模式：你说目标 → AI 规划 → 调用工具 → 观察结果 → 继续推进 → 完成目标。

## ReAct 循环

Claude Code 使用的是经典 **ReAct（Reason + Act）** 循环：

```mermaid
sequenceDiagram
    participant U as 用户
    participant C as Claude
    participant T as 工具

    U->>C: 给出任务
    loop ReAct 循环
        C->>C: 思考（Reason）
        C->>T: 调用工具（Act）
        T->>C: 返回结果（Observe）
    end
    C->>U: 任务完成
```

import ArticleComplete from '@site/src/components/ArticleComplete';

<ArticleComplete />
