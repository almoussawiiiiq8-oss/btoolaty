"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";
import { getLang, t } from "./lib/i18n";

export default function Nav() {
  const sp = useSearchParams();
  const pathname = usePathname();
const lang = getLang();
const tr = t;

  const nextLang = lang === "ar" ? "en" : "ar";
  const hrefWithLang = (href: string) => `${href}${href.includes("?") ? "&" : "?"}lang=${lang}`;
  const switchHref = `${pathname}?lang=${nextLang}`;

  return (
    <div className="nav">
      <div className="brand">
        <img src="/logo.jpeg" alt="Byoolatu logo" style={{width:40,height:40,borderRadius:12,border:"1px solid rgba(0,0,0,.08)",objectFit:"cover"}} />
        <div>
          <div style={{fontWeight: 900, lineHeight: 1.1}}>
            {tr.title} <span className="muted" style={{fontWeight: 700}}>/ {tr.appNameEn}</span>
          </div>
          <div className="muted" style={{fontSize: 12}}>
            {lang === "ar" ? "منصة البطولات والقرعة" : "Tournaments & draws platform"}
          </div>
        </div>
      </div>

      <div style={{display:"flex", gap:10, alignItems:"center"}}>
        <Link className="btn secondary" href={hrefWithLang("/")}>{tr.tournaments}</Link>
        <Link className="btn secondary" href={hrefWithLang("/admin")}>{tr.admin}</Link>
        <Link className="btn" href={switchHref}>{lang === "ar" ? "EN" : "عربي"}</Link>
      </div>
    </div>
  );
}
