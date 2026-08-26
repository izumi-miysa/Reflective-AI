# 発表スライド作成 — 次チャット用指示文

6分・卒業制作発表用。スライドは **読み上げ原稿 v3** と **図解** に揃える。

---

## 新しいチャットに貼る指示文（コピー用）

```
【引継ぎ】Reflective AI — 発表スライド作成

リポジトリ: https://github.com/izumi-miysa/Reflective-AI
尺: 6分（読み上げ原稿 v3 に合わせる）

■ いまやること
発表用スライドを作る。読み上げ原稿・図解・既存資料を渡すので、それに沿って進めてほしい。

■ 正とする原稿・資料（この順で読む）
1. 読み上げ: @docs/presentation-script-6min-v3.md（現行。本人が再考した版）
2. 図解（公開）: https://diagram-reflective-ai.surge.sh
3. 図解（ソース）: @diagram/index.html
4. 図解の設計: @docs/diagram-flow.md
5. 補助: @docs/presentation-script-6min-v2.md（話すときのメモ・図解との役割分担）
6. 補助: @docs/evaluator-why-example.md / @docs/reflective-ai-意義整理メモ.md

■ 公開URL（スライドにも載せる）
- 動くデモ: https://reflective-ai-red.vercel.app（Vercel）
- 説明用図解: https://diagram-reflective-ai.surge.sh（Surge）

■ スライドの見た目
- 色・フォント・雰囲気は **diagram/index.html（紺系・IBM Plex Sans JP）に揃える**
- 日報図解型（https://diagram-daitatu-nippo-growth.surge.sh/）の「1枚1メッセージ・カード・比較表」は参考にしてよい
- creating-visual-explainers の SKILL は構成用。**見た目テンプレに差し替えない**
  C:\Users\kK35777\src\creating-visual-explainers\.claude\skills\creating-visual-explainers\SKILL.md
- 既存 `slides/reflective-ai-for-work-slides.html` は B2B 向け旧版。卒業発表用に新規 or 別ファイルでよい

■ スライド構成の目安（原稿 v3 の ①〜⑦ に対応）
1. タイトル／フック — LLM・ChatGPTとは別の場所
2. 結論 — Reflective AI。答えを出さない。自分で決める。届かず残らない
3. 困りごとの出発点 — 現場で聞いた声（離職対策・人の代わりではない）
4. 山場 — ChatGPT vs Reflective AI（同僚の例。比較表）
5. 残らない場 — 保存しない・講座の記憶を切った・入口の場の約束
6. なぜ使うか — 歯のメンテナンスのたとえ／思想が逆／使い続けるは自分の経験のみ
7. どう作ったか — 知人テスト・Claude・Cursor・Vercel＋Surge
8. 最後 — 講義の卒業・感謝（falcon・マコさん）

枚数は多すぎない（目安 8〜10枚）。1枚に文字を詰めすぎない。

■ スライドに載せる／載せない
載せる:
- 流れ: 書く→返す→選ぶ→話す→手放す（図解と同じ）
- ChatGPT 対比（起きること／場の設定／本人側）
- デモ・図解の QR または URL
- 「できないから残さない → 残さないと決めた」（講座の記憶）

載せない（口頭か図解URLへ）:
- 知覚理論の表の全部
- 危機対応の手順・電話番号
- 入口への筋書き（アプリには出さない設計の説明は図解側）
- 効能の約束（「皆さんもこうなる」）
- アプリ入口の Why コピー

■ 言い方のルール（原稿と同じ）
- 「ゆっくり」「じっくり」「時間をかけて」は使わない
- 「相談アプリ」「セルフカウンセリング」「前段階」とは呼ばない
- 人の代わり、離職対策、カウンセラー代替、とは言わない
- 公開図解の実例: 同僚＋課長（家庭の夫・娘はスライドに出さない）

■ 成果物
- 置き場所: `slides/`（例: `slides/presentation-6min.html` または希望形式）
- スライドは「読み上げの補助」。全文をスライドに載せない（キーワード・図・URL）
- 完成後、原稿 v3 の各段とスライド番号の対応表を短くメモしてほしい

参照: @docs/presentation-slides-handoff.md @HANDOFF.md
```

---

## 補足（エージェント向け）

| ファイル | 役割 |
|---|---|
| `docs/presentation-script-6min-v3.md` | **読み上げの正**。スライドはここに従う |
| `diagram/index.html` | ビジュアル・構成の正。色は `--reflector` 紺系 |
| `docs/diagram-flow.md` | 9段の設計判断。スライドに全部は載せない |
| `slides/reflective-ai-for-work-slides.html` | 旧スライド（商用向け）。流用は慎重に |
| `docs/presentation-script-6min-v2.md` | 「図解に任せる／口頭だけ」のメモが詳しい |

## v3 原稿 ↔ スライド対応（たたき台）

| 原稿 | スライドで見せること |
|---|---|
| ① フック | タイトル。ChatGPT／LLM とは別 |
| ② 結論 | 3行: 答えを出さない／自分で決める／残らない |
| ③ 前半 | 現場の声（箇条書き短く） |
| ③ 後半 | BEFORE/AFTER 比較（ChatGPT vs こちら） |
| ④ | 残らない理由＋講座の記憶＋入口の約束 |
| ⑤ | 歯のメンテナンス／思想が逆／自分に起きたこと（1行） |
| ⑥ | 作り方・公開（Vercel / Surge） |
| ⑦ | 講義の卒業・感謝 |

## 形式について

- これまでの `slides/*.html` と同様の **HTML スライド** が自然（図解と色を揃えやすい）
- PowerPoint / Googleスライドが必要なら、HTML からエクスポート案内または構成だけ渡す

## 公開URL（見比べ用）

指摘前の9枚は上書きせず、指摘を反映した見出し版は別ドメイン。

| 版 | ファイル | 公開 |
|---|---|---|
| 現行（9枚・原稿要約紙） | `slides/presentation-6min.html` | https://slides-reflective-ai.surge.sh |
| 見出し版（13枚・指摘反映） | `slides/presentation-6min-v2.html` | https://slides-reflective-ai-v2.surge.sh |
| 図解 | `diagram/index.html` | https://diagram-reflective-ai.surge.sh |
| 見出し版 PDF / PPT | `pdf/slides-reflective-ai-v2.pdf` / `pdf/slides-reflective-ai-v2.pptx` | 手元・GitHub |

たとえは「歯のメンテナンス」（「歯磨き」とは言わない）。スライド・図解・原稿で揃える。

## あとから: Claude でレビューする

Cursor の Agent チャットで:

```text
/claude-reviewer 見出し版スライドを、原稿 v3 と見比べて
```

定義: `.cursor/agents/claude-reviewer.md`（手順の本文もこのファイルにある）
