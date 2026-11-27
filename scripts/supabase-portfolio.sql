-- Assistant du portfolio : limite de messages par visiteur et par jour, et plafond global.
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

commit;
