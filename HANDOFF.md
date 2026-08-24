# 引継ぎメモ（HANDOFF）

次のチャットや別の日に作業を再開するとき用です。  
**APIキーやパスワードは書かないでください。**

---

## 新しいチャットへの貼り付け用（短文）

```
【引継ぎ】Reflective AI

リポジトリ: https://github.com/izumi-miysa/Reflective-AI
公開アプリ: https://reflective-ai-red.vercel.app
アプリ: web/（Next.js）
図解: diagram/index.html（評価者・見学者向け。アプリ入口には置かない）
設計の正: Logs/Discussion-2026-08-08.md（構造）／08-12（Why）／08-14（実装）／08-15（Why実例・誘導）／08-17（入口は場の約束）／docs/crisis-safety.md／docs/diagram-flow.md（図解）

いまの状態（2026-08-25）:
- アプリ修正は main に push 済み: 「もう少し話す」後も4往復ごとに振り返り再提案／「話してみる」と終了のUIバランス／Vercel Web Analytics（ページビューのみ。会話は保存しない）
- Analytics: Dashboard で Enable 済み・動作確認済み。見方は web/README.md
- 感想フォーム: 設問を更新済み（また使いたいか／どんな場面か。入口入りやすさ・終わり方は削った）。正は docs/demo-survey.md。Googleフォーム側も反映済み
- 図解: 見た目（色・フォント・:root の紺系）は維持したまま、構成・文言だけ精査。ヒーローは名前→目的ではない→一言→流れの帯。対比の行は「何の話か」（「対象」は出さない）。3の見出しは「社内では言いにくいことを、会社に届かない場所で」
- 名称: 「Reflective AI」が他にもある件は、今は変えない。図解にも書かない。将来の検討
- 図解は commit 済み。公開: https://diagram-reflective-ai.surge.sh 。再公開は `npx surge diagram --domain diagram-reflective-ai.surge.sh`
- 入口に筋書きを出す案（A）は採用しない（08-17）。批評されたときの返しと、将来のLP／商用説明への転用は準備済み（HANDOFF本文）
- 課題の「記憶・DB」: できないのではなく、残さない設計。発表に入れる。講座で記憶を学んだうえで切った、と言える
- 講座の「自分の困りごと」: 現場で聞いた声（辞めたい／雰囲気／言えない／離職／カウンセラー）が出発点。作るのは離職対策・人の代わりではない。会社に届かない場。図解3冒頭と6分原稿③④に差し込み済み

次にやること:
1. 発表: 6分原稿を図解に揃えた（`docs/presentation-script-6min-v2.md`）。一度音読して削る。公開実例は図解が同僚＋課長、口頭の山場は夫
2. 知人テスト継続。感想は更新済みフォームへ
3. 図解の文言を直したら、commit のうえ `npx surge diagram --domain diagram-reflective-ai.surge.sh` で再公開

参照: @HANDOFF.md @diagram/index.html @docs/diagram-flow.md @docs/demo-survey.md @docs/crisis-safety.md @Logs/Discussion-2026-08-17.md @docs/presentation-script-6min-v2.md @docs/evaluator-why-example.md @docs/Reflective_AI_有用性についての検討_追加版.docx @docs/reflective-ai-意義整理メモ.md
図解スキル: C:\Users\kK35777\src\creating-visual-explainers\.claude\skills\creating-visual-explainers\SKILL.md （次チャットで図解に進むとき、最初にこの SKILL を読む）
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
| `web/README.md` | 起動・Claude接続・Vercel・Analyticsの見方 |
| `diagram/index.html` | 評価者・見学者向け図解（アプリ入口には置かない） |
| `diagram/README.md` | 図解の見方・surge公開メモ |
| `docs/diagram-flow.md` | 図解の判断・9段・A/B/C確定 |
| （リポジトリ外）creating-visual-explainers | 図解の作り方スキル。`C:\Users\kK35777\src\creating-visual-explainers\.claude\skills\creating-visual-explainers\SKILL.md` |
| `docs/demo-survey.md` | Googleフォーム設問・ログイン不要設定 |
| `docs/git-setup.md` | Git の名前・メール設定のコツ（このPCで一度だけ） |
| `Logs/Discussion-2026-08-08.md` | 境界線・3人・エクスプレッシブ・ライティング |
| `Logs/Discussion-2026-08-12.md` | Why の設計（利用者向け／評価者向け） |
| `Logs/Discussion-2026-08-14.md` | 知人テスト対応・敬称ルール・相手を本人が選ぶ変更 |
| `Logs/Discussion-2026-08-15.md` | Why実例、誘導の指摘、「もう少し続ける」の設計 |
| `Logs/Discussion-2026-08-17.md` | 入口は場の約束（筋書きではない）。手書き・音声は将来 |
| `docs/crisis-safety.md` | 危険信号への対処。実装の正。窓口の差し替え先もここから辿れる |
| `Logs/Discussion-2026-08-06-2.md` | 危険信号の最初の議論（理念と3段階） |
| `docs/WHY-ja.md` | 発表・商用向け Why（画面には出さない。仮説） |
| `docs/Discussion-2026-08-18-ja.md` | Why を固めた議論。入口文言の正ではない |
| `docs/evaluator-why-example.md` | 評価者向け Why の実例1本（原文は家庭。公開図解は職場版） |
| `docs/Reflective_AI_有用性についての検討_追加版.docx` | 有用性の検討（追加版）。発表・図解の材料 |
| `docs/reflective-ai-意義整理メモ.md` | 意義整理メモ（素材）。Claude版は `reflective-ai-意義整理メモ-Claude.md` |
| `docs/perception-science-grounding.md` | 知覚理論との対応（図解4。証明ではなくアナロジー） |
| `docs/presentation-script-6min-v2.md` | 6分発表の現行原稿 |
| `mockups/` / `slides/` | 発表・説明用の静的資料 |
| `.env.local`（`web/`内・Git対象外） | 秘密情報。GitHubに上げない |

### 文書の使い分け（全部を同時に正にしない）

| やりたいこと | 正とするもの | 開かない／混ぜない |
|---|---|---|
| 入口画面の文言 | この HANDOFF の画面0 ＋ `Logs/Discussion-2026-08-17.md` | `docs/WHY-ja.md`。効能・筋書きを入口に置かない |
| 書く→リフレクト→ステージの構造 | `Logs/Discussion-2026-08-08.md` | 発表原稿の比喩を画面に移植しない |
| 相手は本人が選ぶ・誘導しない | `Logs/Discussion-2026-08-14.md` / `08-15.md` | 候補を主ボタンにしない |
| 評価者向け図解 | `docs/diagram-flow.md` ＋ `diagram/index.html` | アプリ入口に載せない |
| 発表・「AIに相談するのと何が違うか」 | `docs/WHY-ja.md` / `docs/evaluator-why-example.md` / 6分原稿 | アプリ画面。Why は仮説 |
| 読み上げ原稿 | `docs/presentation-script-6min-v2.md` | アプリの実装ルール |
| URL・タブの説明 | `web/src/app/layout.tsx` の description。**変えない** | Why コピーで置き換えない |
| 感想フォーム | `docs/demo-survey.md` | 入口文言の変更だけでは触らない |
| 危険信号（自傷・希死） | `docs/crisis-safety.md` | 入口に窓口を置く。番号をモデルに書かせる |

---

## いまの状態（手で更新する）— 2026-08-24

### アプリ（push 済み）

- 公開: https://reflective-ai-red.vercel.app  
  Vercel プロジェクト **`reflective-ai`**。`main` push で自動デプロイ。New Project は押さない
- 直近コミット:
  - `2505568` ステージ「もう少し話す」後も4往復ごとに振り返り再提案／話してみると終了のUIバランス／`@vercel/analytics`
  - `a3e6542` Analytics は Enable → Redeploy の順が必要、と README に記載
- Analytics: Enable 済み・Visitors 表示を確認済み。会話内容は出ない。見方は `web/README.md`
- ローカル開発: http://localhost:3010
- 環境変数: `AI_PROVIDER` / `ANTHROPIC_API_KEY` / `ANTHROPIC_MODEL` / `NEXT_PUBLIC_SURVEY_URL`

### 図解（commit 済み）

- ファイル: `diagram/index.html`（型は日報サイト https://diagram-daitatu-nippo-growth.surge.sh/ ）
- 判断の正: `docs/diagram-flow.md`
- **作り方の正（次チャットで図解に進むとき）:** `creating-visual-explainers` スキルを先に読む  
  `C:\Users\kK35777\src\creating-visual-explainers\.claude\skills\creating-visual-explainers\SKILL.md`  
  （リポジトリ外。Reflective AI の設計正 `diagram-flow.md` と併用。入口に筋書きを載せないなど設計ルールは HANDOFF／08-17 が優先）
- **A/B/C 確定（推奨どおり）**
  - A 冒頭: 答えを出すこと自体が目的ではない → **何に対するもやもやかなのかを、自分で決める場所**（ヒーローに「対象」は出さない。リードなし。人／期待は図解に書かない）
  - B 未来: 効能は約束しない。「手放したあと、また来られる」＋私に起きたことだけ
  - C 実例: 08-15要約を置く。**公開図解の人物は同僚＋課長**（夫婦をさらす抵抗のため。手元の比較メモは家庭のままでよい）
- 色: アプリの紺（`--reflector` 系）に揃えた。アプリ画面モックを載せるため
- **見た目は現状の `diagram/index.html` を正とする。** creating-visual-explainers で構成・文言を直すときも、色・フォント・背景・余白の系統は変えない（スキル側の別テンプレ色に寄せない）
- ローカル確認: `file:///C:/Users/kK35777/src/Reflective-AI/diagram/index.html`  
  **保存（Ctrl+S）してから再読み込み。** 未保存だとブラウザに反映されない。GitHub push はローカル表示に不要
