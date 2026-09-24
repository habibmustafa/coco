# AI agent üçün qısa handoff

Bu mətn yeni agentə layihə kontekstini ötürmək üçündür. Cari istifadəçi tapşırığını yerinə yetir;
buradakı keçmiş işləri yeni tapşırıq və ya təsdiq gözləyən roadmap kimi qəbul etmə.

## Layihə

`coco` (`C:\Users\hmustafazadeh\Desktop\core`) Supabase design system-inin özəl React
kitabxana portudur. Hədəf görünüş və davranış sadiqliyidir. Paket yayımlanmayıb.
React 19, TypeScript, Vite library mode və Tailwind CSS v4 istifadə olunur.

## Mənbə sırası

1. `CLAUDE.md` — cari və məcburi iş qaydaları; təkrarını burada saxlamırıq.
2. `docs/plan.md` — cari vəziyyət və qüvvədə olan qərarlar. Tarixi səbəb lazım olarsa
   `docs/plan-history.md`-də aid qeydə bax; köhnə statusu cari vəziyyət sayma.
3. Hibrid komponentə toxunanda `docs/hybrid-api-migration.md` — Strategy A/B, tip və demo
   qaydaları. Sonra həmin komponentin `src/`, `playground/examples/` kodunu oxu.
4. Yeni portda upstream `packages/ui/index.tsx` və
   `apps/design-system/registry/default/example/<ad>-demo.tsx` ilə public kodu və istifadəsini
   təsdiqlə.

## Cari struktur

- Publish olunan kod: `src/components/atoms/<kateqoriya>/<ad>/`,
  `src/components/fragments/<ad>/`; public giriş `src/index.ts`.
- Nümunələr: `playground/examples/<komponent>/<ad>.tsx`; səhifə və code variant xəritəsi
  `playground/registry.tsx`.
- Stil və token yoxlamaları: `scripts/check-classes.mjs`, `scripts/check-tokens.mjs`.
- Golden HTML testləri: `tests/golden/`; ümumi yoxlama: `npm run verify`.
- 26 komponent hibriddir. Cari siyahı və istisnalar `docs/plan.md`-dədir.
  `Chart` xüsusi, qismən props API-dir;
  Sonner, Calendar, Form və Sidebar üçün süni hibrid wrapper qurulmur.

## İcra ardıcıllığı

Mövcud kodu və aid qərarı yoxla → dəyişikliyi et → lazım olan playground və golden nəticəni
yoxla → `npm run verify` işlət → qərarı və nəticəni həmin turda `docs/plan.md`-ə yaz.
