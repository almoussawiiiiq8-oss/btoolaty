export type Lang = "ar" | "en";

export function getLang(searchParams?: Record<string, string | string[] | undefined>): Lang {
  const raw = searchParams?.lang;
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "en" ? "en" : "ar";
}

const dict = {
  ar: {
    appName: "بطولاتي",
    appNameEn: "Byoolatu",
    tournaments: "البطولات",
    upcoming: "بطولات متاحة",
    admin: "الأدمن",
    createTournament: "إنشاء بطولة",
    open: "التسجيل مفتوح",
    closed: "التسجيل مغلق",
    drawDone: "تمت القرعة",
    notDrawn: "لم تتم القرعة",
    view: "عرض",
    register: "تسجيل",
    registerPlayer: "تسجيل لاعب",
    secondName: "الاسم الثاني",
    nickname: "اللقب",
    phone: "رقم الهاتف",
    submit: "إرسال",
    back: "رجوع",
    tournamentInfo: "معلومات البطولة",
    teamsCount: "عدد الفرق",
    playersPerTeam: "لاعبين لكل فريق",
    startDate: "تاريخ البدء",
    endDate: "تاريخ الانتهاء",
    time: "الساعة",
    days: "الأيام",
    logo: "شعار البطولة",
    draw: "إجراء القرعة",
    drawResults: "نتائج القرعة",
    team: "فريق",
    login: "دخول",
    password: "كلمة المرور",
    logout: "خروج",
    error: "حدث خطأ",
    phoneUnique: "هذا الرقم مسجل مسبقاً في نفس البطولة",
    needMorePlayers: "عدد المسجلين غير كافٍ لعمل القرعة حسب إعدادات البطولة",
  },
  en: {
    appName: "Byoolatu",
    appNameEn: "بطولاتي",
    tournaments: "Tournaments",
    upcoming: "Open tournaments",
    admin: "Admin",
    createTournament: "Create tournament",
    open: "Registration open",
    closed: "Registration closed",
    drawDone: "Draw completed",
    notDrawn: "Not drawn yet",
    view: "View",
    register: "Register",
    registerPlayer: "Player registration",
    secondName: "Second name",
    nickname: "Nickname",
    phone: "Phone",
    submit: "Submit",
    back: "Back",
    tournamentInfo: "Tournament info",
    teamsCount: "Teams",
    playersPerTeam: "Players per team",
    startDate: "Start date",
    endDate: "End date",
    time: "Time",
    days: "Days",
    logo: "Logo",
    draw: "Run draw",
    drawResults: "Draw results",
    team: "Team",
    login: "Login",
    password: "Password",
    logout: "Logout",
    error: "Something went wrong",
    phoneUnique: "This phone is already registered in this tournament",
    needMorePlayers: "Not enough players for the configured draw settings",
  }
} as const;

export function t(lang: Lang) {
  return dict[lang];
}
