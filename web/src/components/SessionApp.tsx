"use client";

import { useEffect, useRef, useState } from "react";
import type { ChatMessage, Person, Phase } from "@/lib/types";

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** ステージでこの往復数に達したら、話を聞く提案を出す */
const STAGE_EXCHANGES_BEFORE_OFFER = 4;
/** 無操作が続いたら話を聞く提案を出す（ミリ秒） */
const STAGE_SILENCE_MS = 45_000;

export function SessionApp() {
  const [phase, setPhase] = useState<Phase>("writing");
  const [writing, setWriting] = useState("");
  const [draft, setDraft] = useState("");
  const [personLabel, setPersonLabel] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Person[]>([]);
  const [customPerson, setCustomPerson] = useState("");
  const [reflectorMessages, setReflectorMessages] = useState<ChatMessage[]>(
    [],
  );
  const [stageMessages, setStageMessages] = useState<ChatMessage[]>([]);
  const [reflectRound, setReflectRound] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stageExchanges, setStageExchanges] = useState(0);
  const [showPauseOffer, setShowPauseOffer] = useState(false);
  const [pauseOfferDismissed, setPauseOfferDismissed] = useState(false);

  const stageLastRef = useRef<HTMLElement | null>(null);
  const reflectEndRef = useRef<HTMLDivElement>(null);

  // 枠より長い発言のときは、末尾ではなくその発言の先頭が見えるところで止める
  useEffect(() => {
    stageLastRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [stageMessages, phase]);

  useEffect(() => {
    reflectEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [reflectorMessages]);

  // 4往復に達したら提案（断り済みなら出さない）
  useEffect(() => {
    if (
      phase === "stage" &&
      stageExchanges >= STAGE_EXCHANGES_BEFORE_OFFER &&
      !pauseOfferDismissed
    ) {
      setShowPauseOffer(true);
    }
  }, [phase, stageExchanges, pauseOfferDismissed]);

  // 沈黙が続いたら提案（入力中・応答待ち中はリセット）
  useEffect(() => {
    if (phase !== "stage" || busy || showPauseOffer) return;

    const timer = window.setTimeout(() => {
      setShowPauseOffer(true);
    }, STAGE_SILENCE_MS);

    return () => window.clearTimeout(timer);
  }, [phase, busy, draft, stageMessages, showPauseOffer]);

  async function submitWriting() {
    const text = writing.trim();
    if (!text || busy) return;

    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          writing: text,
          stageMessages: [],
          personLabel: null,
          reflectRound: 0,
        }),
      });

      if (!res.ok) throw new Error("reflect failed");
      const data = await res.json();

      setCandidates(data.people ?? []);
      setReflectRound(1);
      setReflectorMessages([
        {
          id: uid(),
          speaker: "reflector",
          text: data.message,
          at: Date.now(),
        },
      ]);
      setPhase("reflecting");
    } catch {
      setError("リフレクトに失敗しました。もう一度試してください。");
    } finally {
      setBusy(false);
    }
  }

  function openStage(person: string) {
    const name = person.trim();
    if (busy || !name) return;
    const switched = personLabel !== null && personLabel !== name;

    setPersonLabel(name);
    setCustomPerson("");
    setPhase("stage");
    setError(null);
    setStageExchanges(0);
    setShowPauseOffer(false);
    setPauseOfferDismissed(false);

    // 相手を変えたら、前の相手とのやり取りは持ち込まない
    if (switched) setStageMessages([]);

    if (switched || stageMessages.length === 0) {
      setStageMessages([
        {
          id: uid(),
          speaker: "system",
          text: `${name}の発言は、AIが視点を推測して声を代わりに担っています。実際のその人ではありません。あなたから話しかけてみてください。`,
          at: Date.now(),
        },
      ]);
    }
  }

  async function sendStageMessage() {
    const text = draft.trim();
    if (!text || !personLabel || busy || phase !== "stage") return;

    const nextUser: ChatMessage = {
      id: uid(),
      speaker: "user",
      text,
      at: Date.now(),
    };

    const historyForApi = [...stageMessages, nextUser]
      .filter((m) => m.speaker === "user" || m.speaker === "counterpart")
      .map((m) => ({
        speaker: m.speaker as "user" | "counterpart",
        text: m.text,
      }));

    setStageMessages((prev) => [...prev, nextUser]);
    setDraft("");
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/stage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          writing,
          personLabel,
          stageMessages: historyForApi.slice(0, -1),
          userMessage: text,
        }),
      });

      if (!res.ok) throw new Error("stage failed");
      const data = await res.json();

      setStageMessages((prev) => [
        ...prev,
        {
          id: uid(),
          speaker: "counterpart",
          text: data.message,
          at: Date.now(),
        },
      ]);
      setStageExchanges((n) => n + 1);
    } catch {
      setError("相手役の応答に失敗しました。");
    } finally {
      setBusy(false);
    }
  }

  function dismissPauseOffer() {
    setShowPauseOffer(false);
    setPauseOfferDismissed(true);
  }

  async function closeStage() {
    if (busy) return;
    setBusy(true);
    setError(null);
    setShowPauseOffer(false);

    try {
      const stageForApi = stageMessages
        .filter((m) => m.speaker === "user" || m.speaker === "counterpart")
        .map((m) => ({
          speaker: m.speaker as "user" | "counterpart",
          text: m.text,
        }));

      const res = await fetch("/api/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          writing,
          stageMessages: stageForApi,
          personLabel,
          reflectRound,
          previousReflectorMessages: reflectorMessages.map((m) => m.text),
        }),
      });

      if (!res.ok) throw new Error("reflect failed");
      const data = await res.json();

      if (Array.isArray(data.people) && data.people.length > 0) {
        setCandidates(data.people);
      }
      setReflectRound((n) => n + 1);
      setReflectorMessages((prev) => [
        ...prev,
        {
          id: uid(),
          speaker: "reflector",
          text: data.message,
          at: Date.now(),
        },
      ]);
      setPhase("reflecting");
      setStageExchanges(0);
      setPauseOfferDismissed(false);
    } catch {
      setError("リフレクトに失敗しました。");
    } finally {
      setBusy(false);
    }
  }

  function endSession() {
    setPhase("done");
  }

  function resetSession() {
    setPhase("writing");
    setWriting("");
    setDraft("");
    setPersonLabel(null);
    setCandidates([]);
    setCustomPerson("");
    setReflectorMessages([]);
    setStageMessages([]);
    setReflectRound(0);
    setStageExchanges(0);
    setShowPauseOffer(false);
    setPauseOfferDismissed(false);
    setBusy(false);
    setError(null);
  }

  return (
    <div
      className={`shell phone-like-safe${phase === "stage" && showPauseOffer ? " has-pause-offer" : ""}`}
    >
      <header className="top">
        <div>
          <p className="brand">Reflective AI</p>
        </div>
        <span className={`phase-pill phase-${phase}`}>
          {phaseLabel(phase, personLabel)}
        </span>
      </header>

      {phase === "writing" && (
        <section className="panel writing-panel">
          <h1>今、心にあることを書いてみませんか</h1>
          <p className="hint">
            うれしかったことでも、もやもやでも。うまくまとめなくて大丈夫です。
          </p>
          <textarea
            className="writing-area"
            value={writing}
            onChange={(e) => setWriting(e.target.value)}
            placeholder="浮かんだこと、言えなかったこと、ぼんやりした気持ち…"
            rows={12}
            disabled={busy}
          />
          <p className="writing-assurance">
            判断やアドバイスはしません。書いたことは応答をつくるためにAIへ送られますが、保存されず、ほかの人に伝わることもありません。
          </p>
          <div className="actions">
            <button
              type="button"
              className="btn primary"
              disabled={!writing.trim() || busy}
              onClick={submitWriting}
            >
              {busy ? "聞いています…" : "書きました"}
            </button>
          </div>
        </section>
      )}

      {(phase === "reflecting" || phase === "stage") && (
        <div className="workspace">
          <section className="panel reflector-panel">
            <div className="panel-head reflector-head">
              <span className="avatar reflector">R</span>
              <div className="panel-head-text">
                <strong>Reflective AI</strong>
                <span>俯瞰するリフレクター（一度だけ話します）</span>
              </div>
            </div>
            <div className="reflect-log">
              {reflectorMessages.map((m) => (
                <article key={m.id} className="reflect-bubble">
                  {m.text.split("\n").map((line, index) => (
                    <p key={`${m.id}-${index}`}>{line}</p>
                  ))}
                </article>
              ))}
              <div ref={reflectEndRef} />
            </div>

            {phase === "reflecting" && (
              <>
                <p className="end-hint">
                  {reflectRound > 1
                    ? "続きが必要なら、もう一度声をかけてみてください。終わってもよいと感じたら、ここで閉じて大丈夫です。この会話は保存されません。"
                    : "今は話さなくても大丈夫です。終わってもよいと感じたら、ここで閉じてください。この会話は保存されません。"}
                </p>
                {candidates.length > 0 ? (
                  <>
                    <p className="choose-lead">
                      ここで、相手を想定して話してみませんか。
                    </p>
                    <p className="boundary-note">
                      相手役の声は、AIが視点を推測して演じます。実際のご本人に届くことはありません。
                    </p>
                    <div className="actions">
                      {candidates.map((person) => (
                        <button
                          key={person.label}
                          type="button"
                          className="btn primary"
                          disabled={busy}
                          onClick={() => openStage(person.label)}
                        >
                          {person.label}と話してみる
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="choose-lead">
                      ここで、相手を想定して話してみませんか。
                    </p>
                    <p className="boundary-note">
                      相手役の声は、AIが視点を推測して演じます。実際のご本人に届くことはありません。
                    </p>
                    <div className="person-pick">
                      <input
                        type="text"
                        value={customPerson}
                        onChange={(e) => setCustomPerson(e.target.value)}
                        placeholder="例: 同僚、お母さん"
                        disabled={busy}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            const name = customPerson.trim();
                            if (name) openStage(name);
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="btn ghost compact"
                        disabled={!customPerson.trim() || busy}
                        onClick={() => openStage(customPerson.trim())}
                      >
                        話してみる
                      </button>
                    </div>
                  </>
                )}
                <div className="actions">
                  <button
                    type="button"
                    className={`btn ${candidates.length > 0 ? "ghost" : "primary"}`}
                    disabled={busy}
                    onClick={endSession}
                  >
                    今日はここまでにする
                  </button>
                </div>
              </>
            )}

            {phase === "stage" && !showPauseOffer && (
              <p className="boundary-note">
                ステージが開いているあいだ、Reflective AIは発言しません。
                およそ4往復、またはしばらく沈黙が続いたタイミングで、少し離れて返してもらう提案が出ます。
              </p>
            )}

            {phase === "stage" && showPauseOffer && (
              <div className="pause-offer">
                <p className="pause-offer-title">
                  ここで一度、今のやり取りを少し離れて返してもらいませんか
                </p>
                <p className="pause-offer-body">
                  聞こえたことを、一度だけ返します。まだ終わりません。続けることもできます。
                </p>
                <div className="actions">
                  <button
                    type="button"
                    className="btn primary compact"
                    disabled={busy}
                    onClick={closeStage}
                  >
                    返してもらう
                  </button>
                  <button
                    type="button"
                    className="btn ghost compact"
                    disabled={busy}
                    onClick={dismissPauseOffer}
                  >
                    もう少し話す
                  </button>
                </div>
              </div>
            )}
          </section>

          <section
            className={`panel stage-panel ${phase === "stage" ? "open" : "dimmed"}`}
          >
            <div className="panel-head stage-head">
              <div className="panel-head-text">
                <strong>ステージ</strong>
                <span className="stage-pair">
                  <span>{personLabel ?? "相手役"}</span>
                  <span className="stage-pair-line" aria-hidden="true" />
                  <span>自分</span>
                </span>
              </div>
              {phase === "stage" && (
                <button
                  type="button"
                  className="btn ghost compact"
                  disabled={busy}
                  onClick={closeStage}
                >
                  いったん閉じる
                </button>
              )}
            </div>

            <div className="stage-log">
              {phase !== "stage" && stageMessages.length === 0 && (
                <p className="empty-stage">
                  ステージはまだ閉じています。リフレクターの提案のあと、必要なときだけ開きます。
                </p>
              )}
              {phase === "stage" &&
                stageMessages.every((m) => m.speaker === "system") && (
                  <p className="empty-stage">
                    あなたから話しかけてください。相手役は、そのあとに応じます。
                  </p>
                )}
              {stageMessages.map((m, index) => {
                const lastRef =
                  index === stageMessages.length - 1
                    ? (el: HTMLElement | null) => {
                        stageLastRef.current = el;
                      }
                    : undefined;

                if (m.speaker === "system") {
                  return (
                    <p key={m.id} ref={lastRef} className="stage-system">
                      {m.text}
                    </p>
                  );
                }
                const side = m.speaker === "user" ? "right" : "left";
                const who =
                  m.speaker === "user"
                    ? "自分"
                    : personLabel
                      ? `相手役：${personLabel}`
                      : "相手役";
                return (
                  <div key={m.id} ref={lastRef} className={`stage-row ${side}`}>
                    <div className="stage-meta">{who}</div>
                    <div
                      className={`stage-bubble ${m.speaker === "counterpart" ? "counterpart" : "user"}`}
                    >
                      {m.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {phase === "stage" && (
              <div className="stage-input">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder={
                    personLabel
                      ? `${personLabel}に、あなたから話しかけてみましょう…`
                      : "あなたから話しかけてみましょう…"
                  }
                  disabled={busy}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void sendStageMessage();
                    }
                  }}
                />
                <button
                  type="button"
                  className="btn primary compact"
                  disabled={!draft.trim() || busy}
                  onClick={sendStageMessage}
                >
                  送る
                </button>
              </div>
            )}
          </section>
        </div>
      )}

      {phase === "done" && (
        <section className="panel done-panel">
          <h1>この会話は、ここで終わります</h1>
          <p className="hint">
            内容は保存されていません。話すことは、手放すことです。
            また書きたくなったら、いつでも来てください。
          </p>
          <div className="actions">
            {process.env.NEXT_PUBLIC_SURVEY_URL ? (
              <a
                className="btn primary"
                href={process.env.NEXT_PUBLIC_SURVEY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                感想を送る（3分・ログイン不要）
              </a>
            ) : null}
            <button type="button" className="btn ghost" onClick={resetSession}>
              もう一度、書くところから
            </button>
          </div>
        </section>
      )}

      {error && <p className="error">{error}</p>}

      {(phase === "reflecting" || phase === "stage") && (
        <footer className="foot">
          <button type="button" className="linkish" onClick={resetSession}>
            セッションを破棄
          </button>
        </footer>
      )}
    </div>
  );
}

function phaseLabel(phase: Phase, personLabel: string | null) {
  switch (phase) {
    case "writing":
      return "書く";
    case "reflecting":
      return "リフレクト";
    case "stage":
      return personLabel ? `ステージ · ${personLabel}` : "ステージ";
    case "done":
      return "終了";
  }
}
