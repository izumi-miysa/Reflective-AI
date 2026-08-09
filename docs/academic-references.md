# Reflective AI — 設計思想の学術的裏付け

このドキュメントは、Reflective AIの設計判断のうち、**先行研究・既存の実践理論に裏付けがあるもの**と、**壁打ちの中でClaudeが提案した仮説（裏付けなし）**を明確に分けて整理したものです。卒業制作の発表・資料作成時の出典確認用。

---

## 学術的裏付けがあるもの

### 1. 境界線ルール（リフレクターは一方向にしか話さない）

**出典**：Andersen, T. (1987). "The Reflecting Team: Dialogue and Meta-Dialogue in Clinical Work." *Family Process*, 26(4), 415–428.

ノルウェーの精神科医トム・アンデルセンが提唱した、家族療法における「リフレクティングチーム」技法。相談者本人と面談者の対話を、別のチームが一方向スクリーンの向こうで見聞きし、その後面談者がチームの見解を尋ね、本人側がそれを聞いて反応する、という構造を持つ。本人・相手役はリフレクターの話をただ聞くだけで、その場で答え返さないという一方向性の境界線は、この技法そのものに由来する。

グレゴリー・ベイトソン、ウンベルト・マトゥラーナの思想に影響を受けている（Frontiers in Psychology, 2022の解説記事より）。

**関連する後続研究**：
Brownlee, K., Vis, J.-A., & McKenna, A. (2009). "Review of the Reflecting Team Process: Strengths, Challenges, and Clinical Implications." *Journal of Family Therapy*.

### 2. 結論を出さない・助言しないという原則

**出典**：Rogers, C. R. (1957). "The Necessary and Sufficient Conditions of Therapeutic Personality Change." *Journal of Consulting Psychology*, 21(2), 95–103.

カール・ロジャーズの来談者中心療法（Client-Centered Therapy）における中核条件。セラピストが患者への無条件の肯定的関心（unconditional positive regard）を経験し、患者の内的な準拠枠への共感的理解を経験してそれを伝えようと努めることが、治療的な変化に必要な条件として挙げられている。「答えを与えず、自分で決める力を支える」というReflective AIの理念は、この非指示的アプローチの系譜に位置づけられる。

原著：Rogers, C. R. (1951). *Client-Centered Therapy*. Boston: Houghton Mifflin.

### 3. 入口設計：エクスプレッシブ・ライティング

**出典**：Pennebaker, J. W., & Beall, S. K. (1986). "Confronting a Traumatic Event: Toward an Understanding of Inhibition and Disease." *Journal of Abnormal Psychology*, 95(3), 274–281.

学生に4日間連続でトラウマ的な体験について書いてもらった実験。直後は血圧や否定的な気分が一時的に上がったものの、その後6ヶ月間の通院回数・体調不良の自己申告は、些細な話題について書いたグループより減少した。「誰にも読まれない前提で、遮られず書く」ことそのものに心理的効果があることを示した基礎研究であり、Reflective AIの「書く→AIは無言」という入口設計の根拠になっている。

**関連する後続研究**：
Pennebaker, J. W. (1997). "Writing About Emotional Experiences as a Therapeutic Process." *Psychological Science*, 8(3), 162–166.

### 4. 円環的因果律（お互いの見ているところが違う、という視点）

**出典**：Selvini Palazzoli, M., Boscolo, L., Cecchin, G., & Prata, G. (1980). "Hypothesizing—Circularity—Neutrality: Three Guidelines for the Conductor of the Session." *Family Process*, 19(1), 3–12.

ミラノ派家族療法（Milan Systemic Family Therapy）の中核概念のひとつ。1人の問題として見るのではなく、関係の中で相互に影響し合う円環として状況を捉える視点。「全体を考えている自分」と「負担を感じている佐藤さん」がお互いに違うところを見ている、というリフレクトの視点は、この円環性の概念に近い。

---

## 裏付けなし（Claudeによる設計仮説）

以下は壁打ちの中でClaudeが提案したものであり、**特定の実証研究に基づくものではありません**。発表では「私たちの仮説・設計判断」として扱うべきです。

- 相手役の口調を、関係性の温度感（文章から推測される距離感）に合わせて調整すべきという提案
  → ただし2026-08-09のCursorによる実装評価で、この方向性自体は実装上の課題として裏付けられた（該当ログ参照）
- 「終わりが難しい問題は、UI上の区切りと、内容としての助言を分離すれば解決するかもしれない」という仮説
- 「冒頭の違和感は、書く画面への移行のタイミングが原因かもしれない」という推測
  → 2026-08-09のCursor評価では、より具体的に「相手役が先に話す実装になっていること」が原因と特定された

## 実装から得られた教訓（研究文献に基づかない、実践的発見）

2026-08-09のデモ・Cursorレビューで判明した点：**「余白を残してください」とAIに明示的に指示すると、その"余白の提示"自体が指示的な出力を誘発することがある**。理念を守るための指示が、理念に反する出力を誘発するという逆説。プロンプト設計上の実践知として記録するが、これは学術研究ではなく、今回の開発過程での独自の発見。
