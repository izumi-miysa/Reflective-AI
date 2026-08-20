/**
 * 専門窓口。番号はモデルに書かせず、ここだけを画面に出す。
 * 受付時間は変わりうる。実装・公開の前に厚労省「まもろうよ こころ」で確認する。
 * https://www.mhlw.go.jp/mamorouyokokoro/
 */

export type CrisisResource = {
  name: string;
  phone: string;
  tel: string;
  hours: string;
  href: string;
};

export const CRISIS_PORTAL = {
  name: "まもろうよ こころ（厚生労働省）",
  href: "https://www.mhlw.go.jp/mamorouyokokoro/",
  note: "電話・SNSの一覧。番号や時間の正はこちら。",
} as const;

/** L3で出す1本目。死にたい気持ちを24時間受ける */
export const INOCHI_SOS: CrisisResource = {
  name: "#いのちSOS",
  phone: "0120-061-338",
  tel: "tel:0120061338",
  hours: "24時間・無料",
  href: "https://www.mhlw.go.jp/mamorouyokokoro/soudan/tel/",
};

/** 汎用の24時間。つながりやすさの予備 */
export const YORISOI: CrisisResource = {
  name: "よりそいホットライン",
  phone: "0120-279-338",
  tel: "tel:0120279338",
  hours: "24時間・無料",
  href: "https://www.since2011.net/yorisoi/",
};

export const CRISIS_HOTLINES: CrisisResource[] = [INOCHI_SOS, YORISOI];
