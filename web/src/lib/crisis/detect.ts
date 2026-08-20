import type { CrisisLevel } from "@/lib/types";

/**
 * コード側の下限。誇張は外し、明示的な言葉だけを上げる。
 * 予兆や文脈はモデルに任せる。方法の具体はここでは列挙しない。
 */

const HYPERBOLE = [
  /死にたいほど/g,
  /死にたくない/g,
  /死ぬほど/g,
  /死にそう/g,
  /死ぬ気で/g,
  /死ぬ思い/g,
  /死ぬかと思/g,
];

const LEVEL3 = [
  /死にたい/,
  /死にたく/,
  /死んでしまいた/,
  /死んでしまおう/,
  /死のう/,
  /死ぬつもり/,
  /死ぬことにした/,
  /死ぬしか/,
  /自殺/,
  /自死/,
  /生きていたくない/,
  /生きていけない/,
];

const LEVEL2 = [
  /消えたい/,
  /消えてしま/,
  /いなくなりたい/,
  /いない方がいい/,
  /いないほうがいい/,
  /生きるのがつら/,
  /生きて(?:い)?る意味/,
  /生きる意味/,
];

export function parseCrisisLevel(value: unknown): CrisisLevel {
  if (value === 3 || value === "3") return 3;
  if (value === 2 || value === "2") return 2;
  return 1;
}

function neutralizeHyperbole(text: string): string {
  return HYPERBOLE.reduce((acc, re) => acc.replace(re, " "), text);
}

/** テキストだけから見た下限。1 / 2 / 3 */
export function detectCrisisFloor(text: string): CrisisLevel {
  const normalized = neutralizeHyperbole(text.normalize("NFKC"));
  if (LEVEL3.some((re) => re.test(normalized))) return 3;
  if (LEVEL2.some((re) => re.test(normalized))) return 2;
  return 1;
}

/** モデル判定とコード下限の高い方。モデルが下げてもコードは下げない */
export function resolveCrisisLevel(
  texts: string[],
  modelLevel: unknown,
): CrisisLevel {
  const floor = detectCrisisFloor(texts.filter(Boolean).join("\n"));
  const model = parseCrisisLevel(modelLevel);
  return (floor > model ? floor : model) as CrisisLevel;
}
