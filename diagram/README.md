# Reflective AI 図解

評価者・見学者向けの1ページ図解。**アプリの入口には置きません。**

- 設計の正: `docs/diagram-flow.md`
- ページ: `index.html`
- アプリ本体: https://reflective-ai-red.vercel.app

## 見る

`index.html` をブラウザで開く。同じWi-Fiのスマホから見るときは、PCで `diagram/` を http 配信し、PCのLANアドレスへアクセスする。

## 公開

日報サイトと同じく、Surge に静的公開。アプリの Vercel とは分ける。

公開URL: https://diagram-reflective-ai.surge.sh

```bash
npx surge diagram --domain diagram-reflective-ai.surge.sh
```
