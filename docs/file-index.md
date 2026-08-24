# Reflective AI File Index

Reflective AI 制作用ファイルを探すための目次です。

## まず開くファイル

- `README.md`  
  プロジェクトの理念、ミッション、主要ファイルへの入口。
- `HANDOFF.md`  
  次のチャット・別日作業への引継ぎメモ。
- `docs/file-index.md`  
  このファイル。どこに何があるかを確認するための目次。
- `docs/git-setup.md`  
  Git の名前・メール設定のコツ（このPCで一度だけ）。
- `docs/demo-survey.md`  
  デモ感想用 Googleフォームの設問案。
- `docs/crisis-safety.md`  
  危険信号への対処。実装の正。窓口の差し替え先もここから辿れる。

## 発表資料

- `diagram/index.html`  
  評価者・見学者向け図解（日報サイト型の1ページ）。設計の正は `docs/diagram-flow.md`。アプリ入口には置かない。
- `slides/reflective-ai-for-work-slides.html`  
  発表用HTMLスライド。Reflective AI for Work の概要、入口設計、相手役、言いっぱなし設計、収益モデルを含みます。
- `docs/presentation-script-1min.md`  
  卒業制作の1分進捗原稿。山場は ChatGPT との同じ入力比較。
- `docs/evaluator-why-example.md`  
  評価者向け Why の実例1本。同じ入力を ChatGPT と Reflective AI に投げた記録。
- `docs/presentation-script-4min.md`  
  4分発表用の読み上げ原稿。表示するスライド番号とモックアップURLも含みます。
- `docs/graduation-presentation-outline.md`  
  卒業制作発表の構成案。スライド化前の下書きです。
- `docs/reflective-ai-意義整理メモ.md`  
  発表資料を組む前の意義整理メモ。
- `docs/reflective_ai_design_doc.docx`  
  設計メモ。
- `docs/open_dialogue_reflecting_academic_references.docx`  
  オープンダイアローグ関連の学術メモ。
- `docs/ChatGPTの見立て_260813.docx` / `docs/Claudeの見立て_260813.docx`  
  同じ時期の汎用AIによる見立て。

## モックアップ

- `mockups/reflective-ai-for-work.html`  
  全体説明用モックアップ。Reflective 4Pane、入口設計、残さない安心、B2B2C の見せ方を確認できます。
- `mockups/reflective-ai-experience-demo.html`  
  体験デモ用モックアップ。「誰の顔が浮かびますか？」から始まる会話デモです。

## 理念・背景

- `Vision.md（Version 1.0）`  
  Reflective AI のビジョン文書。
- `Founder.md`  
  Founder の背景や原体験。
- `Logs/Discussion-2026-08-06.md`  
  依存、映画館の隣の人、壁打ち、汎用AIとの差分、オープンダイアローグに関するログ。
- `Logs/Discussion-2026-08-06-2.md`  
  危険信号の最初の議論（理念と3段階）。実装の正は `docs/crisis-safety.md`。
- `Logs/Discussion-2026-08-06-4.md`  
  「誰と話したいか」から始める入口設計、言わないと決めたことを言葉にする効能に関するログ。
- `Logs/Discussion-2026-08-06-5.md`  
  「言いっぱなし / 残さない」設計、B2B2C、会場限定版、法人版に関するログ。

## ローカルで開くURL

ローカルサーバーが `http://127.0.0.1:8765` で起動しているときに使えます。

- スライド: `http://127.0.0.1:8765/slides/reflective-ai-for-work-slides.html`
- 全体説明用モックアップ: `http://127.0.0.1:8765/mockups/reflective-ai-for-work.html`
- 体験デモ用モックアップ: `http://127.0.0.1:8765/mockups/reflective-ai-experience-demo.html`
- 発表原稿: `http://127.0.0.1:8765/docs/presentation-script-4min.md`

## 更新時の目安

- 発表内容を変える: `slides/reflective-ai-for-work-slides.html` と `docs/presentation-script-4min.md`
- 体験の見せ方を変える: `mockups/reflective-ai-experience-demo.html`
- 企画の全体像を変える: `mockups/reflective-ai-for-work.html`
- 理念や背景を確認する: `README.md`、`Vision.md（Version 1.0）`、`Founder.md`
- 議論の根拠を確認する: `Logs/`
- 危険信号を変える: `docs/crisis-safety.md` と `web/src/lib/crisis/resources.ts`
