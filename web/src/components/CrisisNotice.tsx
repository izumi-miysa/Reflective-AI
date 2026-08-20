import {
  CRISIS_HOTLINES,
  CRISIS_PORTAL,
} from "@/lib/crisis/resources";

type CrisisNoticeProps = {
  variant: "quiet" | "hold";
  onEnd?: () => void;
};

export function CrisisNotice({ variant, onEnd }: CrisisNoticeProps) {
  const hold = variant === "hold";

  return (
    <aside className={`crisis-notice ${hold ? "crisis-hold" : "crisis-quiet"}`}>
      <p className="crisis-notice-lead">
        {hold
          ? "いま、ここより先に、人の声が必要かもしれません。この場では答えを出しません。"
          : "ひとりで抱えきれない気持ちが、言葉のなかにあるかもしれません。ここでは答えは出しません。人に話すこともできます。"}
      </p>
      <ul className="crisis-hotlines">
        {CRISIS_HOTLINES.map((line) => (
          <li key={line.phone}>
            <span className="crisis-hotline-name">{line.name}</span>
            <a className="crisis-hotline-phone" href={line.tel}>
              {line.phone}
            </a>
            <span className="crisis-hotline-hours">{line.hours}</span>
          </li>
        ))}
      </ul>
      <p className="crisis-portal">
        <a href={CRISIS_PORTAL.href} target="_blank" rel="noopener noreferrer">
          {CRISIS_PORTAL.name}
        </a>
        に、SNS相談の一覧もあります。
      </p>
      {hold && onEnd ? (
        <div className="actions">
          <button type="button" className="btn primary" onClick={onEnd}>
            今日はここまでにする
          </button>
        </div>
      ) : null}
    </aside>
  );
}
