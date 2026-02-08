# بطولاتي / Byoolatu (MVP)

هذا مشروع Next.js + Supabase جاهز كبداية لموقع "بطولاتي" مع:
- بطولات
- تسجيل لاعبين (منع تكرار رقم الهاتف داخل نفس البطولة)
- لوحة أدمن: إنشاء بطولة + إجراء القرعة
- عربي + إنجليزي (تبديل من الأعلى)

## 1) تشغيل محلياً
```bash
npm install
cp .env.example .env.local
npm run dev
```

## 2) إعداد Supabase
### الجداول (SQL)
انسخ هذا في Supabase SQL editor:

```sql
-- tournaments
create table if not exists tournaments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  start_date date,
  end_date date,
  time_text text,
  days_text text,
  teams_count int not null check (teams_count >= 2),
  players_per_team int not null check (players_per_team >= 1),
  registration_open boolean not null default true,
  draw_done boolean not null default false,
  created_at timestamp with time zone default now()
);

-- registrations
create table if not exists registrations (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references tournaments(id) on delete cascade,
  second_name text not null,
  nickname text not null,
  phone text not null,
  created_at timestamp with time zone default now()
);

-- منع تكرار رقم الهاتف داخل نفس البطولة
create unique index if not exists registrations_unique_phone_per_tournament
on registrations(tournament_id, phone);

-- draw teams
create table if not exists draw_teams (
  id uuid primary key default gen_random_uuid(),
  tournament_id uuid not null references tournaments(id) on delete cascade,
  team_number int not null,
  created_at timestamp with time zone default now()
);

-- draw team members
create table if not exists draw_team_members (
  id uuid primary key default gen_random_uuid(),
  team_id uuid not null references draw_teams(id) on delete cascade,
  registration_id uuid not null references registrations(id) on delete cascade,
  created_at timestamp with time zone default now()
);

-- (اختياري) تنظيف القرعة عند إعادة القرعة
create or replace function clear_draw(p_tournament uuid)
returns void language plpgsql as $$
begin
  delete from draw_team_members where team_id in (select id from draw_teams where tournament_id = p_tournament);
  delete from draw_teams where tournament_id = p_tournament;
  update tournaments set draw_done = false where id = p_tournament;
end; $$;
```

### التخزين (Storage) للشعارات
- أنشئ Bucket اسمه: `logos` (public)
- أو اجعله private وفعّل policies حسب رغبتك

## 3) متغيرات البيئة
املأ `.env.local` بناءً على `.env.example`.

## 4) النشر على Vercel
- ارفع المشروع على GitHub
- Import Project في Vercel
- أضف ENV vars (مثل .env.local)
- Deploy
- بعدها تقدر تربط الدومين

> ملاحظة أمنية: نظام الأدمن هنا (MVP) بكلمة مرور واحدة. للنسخة النهائية ننقله إلى Supabase Auth أو حسابات متعددة + صلاحيات.
