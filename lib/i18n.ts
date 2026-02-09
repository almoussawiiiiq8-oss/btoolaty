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

export function t(lang: keyof typeof dict) {
  return dict[lang];
}
