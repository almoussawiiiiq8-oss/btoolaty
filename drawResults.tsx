import { supabase } from "@/lib/supabase";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/i18n";

export default async function DrawResults({ tournamentId, lang }: { tournamentId: string; lang: Lang }) {
  const tr = t(lang);

  const { data: teams } = await supabase
    .from("draw_teams")
    .select("*")
    .eq("tournament_id", tournamentId)
    .order("team_number", { ascending: true });

  const teamIds = (teams ?? []).map((x: any) => x.id);

  const { data: members } = await supabase
    .from("draw_team_members")
    .select("team_id, registrations:registration_id(second_name,nickname,phone)")
    .in("team_id", teamIds);

  const byTeam: Record<string, any[]> = {};
  for (const m of members ?? []) {
    byTeam[(m as any).team_id] = byTeam[(m as any).team_id] ?? [];
    byTeam[(m as any).team_id].push((m as any).registrations);
  }

  return (
    <div>
      <h3 style={{margin: "0 0 10px"}}>{tr.drawResults}</h3>
      <div className="grid">
        {(teams ?? []).map((team: any) => (
          <div className="card" key={team.id} style={{gridColumn:"span 12"}}>
            <div style={{fontWeight: 900, marginBottom: 8}}>{tr.team} {team.team_number}</div>
            <table className="table">
              <thead>
                <tr>
                  <th>{tr.secondName}</th>
                  <th>{tr.nickname}</th>
                  <th>{tr.phone}</th>
                </tr>
              </thead>
              <tbody>
                {(byTeam[team.id] ?? []).map((p: any, idx: number) => (
                  <tr key={idx}>
                    <td>{p?.second_name}</td>
                    <td>{p?.nickname}</td>
                    <td>{p?.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
