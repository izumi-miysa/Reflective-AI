# Reflective AI Web Prototype

`Logs/Discussion-2026-08-08.md` の設計（エクスプレッシブ・ライティング入口・境界線ルール・3人の関係性）に沿った骨格です。

## いまできること

1. 書く（AIは無言）
2. リフレクターが一度だけ話す
3. ステージを開き、自分（右）⇄ 相手役（左）で話す
4. ステージを閉じると、リフレクターが再度一度だけ話す
5. 終了すると履歴は破棄（DBなし）

## 起動

```bash
cd web
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

## Claude（Anthropic）接続

1. [Anthropic Console](https://console.anthropic.com/) で API キーを発行する  
2. `web/.env.local.example` をコピーして `web/.env.local` を作る  

```bash
cd web
copy .env.local.example .env.local
```

3. `.env.local` を編集する

```bash
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=sk-ant-...あなたのキー...
# 任意
# ANTHROPIC_MODEL=claude-sonnet-4-6
```

4. `npm run dev` を再起動する（環境変数は起動時に読み込みます）

画面フッタの `AI:` が `Claude（…）` になっていれば接続成功です。  
キーが無い／読めない場合は自動で **mock** に落ちます。

OpenAI 接続はまだ未実装です。

## デモ感想フォーム

設問案とログイン不要の設定は `docs/demo-survey.md` を参照。

フォームURLを作ったら:

```bash
NEXT_PUBLIC_SURVEY_URL=https://forms.gle/xxxxxxxx
```

を `.env.local`（および Vercel の Environment Variables）に追加します。終了画面に「感想を送る」が出ます。

## Vercel デプロイ

リポジトリ直下ではなく、**Root Directory を `web`** にします。

1. [vercel.com](https://vercel.com) で GitHub の `Reflective-AI` を Import  
2. **Root Directory** → `web`  
3. Environment Variables を追加  

| Name | Value |
|---|---|
| `AI_PROVIDER` | `anthropic` |
| `ANTHROPIC_API_KEY` | （Consoleのキー） |
| `ANTHROPIC_MODEL` | `claude-sonnet-4-6`（任意） |
| `NEXT_PUBLIC_SURVEY_URL` | （GoogleフォームのURL・任意） |

4. Deploy  
5. 発行された URL をスマホで開き、体験 → 終了 → 感想、の流れを確認  