- Surge 公開済み: https://diagram-reflective-ai.surge.sh 。再公開: `npx surge diagram --domain diagram-reflective-ai.surge.sh`。アプリの Vercel とは分ける
- **2026-08-25 の構成・文言（見た目は未変更）:** ヒーロー順は名前 →「答えを出すこと自体が目的ではない」→ 一言 → 流れの帯（一言の直後が帯）。対比の行ラベルは「何の話か」（「対象」は出さない）。3の見出しは「社内では言いにくいことを、会社に届かない場所で」。色・フォント・:root は触っていない
- **名称:** 「Reflective AI」が他にもあることは分かっている。今は変えない。図解・フッターにも書かない。将来、商用やドメインを取るときに再検討
- **2026-08-24 の2段レイアウト:** 入口→書く→リフレクト→ステージ→終了を横5マス。下にスマホ2台（左・書く／右・リフレクト説明用の架空短文。ステージは出さない）。枠の高さは揃える。色・フォントは `:root` の紺系のまま
- **図解に書かない:** 「こんなことまで言われたくない」（口頭は6分原稿③）。「人のことも、自分の期待のこともあります」（08-12の見込みの層。公開実例はそこまで示さない）。古いiPhone／会社ネットの注意（`diagram-flow.md` の知人案内に残す）
- フッター: 経歴（企業支援10年、相談活動28年）／ © 2026 Izumi Kawakami－ReflectiveAI ／ Cursor / Claude / Next.js / TypeScript / Vercel。技術の検証に ChatGPT

