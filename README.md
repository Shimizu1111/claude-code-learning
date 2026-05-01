# Claude Code Learning Platform

Claude Codeの使い方を手を動かしながら学べるインタラクティブ学習プラットフォームです。

## セットアップ

```bash
git clone https://github.com/Shimizu1111/claude-code-learning.git
cd claude-code-learning
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

## 使い方

1. ブラウザでダッシュボードを開く
2. コースを選ぶ（初級 / 中級 / 上級 / サクッと実践）
3. レッスンを選ぶ
4. **別のターミナル**で `cd workspace/{レッスン名}` に移動し、`claude` を起動
5. ダッシュボードに表示されるプロンプトをコピーしてClaude Codeに貼り付ける
6. ファイルの変更がダッシュボードにリアルタイムで反映される
7. 「できたか確認する」ボタンで課題をクリア

何度でもリセットしてやり直せます。

## コース一覧

| コース | 対象 | 内容 |
|--------|------|------|
| 初級 | 初めての人 | 自然言語での指示、CLAUDE.md、ファイル操作 |
| 中級 | 基本を覚えた人 | スラッシュコマンド、アプリ構築、設定ファイルの使い分け |
| 上級 | 使いこなしたい人 | セキュリティレビュー、Hooks、サブエージェント |
| サクッと実践 | 忙しい人 | LP作成、データ整理、テンプレート一括生成（各5分） |

## 必要なもの

- Node.js 20.9 以上
- Claude Code（`npm install -g @anthropic-ai/claude-code`）
