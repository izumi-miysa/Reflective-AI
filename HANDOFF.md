# 引継ぎメモ（HANDOFF）

次のチャットや別の日に作業を再開するとき用です。  
**APIキーやパスワードは書かないでください。**

---

## 新しいチャットへの貼り付け用（短文）

```
【引継ぎ】Reflective AI デモ公開

リポジトリ: https://github.com/izumi-miysa/Reflective-AI
アプリ: web/（Next.js）
設計の正: Logs/Discussion-2026-08-08.md
感想フォーム案: docs/demo-survey.md
デプロイ手順: web/README.md の「Vercel デプロイ」

いまの状態:
- （ここを毎回更新）例: ローカルでClaude接続済み / push済み / Vercel未デプロイ など

次にやること:
1. …
2. …

必要なら @web/README.md @docs/demo-survey.md @Logs/Discussion-2026-08-08.md を参照
```

---

## 引継ぎのコツ

1. **新しい Agent チャットを開き、上の短文を最初に貼る**  
   （前のチャットは文脈をほぼ引き継がないため）
2. 可能なら `@ファイル名` で関連ファイルを指定する
3. **APIキーは貼らない**（`.env.local` と Vercel の環境変数だけ）
4. 「いまの状態」「次にやること」を1〜3行で書くと再開が速い
5. この `HANDOFF.md` 自体も、区切りがついたら「いまの状態」を更新する

---

## このプロジェクトの地図

| 場所 | 内容 |
|---|---|
| `web/` | 動くプロトタイプ（本番に近い体験） |
| `web/README.md` | 起動・Claude接続・Vercel |
| `docs/demo-survey.md` | Googleフォーム設問・ログイン不要設定 |
| `Logs/Discussion-2026-08-08.md` | 境界線・3人・エクスプレッシブ・ライティング |
| `mockups/` / `slides/` | 発表・説明用の静的資料 |
| `.env.local`（`web/`内・Git対象外） | 秘密情報。GitHubに上げない |

---

## いまの状態（手で更新する）

- ローカル: Next.js + Claude 接続できる状態まで実装済み
- デモ改善: ①自分が先に話す ②伝える／伝えないを出さない ③ボタン文言 ④敬称の忠実さ ⑤終わり方
- スマホ向けCSS・感想ボタン（`NEXT_PUBLIC_SURVEY_URL`）・Vercel手順あり
- Git: user.name / user.email 設定済み（このPC）
- 未: GitHub への push、Vercel デプロイ、GoogleフォームURLの接続

### 次にやること

1. プロトタイプ一式を commit & push
2. Vercel で Root Directory = `web` でデプロイ（GitHub Apps に Vercel あり）
3. 環境変数: `AI_PROVIDER` / `ANTHROPIC_API_KEY` / `ANTHROPIC_MODEL` / `NEXT_PUBLIC_SURVEY_URL`
4. Googleフォーム作成（`docs/demo-survey.md`、ログイン不要設定）

---

## ファイル名と置き場所について

- **名前:** `HANDOFF.md`（「引継ぎ」と一目で分かる）
- **場所:** リポジトリの一番上（ルート）  
  → 個別機能のフォルダより、再開時に探しやすい
- **GitHubに入れる:** よい（チーム・未来の自分・次のチャット用）。秘密は書かない
- README の File Map からこのファイルへリンクしておくとさらに見つけやすい