### 次にやること

1. **発表** 6分原稿を図解に揃えた（`docs/presentation-script-6min-v2.md`）。一度音読して削る。図解の実例は同僚＋課長、口頭の山場は夫
2. 知人テスト継続。感想は更新済みフォームへ（`docs/demo-survey.md`）
3. 図解の文言を直したら、commit のうえ `npx surge diagram --domain diagram-reflective-ai.surge.sh` で再公開

### Git の注意（次チャット開始時）

- `main` は図解の commit 分だけ origin より先に進む（push は依頼があるまでしない）
- **まだ上げないもの:** ほか docs 多数、`demo/`（個人メモは上げない）

### 現在のアプリの画面（要約）

0. 入口: 場の約束＋誘い。「話してみる」。**筋書きは出さない**
1. 書く → `書きました`
2. リフレクト: 候補は薄い紺。`もう少し続ける`＝書く画面へ。`今日はここまでにする`は常に ghost（終了を主ボタンにしない）。呼び方入力ありのとき「話してみる」は primary
3. ステージ: 4往復／沈黙45秒で「返してもらう」提案。**「もう少し話す」後も +4往復で再提案**（以前は永久に出なかった）
4. 終了: 保存されていない。感想フォーム

### 決まっている設計ルール（要点）

- 入口に筋書きを出さない（08-17）。わかりにくさへの答えは**図解（B）**側
- 候補を濃い紺の主ボタンにしない（誘導しない）
- 保存しない・通知しない。残らないことが本音の条件
- 「できないから残さない」ではない。「しない」設計。講座の記憶技術を知ったうえで切った
- 効能を約束しない。「ゆっくり」「じっくり」「時間をかけて」は使わない

### 批評・発表用の準備メモ（このチャットで固めた）

**入口に流れを出せ（案A）と言われたら:**

> 入口に流れを出す案も見た。わかりやすさは上がる。ただし書く前から「誰かと話す材料を作れ」になり、相手を本人が選ぶ工程が先に決まる。だから入口には載せず、説明は図解に分けた。

将来の使い方: 図解／LP／商用の説明。セッション入口には今は出さない。初回だけ任意の補足、は将来ありうる。

**課題の「記憶・DB」について発表で言える形:**

> 講座では画面に記憶を持たせることも学んだ。できないから残していないのではない。残すと本音が書きにくくなる。預からない場にした。技術を使わなかったのではなく、何を残し何を残さないかを自分で決めた。

### 止めてある話（言葉になるまで触らない）

リフレクトを続けていると「対話の整理」のように感じる、という観察。名前は置いていない。Reflective AI 特有か、最適解を取るためにAIへ語り掛ける癖なのか、未決。

名称の衝突（「Reflective AI」が他にもある）。今はこのままでよい、という判断。図解には出さない。必要になったら改名を検討する。

### 未追跡のまま置いてあるもの（意図的）

`demo/*.docx`、`ReflectiveAIの選択肢改善.pdf`（知人テストの原文・家族の固有名が入る個人メモのため、GitHub には上げない）

---

## ファイル名と置き場所について

- **名前:** `HANDOFF.md`（「引継ぎ」と一目で分かる）
- **場所:** リポジトリの一番上（ルート）
- **GitHubに入れる:** よい（秘密は書かない）
- README の File Map からこのファイルへリンクしておくとさらに見つけやすい
