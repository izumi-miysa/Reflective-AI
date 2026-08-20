# Reflective AI

## Philosophy

> 人は、自分で決める力を持っている。

## Mission

> 人は、悩みながらも生き続ける。
> 私たちは、その歩みを支えたい。

Reflective AIは、
答えを与えるAIではありません。

利用者が安心して話し、
自分自身の考えを整理し、
新しい視点に出会い、
自分で決める力を支えるAIです。

---

## Vision

私たちは、人は本来、自分で考え、自分で選び、自分で決める力を持っていると信じています。

AIの役割は、その力を奪うことではありません。

答えを提示するのではなく、リフレクティブな対話を通して、自分自身の答えに近づくことを支援します。

---

## Status

🚧 MVP（試作品）開発中

現在は、リフレクティブな対話を体験できる最小限のプロトタイプを開発しています。

動く骨格（Next.js）は `web/` にあります。

```bash
cd web
npm install
npm run dev
```

http://localhost:3010  

Claude を使う場合は `web/.env.local` に `AI_PROVIDER=anthropic` と `ANTHROPIC_API_KEY` を設定（手順は `web/README.md`）。未設定なら mock で動きます。

### デモ公開（Vercel）

- デプロイ手順: `web/README.md` の「Vercel デプロイ」
- 感想フォーム設問: `docs/demo-survey.md`（Googleアカウントなしで回答可）

---

## File Map

Reflective AI 制作用の主要ファイルは、まずここから辿れます。

- `HANDOFF.md`  
  次のチャット・別日作業への引継ぎメモ（短文テンプレ付き）。
- `web/`  
  動くWebプロトタイプ（エクスプレッシブ・ライティング → リフレクト一度 → ステージ）。詳細は `web/README.md`。
- `docs/demo-survey.md`  
  デモ感想用 Googleフォームの設問案と、ログイン不要の設定手順。
- `docs/git-setup.md`  
  Git の名前・メール設定のコツ（このPCで一度だけ）。
- `docs/file-index.md`  
  このプロジェクトの目次。スライド、モックアップ、発表原稿、ログの場所をまとめています。
- `docs/presentation-script-4min.md`  
  4分発表用の読み上げ原稿。どのスライド・モックアップを見せるかも含みます。
- `slides/reflective-ai-for-work-slides.html`  
  発表用HTMLスライド。
- `mockups/reflective-ai-for-work.html`  
  全体説明用モックアップ。
- `mockups/reflective-ai-experience-demo.html`  
  体験デモ用モックアップ。
- `Logs/`  
  壁打ちログ。設計判断や議論の素材を残す場所です。

ローカルサーバー起動中は、以下から開けます。

- スライド: `http://127.0.0.1:8765/slides/reflective-ai-for-work-slides.html`
- 全体説明用モックアップ: `http://127.0.0.1:8765/mockups/reflective-ai-for-work.html`
- 体験デモ用モックアップ: `http://127.0.0.1:8765/mockups/reflective-ai-experience-demo.html`
- 発表原稿: `http://127.0.0.1:8765/docs/presentation-script-4min.md`
