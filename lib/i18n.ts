export function getLang() {
  return "ar";
}

const dict = {
  ar: {
    title: "بطولاتي",
  },
  en: {
    title: "Btoolaty",
  },
} as const;

export function t(key: keyof (typeof dict)["ar"], lang: "ar" | "en" = "ar") {
  return dict[lang][key] ?? key;
}
