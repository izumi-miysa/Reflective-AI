# 引継ぎメモ（HANDOFF）

次のチャットや別の日に作業を再開するとき用です。  
**APIキーやパスワードは書かないでください。**

---

## 新しいチャットへの貼り付け用（短文）

```
【引継ぎ】Reflective AI デモ公開

リポジトリ: https://github.com/izumi-miysa/Reflective-AI
アプリ: web/（Next.js）
設計の正: Logs/Discussion-2026-08-08.md（構造）／Logs/Discussion-2026-08-12.md（Why）
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
| `docs/git-setup.md` | Git の名前・メール設定（このPCで一度だけ） |
| `Logs/Discussion-2026-08-08.md` | 境界線・3人・エクスプレッシブ・ライティング |
| `mockups/` / `slides/` | 発表・説明用の静的資料 |
| `.env.local`（`web/`内・Git対象外） | 秘密情報。GitHubに上げない |

---

## いまの状態（手で更新する）

- ローカル: Next.js + Claude 接続できる状態まで実装済み
- デモ公開済み・知人テスト開始
- 導入文・スマホUI改善済み（書く画面の安心文言、pause-offer固定、横はみ出し抑制など）
- スマホ向けCSS・感想ボタン・Vercel手順・`HANDOFF.md` あり
- Git: user.name / user.email 設定済み（`web/` 含む）
- Vercel: プロジェクト `reflective-ai` を Production デプロイ済み  
  URL: https://reflective-ai-red.vercel.app  
  環境変数: `AI_PROVIDER` / `ANTHROPIC_API_KEY` / `ANTHROPIC_MODEL` / `NEXT_PUBLIC_SURVEY_URL` 設定済み
- Googleフォーム作成済み・アプリ終了画面から接続済み
- 配布文（`docs/demo-survey.md`）に体験URL・感想URL記載済み
- UI文言: `書きました` / `話を聞いてみませんか`・`聞いてみる` / `今日はここまでにする`（終了画面の「手放す」は理念文として残す）
- Why の設計見直し（2026-08-12）: 利用者向けはほぼ決着、評価者向けは実例待ち → `Logs/Discussion-2026-08-12.md`
- ローカルに未push のコミットあり（`main` が origin より1つ先）

### 次にやること

1. `Logs/Discussion-2026-08-12.md` の「A の実装変更 1〜5」を進める  
   （`suggestStage` の判定化 / ボタン主従の入れ替え / 入口コピー / 終了画面「またいつでも」/ 感想フォームQ2）
2. 評価者向けの実例を1本つくる（本人の実体験を書き留めてから）
3. ロゴ要否を含む全体デザイン
4. 未push のコミットを push する
5. シークレットでフォームがログインなし送信できるか確認（未確認なら）

---

## ファイル名と置き場所について

- **名前:** `HANDOFF.md`（「引継ぎ」と一目で分かる）
- **場所:** リポジトリの一番上（ルート）  
  → 個別機能のフォルダより、再開時に探しやすい
- **GitHubに入れる:** よい（チーム・未来の自分・次のチャット用）。秘密は書かない
- README の File Map からこのファイルへリンクしておくとさらに見つけやすい
