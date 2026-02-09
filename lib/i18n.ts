export function getLang() {
  return "ar"; // تقدر تغيرها لاحقاً
}

const dict = {
  ar: {
    title: "بطولاتي",
  },
  en: {
    title: "Btoolaty",
  },
} as const;

type Lang = keyof typeof dict;
type Keys = keyof (typeof dict)["ar"];

export function t(key: Keys) {
  const lang = getLang() as Lang;
  return dict[lang][key] ?? key;
}
