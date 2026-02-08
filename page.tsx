import Nav from "@/components/Nav";
import { supabase } from "@/lib/supabase";
import { getLang, t } from "@/lib/i18n";
import type { Tournament, Registration } from "@/lib/types";
import RegisterForm from "./registerForm";
import DrawResults from "./drawResults";

export default async function TournamentPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const lang = getLang(searchParams);
  const tr = t(lang);

  const { data: tourn, error: e1 } = await supabase
    .from("tournaments")
    .select("*")
    .eq("id", params.id)
    .single();

  const tournament = tourn as Tournament | null;

  const { data: regs } = await supabase
    .from("registrations")
    .select("*")
    .eq("tournament_id", params.id)
    .order("created_at", { ascending: true });

  const registrations = (regs ?? []) as Registration[];

  return (
    <div className="container">
      <Nav />
      <div className="card" style={{gridColumn:"span 12"}}>
        {e1 || !tournament ? (
          <>
            <b>{tr.error}</b>
            <div className="muted" style={{marginTop: 6}}>{e1?.message ?? "Not found"}</div>
          </>
        ) : (
          <>
            <div style={{display:"flex", justifyContent:"space-between", gap:12, flexWrap:"wrap"}}>
              <div>
                <div style={{fontWeight: 900, fontSize: 22}}>{tournament.name}</div>
                <div className="muted" style={{marginTop: 6}}>
                  {(tournament.start_date ?? "") ? `${tr.startDate}: ${tournament.start_date}` : ""}{" "}
                  {(tournament.end_date ?? "") ? `• ${tr.endDate}: ${tournament.end_date}` : ""}
                  {(tournament.days_text ?? "") ? ` • ${tr.days}: ${tournament.days_text}` : ""}
                  {(tournament.time_text ?? "") ? ` • ${tr.time}: ${tournament.time_text}` : ""}
                </div>
              </div>
              <div style={{display:"flex", gap:10, alignItems:"center"}}>
                <span className="badge">{tournament.registration_open ? tr.open : tr.closed}</span>
                <span className="badge" style={{background: tournament.draw_done ? "rgba(193,138,99,.18)" : "rgba(95,183,174,.14)"}}>
                  {tournament.draw_done ? tr.drawDone : tr.notDrawn}
                </span>
              </div>
            </div>

            <div className="sep" />

            <div className="formRow three">
              <div className="muted">{tr.teamsCount}: <b>{tournament.teams_count}</b></div>
              <div className="muted">{tr.playersPerTeam}: <b>{tournament.players_per_team}</b></div>
              <div className="muted">{lang === "ar" ? "عدد المسجلين" : "Registered"}: <b>{registrations.length}</b></div>
            </div>

            <div className="sep" />

            {tournament.registration_open && !tournament.draw_done && (
              <RegisterForm tournamentId={tournament.id} lang={lang} />
            )}

            {tournament.draw_done && (
              <DrawResults tournamentId={tournament.id} lang={lang} />
            )}

            {!tournament.registration_open && !tournament.draw_done && (
              <div className="muted">{lang === "ar" ? "التسجيل مغلق حالياً." : "Registration is currently closed."}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
