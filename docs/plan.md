# Plan — cari vəziyyət və qərarlar

> Son yenilənmə: 2026-09-24. Bu fayl cari qərarların qısa mənbəyidir.
> Tam qərar, düzəliş və icra jurnalı [plan-history.md](plan-history.md)-də saxlanılır.
> Köhnə qeydlə cari qərar toqquşanda cari qərar əsas götürülür. Yeni qərarı və görülən işi
> **eyni turda** burada qeyd et; tarixi arxivi geriyə dönük dəyişmə.

## Vəziyyət

`coco` Supabase design system-inin Apache-2.0 əsaslı, hələ yayımlanmayan React kitabxana
portudur. Atom və fragment turları tamamlanıb. 26 komponent hibriddir; uyğun komponentlər
eyni importdan props-driven və compound API verir. `Chart` yalnız bar chart üçün ayrıca,
qismən props API alıb. Beş layout primitivi (`Box`, `Container`, `Flex`, `Grid`, `Stack`)
coco əlavəsidir, upstream portu deyil.

Playground route-ları `/components/<id>` formatındadır. Komponent siyahısı, route-lar və
kod nümunələri `playground/registry.tsx`-də idarə olunur. 82 hibrid nümunə
`Props-driven`/`Compound` kod cütü göstərir; `Preview` props rejimini render edir.
Son `npm run verify` nəticəsi: build, lint, class/token yoxlamaları və **294 test** keçib.
Bu nəticə növbəti dəyişikliyin baseline-ıdır; yeni işdən sonra yenidən yoxla.

## Qüvvədə olan qərarlar

| Mövzu | Cari qərar | Tarixi iz |
|---|---|---|
| Məqsəd | Upstream ilə eyni görünüş və davranış; mövcud hibriddə mənbə kodunun bayt-bayt eyniliyi tələb olunmur. Sadiqlik golden HTML və davranış testləri ilə yoxlanır. | #13, #20–21, #26 |
| Paket | Vite library mode, `private: true`, React 19, Tailwind v4; runtime asılılıqları build-də external. | #1–3, #9–10 |
| Struktur | Atomlar `src/components/atoms/<kateqoriya>/<ad>/`, fragmentlər `src/components/fragments/<ad>/`; `src/index.ts` public girişdir. | #4–7, #14–16 |
| Tema | Default light; System/Dark/Light `ThemeProvider` ilə. `src/styles/vendor/theme/` dəyərləri dəyişdirilmir. | #8, #11, düzəlişlər jurnalı |
| Playground | Nümunələr `playground/examples/<komponent>/`-dədir; registry route, nav və nümunələr üçün tək mənbədir. Kod render olunan faylın mənbəyindən alınır. | #17–19, #28, #39 |
| Hibrid API | Yalnız mənalı Root + hissələri olan komponent hibriddir. Strategy A ayırd edici prop-dan, Strategy B ayrıca compound root-dan istifadə edir. Props `<Component />`, compound `<Component.Root><Component.Child /></Component.Root>` yazılır; named export-lar qalır. | #20, #22–25, #40–43 |
| Hibrid tiplər | `content`/`title` üçün `HTMLAttributes` kolliziyasını `Omit` ilə həll et; namespace-dəki hər hissənin prop tipini export et (`TS4023`). Hook-ları şərtsiz çağır. | #29–32 |
| Layout | Beş coco layout primitivi və responsive props literal `layout-classes.ts` cədvəlindən class götürür; dinamik Tailwind adı qurulmur. | #37–38 |
| Agent sənədləri | `CLAUDE.md` aktiv qaydalar, `docs/codex-prompt.md` qısa handoff, `docs/hybrid-api-migration.md` texniki hibrid bələdçidir. | #44 |

İcra qaydaları [CLAUDE.md](../CLAUDE.md)-də, hibrid strategiya və tiplər
[hybrid-api-migration.md](hybrid-api-migration.md)-dədir. Bu fayl həmin qaydaları təkrarlamır.

## Hibrid komponentlərin cari siyahısı

- **Atomlar (23):** Accordion, Alert, AlertDialog, Avatar, Breadcrumb, Card, Collapsible,
  Command, Dialog, Drawer, DropdownMenu, HoverCard, InputOTP, Popover, RadioGroup,
  RadioGroupCard, RadioGroupStacked, Resizable, Select, Sheet, Table, Tabs, Tooltip.
- **Fragmentlər (3):** DatePicker, MetricCard, MultiSelector.

Sonner və Calendar tək props API-dir; Form `react-hook-form`-a bağlı hissələr sistemidir;
Sidebar app-shell kompozisiyasıdır. Bu dördü üçün süni hibrid wrapper qurulmur.
`ChartContainer` ümumi compound root deyil, buna görə `Chart` yalnız məhdud bar-chart
props API-si kimi qalır. Digər flat komponentlərə də ikinci rejim əlavə edilmir.

## Açıq işin sərhədi

Təsdiqlənmiş yeni port və ya miqrasiya fazası yoxdur. `FilterBar`/`CommandMenu` kimi iri,
Supabase-ə bağlı bloklar ayrıca qərar tələb edir. Tək nümunəsi olan komponentlər üçün
əlavə demolar istənilsə, onlar upstream portu yox, coco nümunəsi kimi işarələnməlidir.
Cari tapşırığı istifadəçi mesajından götür; arxivdəki köhnə roadmap-u tapşırıq sayma.

## Son qərar — #45 (2026-09-24)

Əvvəlki təxminən 11 min sözlük `plan.md` tam şəkildə `docs/plan-history.md`-ə köçürüldü;
əsas fayl cari vəziyyət, qüvvədə olan qərarlar və açıq iş sərhədi ilə məhdudlaşdırıldı.
Tarixi qərarlar silinmədi. Yeni agent əvvəl bu qısa faylı oxuyur, yalnız tapşırığa aid
tarixi səbəb lazım olduqda arxivə baxır. Bu sənəd dəyişikliyi komponent API-sini və iş
standartlarını dəyişmir.
Son `npm run verify` yaşıl: build, lint, class/token yoxlamaları və 294 test keçdi.
