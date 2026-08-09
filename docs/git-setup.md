# Git の名前・メール設定（このPCで一度だけ）

コミットには **このパソコン上の Git** に、作者名とメールが入っている必要があります。  
GitHub の画面でメールが見えていても、それだけではコミットできません。

---

## GitHubで「見る」もの と PCで「設定する」もの

| | GitHubで見ること | PCで設定すること |
|---|---|---|
| **email** | Settings → **Emails**（使えるメールの一覧） | `git config --global user.email "..."` |
| **name** | ユーザー名は参考になるだけ（画面に「設定欄」は無い） | `git config --global user.name "..."` |

### メールの確認場所

1. GitHub 右上アイコン → **Settings**  
   （リポジトリの Settings ではない）
2. 左メニュー **Emails**  
   直リンク: https://github.com/settings/emails

非公開にしている場合は、同じページの  
`xxxx@users.noreply.github.com` でも大丈夫です。

### 関係ない画面の例

- リポジトリの **Settings → Integrations / GitHub Apps**（Cursor や Vercel の連携）  
  → デプロイには関係するが、名前・メール設定とは無関係
- **Create a new repository**  
  → 新しいリポジトリ作成。ファイル保存ではない

---

## 設定手順（PowerShell）

Reflective AI のフォルダでなくても構いません。

```powershell
git config --global user.name "izumi-miysa"
```

```powershell
git config --global user.email "GitHubのEmailsで見たアドレス"
```

`"..."` は必ず自分の値に置き換えてください。

### 入ったか確認（必ずやる）

```powershell
git config --global --get user.name
git config --global --get user.email
```

名前とメールが**そのまま表示**されれば成功です。  
何も出ない場合は、まだ未設定です（打ち間違い・別のターミナルの可能性）。

まとめて見る場合:

```powershell
git config --global --list
```

`user.name=` と `user.email=` の行があればOKです。

---

## よくあるつまずき

1. **GitHubのEmailsでアドレスは見えているが、コミットできない**  
   → PC側の `git config` が未設定。上の確認コマンドで確かめる。

2. **設定したつもりなのに `Author identity unknown`**  
   → 確認コマンドで再チェック。別ユーザー／別PCのターミナルのこともある。

3. **`HANDOFF.md` を新しいリポジトリ名にしようとしてしまった**  
   → `HANDOFF.md` は **Reflective-AI リポジトリ内の1ファイル**（ルート）。  
   別リポジトリを新規作成する必要はない。  
   例: https://github.com/izumi-miysa/Reflective-AI/blob/main/HANDOFF.md

4. **メールをチャットやコミットメッセージ本文に毎回書きたくない**  
   → `git config` に一度書けば、あとは自動でコミット作者になる。

---

## このプロジェクトでの位置づけ

| ファイル | 役割 |
|---|---|
| `docs/git-setup.md`（このファイル） | Git作者情報の設定コツ |
| `HANDOFF.md` | 次チャット・別日作業の引継ぎ |
| `web/README.md` | アプリ起動・Claude・Vercel |
| `docs/demo-survey.md` | デモ感想フォーム |

秘密情報（APIキー）は Git に入れず、`web/.env.local` と Vercel の環境変数だけに置きます。
