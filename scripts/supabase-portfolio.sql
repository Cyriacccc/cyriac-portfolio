-- Assistant du portfolio : limite de messages par visiteur et par jour, plafond global,
-- journal anonyme des questions et coordonnées laissées volontairement.
-- (On peut relancer tout le fichier sans risque : « if not exists » et « or replace ».)
-- À exécuter dans le SQL Editor de Supabase (projet du chatbot), AVANT de mettre l'assistant en ligne.

begin;

-- Une ligne par visiteur et par jour (+ une ligne « total » par jour).
-- Le visiteur n'est jamais stocké en clair : c'est une empreinte (hachage) de son adresse IP, qui change chaque jour.
create table if not exists public.portfolio_usage (
  cle  text    not null,
  jour date    not null default current_date,
  nb   integer not null default 0,
  primary key (cle, jour)
);

alter table public.portfolio_usage enable row level security;
grant select, insert, update on public.portfolio_usage to service_role;

-- Vérifie les deux limites, puis compte le message s'il est autorisé.
-- Renvoie { "ok": true, "restants": n } ou { "ok": false, "raison": "visiteur" | "total" }.
create or replace function public.portfolio_compter(p_visiteur text, p_limite_visiteur integer, p_limite_totale integer)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_total    integer;
  v_visiteur integer;
begin
  -- Un seul calcul à la fois, pour que deux messages simultanés ne dépassent pas les limites
  perform pg_advisory_xact_lock(4242);

  select nb into v_total from public.portfolio_usage where cle = 'total' and jour = current_date;
  if coalesce(v_total, 0) >= p_limite_totale then
    return jsonb_build_object('ok', false, 'raison', 'total');
  end if;

  select nb into v_visiteur from public.portfolio_usage where cle = p_visiteur and jour = current_date;
  if coalesce(v_visiteur, 0) >= p_limite_visiteur then
    return jsonb_build_object('ok', false, 'raison', 'visiteur');
  end if;

  insert into public.portfolio_usage (cle, jour, nb) values (p_visiteur, current_date, 1)
  on conflict (cle, jour) do update set nb = public.portfolio_usage.nb + 1
  returning nb into v_visiteur;

  insert into public.portfolio_usage (cle, jour, nb) values ('total', current_date, 1)
  on conflict (cle, jour) do update set nb = public.portfolio_usage.nb + 1;

  return jsonb_build_object('ok', true, 'restants', p_limite_visiteur - v_visiteur);
end;
$function$;

revoke execute on function public.portfolio_compter(text, integer, integer) from public, anon, authenticated;
grant execute on function public.portfolio_compter(text, integer, integer) to service_role;


-- ---------------------------------------------------------------------
-- Les questions posées à l'assistant (anonymes : aucun nom, aucune adresse IP).
-- « visiteur » est l'empreinte du jour : elle permet de regrouper les questions d'une même conversation.
create table if not exists public.portfolio_conversations (
  id         bigint generated always as identity primary key,
  visiteur   text        not null,
  question   text        not null,
  reponse    text        not null,
  date       timestamptz not null default now()
);
alter table public.portfolio_conversations enable row level security;
grant select, insert, delete on public.portfolio_conversations to service_role;


-- ---------------------------------------------------------------------
-- Les coordonnées que des visiteurs ont CHOISI de laisser via l'assistant.
create table if not exists public.portfolio_contacts (
  id         bigint generated always as identity primary key,
  nom        text        not null,
  entreprise text,
  email      text,
  telephone  text,
  message    text,
  date       timestamptz not null default now()
);
alter table public.portfolio_contacts enable row level security;
grant select, insert, delete on public.portfolio_contacts to service_role;


-- ---------------------------------------------------------------------
-- Les pages vues (anonymes : pas de cookies, pas d'adresse IP en clair).
create table if not exists public.portfolio_visites (
  id        bigint generated always as identity primary key,
  visiteur  text        not null,   -- empreinte du jour
  page      text        not null,   -- ex : /projects/dispute-agent
  source    text        not null,   -- d'où vient le visiteur : linkedin.com, google, direct...
  pays      text        not null,   -- code pays fourni par Vercel (FR, CA...)
  appareil  text        not null,   -- ordinateur, téléphone, tablette
  date      timestamptz not null default now()
);
create index if not exists portfolio_visites_date on public.portfolio_visites (date);
alter table public.portfolio_visites enable row level security;
grant select, insert, delete on public.portfolio_visites to service_role;

commit;
