export type Lang = "ar" | "en";

export function getLang(params?: Record<string, string | string[] | undefined>): Lang {
  const v = params?.lang;
  const raw = Array.isArray(v) ? v[0] : v;
  return raw === "en" ? "en" : "ar";
}

const dict = {
  ar: { title: "بطولاتي" },
  en: { title: "Btoolaty" },
} as const;

export function t(lang: Lang) {
  return dict[lang];
}
