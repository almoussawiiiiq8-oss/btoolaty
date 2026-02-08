"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export default function RegisterForm({ tournamentId, lang }: { tournamentId: string; lang: Lang }) {
  const tr = t(lang);
  const [secondName, setSecondName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setMsg(null);
    setLoading(true);
    try {
      const { error } = await supabase.from("registrations").insert({
        tournament_id: tournamentId,
        second_name: secondName.trim(),
        nickname: nickname.trim(),
        phone: phone.trim(),
      });
      if (error) {
        // Unique violation
        if ((error as any).code === "23505") setMsg(tr.phoneUnique);
        else setMsg(error.message);
      } else {
        setMsg(lang === "ar" ? "تم التسجيل ✅" : "Registered ✅");
        setSecondName(""); setNickname(""); setPhone("");
        // Refresh page data
        window.location.reload();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 style={{margin: "0 0 10px"}}>{tr.registerPlayer}</h3>
      <div className="formRow two">
        <div>
          <label className="muted">{tr.secondName}</label>
          <input className="input" value={secondName} onChange={(e) => setSecondName(e.target.value)} placeholder={lang==="ar" ? "مثال: الحربي" : "e.g. Alharbi"} />
        </div>
        <div>
          <label className="muted">{tr.nickname}</label>
          <input className="input" value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder={lang==="ar" ? "مثال: أبو فهد" : "e.g. ProPlayer"} />
        </div>
      </div>
      <div className="formRow" style={{marginTop: 10}}>
        <div>
          <label className="muted">{tr.phone}</label>
          <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={lang==="ar" ? "05xxxxxxxx" : "+9665xxxxxxx"} />
        </div>
      </div>

      <div style={{display:"flex", gap:10, alignItems:"center", marginTop: 12}}>
        <button className="btn" onClick={submit} disabled={loading || !secondName.trim() || !nickname.trim() || !phone.trim()}>
          {loading ? (lang==="ar" ? "جارٍ..." : "Loading...") : tr.submit}
        </button>
        {msg && <span className="muted">{msg}</span>}
      </div>
    </div>
  );
}
