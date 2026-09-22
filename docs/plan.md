# Plan və iş jurnalı

> Canlı sənəd. Hər qərar, düzəliş və tamamlanan iş buraya yazılır.
> Son yenilənmə: 2026-09-22 · Status: Faza 0-4 tamamlanıb (25 atom komponent).

## Məqsəd
Supabase-in açıq-mənbə design system-ini (`supabase.com/design-system`) React komponent paketi
kimi portlamaq. Vizual nəticə **birəbir** olmalıdır — approksimasiya deyil. Mənbə:
`github.com/supabase/supabase` (Apache-2.0): komponentlər `packages/ui`, tokenlər
`packages/config` + `packages/ui/build/css`, saytın demo faylları
`apps/design-system/registry/default/example/`.

---

## Qərarlar jurnalı

| # | Qərar | Səbəb |
|---|---|---|
| 1 | Vite **library mode**, monorepo yox | Workspace mürəkkəbliyi olmadan eyni nəticə; `vite dev` `build.lib`-i nəzərə almadığı üçün tək config kifayətdir |
| 2 | **Tailwind v4** (`@tailwindcss/vite`) | Upstream özü v4-ə keçib, CSS-first config (`@theme`) ilə tokenləri birbaşa götürmək mümkündür |
| 3 | Hələlik **publish yox**, `private: true` | İstifadəçi qərarı; `exports`/`files`/`sideEffects` yenə də publish-hazır formatdadır |
| 4 | Playground `src/`-dən **ayrı qovluqda** | `src/` yalnız publish olunan kod qalsın; demo faylları type declaration-lara qarışmasın |
| 5 | Fayl adları **lowercase kebab-case** | Windows case-insensitive, Linux/CI case-sensitive — PascalCase fayl adları CI-da sınan import bug-ları yaradır |
| 6 | **Kateqoriya qovluqları** (`actions`, `forms`, `layout`, `feedback`, `overlay`, `data-display`, `navigation`) | Kitabxana 60+ komponentə böyüyəcək; flat struktur o miqyasda dağılır |
| 7 | **Feature-folder struktur rədd edildi** | Feature-folder biznes domenlərinə görə bölünən *tətbiqlər* üçündür; komponent kitabxanasında təbii bölgü komponent tipidir |
| 8 | Default tema **light**, dark tam dəstəklənir | İstifadəçi seçimi (Supabase özü dark-first olsa da) |
| 9 | `cn()` = `clsx` + `tailwind-merge` (`extend.theme.spacing: ['card','content']`) | Upstream-in `cn` npm paketi ilə funksional olaraq eyni nəticə, bir asılılıq az |
| 10 | Runtime asılılıqları build-də **external** | Radix bundle-a düşəndə paket 213 kB olurdu → external ilə 35 kB (gzip 8.8 kB); consumer tək nüsxə resolve edir |
| 11 | Tema: **3 seçim** (System/Dark/Light), localStorage-da saxlanılır | Upstream `singleThemes` ilə eyni; `next-themes` asılılığı olmadan öz provider-imiz |
| 12 | `textarea.tsx` götürüldü, `text-area.tsx` yox | Upstream-in özü `text-area.tsx`-i "legacy, prefer Textarea" kimi işarələyib |
| 13 | Portlama artıq **skript ilə** aparılır (curl + `sed` ilə import path əvəzi) | Əl ilə köçürməkdə transkripsiya səhvi riski var; skript byte-exact nəticə verir |
| 14 | Kateqoriya bölgüsü: Badge/Alert/Skeleton/Progress → `feedback`, Separator/AspectRatio → `layout`, Avatar → `data-display` | Ant Design tipli taksonomiyaya uyğun; Badge status göstəricisi olduğu üçün feedback-dədir |
| 15 | **Atom / fragment bölgüsü**: `components/atoms/<kateqoriya>/<ad>/` və `components/fragments/<ad>/` | Upstream-in paket bölgüsünü əks etdirir (`packages/ui` = atoms, `packages/ui-patterns` = fragments); design-system saytı da naviqasiyasını belə qurur |
| 16 | Fragmentlər **kateqoriyasız (flat)** | Upstream-in fragment siyahısı da flat-dır; fragmentlər atomlardan qurulan hazır bloklardır, tip üzrə bölgü onlara uyğun gəlmir |
| 17 | Demo-lar `playground/examples/` altında **ayrı fayllar**, kod nümunəsi `import.meta.glob(..., '?raw')` ilə həmin faylın öz mənbəyindən göstərilir | Render olunan kod ilə göstərilən kod eyni fayldır — nümunə heç vaxt köhnələ bilmir; yeni fayl əlavə edilən kimi avtomatik görünür |
| 18 | Sintaksis rəngləndirmə **Shiki** ilə, tema rəngləri `var(--code-token-*)` | Shiki v4 tema rənglərində CSS dəyişənini qəbul edir (yoxlanılıb) → kod bloku tema dəyişəndə yenidən highlight edilmədən özü uyğunlaşır; rənglər Supabase-in `code-block-variables.css`-indən gəlir |
| 19 | Nümunə mənbəyində `'../../src'` → `'core'` əvəzlənir | Fayl işlək qalır, amma istifadəçi paket adı ilə realistik import görür |

---

## Düzəlişlər jurnalı (səhv getdi → düzəldildi)

1. **Plan əvvəlcə approksimasiya idi** — Supabase rəngləri/radius-u yaddaşdan təxmin edilmişdi.
   → Repo açıq-mənbə olduğu üçün real token CSS-i və real komponent kodu götürüldü.
2. **Səhv Button portlandı** — `shadcn/ui/button.tsx` götürülmüşdü (6 variant, sadə).
   → `packages/ui/index.tsx` göstərdi ki, public `Button` = `src/components/Button/Button.tsx`
   (9 variant, tiny→xlarge, loading/icon/iconRight/block/rounded); shadcn versiyası orada yalnız
   `Button_Shadcn_` aliasıdır. `Input` və `Card` isə həqiqətən shadcn versiyalarıdır.
3. **"Lazım deyil" deyilən CSS faylları lazım çıxdı** — `focus-ring` → `utilities.css`,
   `--card-padding-x` → `global.css`, `dark:` variantı → `variants.css`,
   Select animasiyaları → `tw-animate-css`. Hamısı əlavə edildi.
4. **Base layer buraxılmışdı** — tipoqrafiya və base qaydalar `packages/config`-də yox,
   `apps/design-system/styles/globals.css`-dədir. Onsuz: Tailwind v4-ün default border rəngi
   `currentColor` olduğuna görə hər bare `border` (Card, SelectContent) mətn rəngində render
   olunurdu; şrift şkalası da fərqli idi. → `design-system-base.css` kimi vendor edildi.
5. **Font haqqında yanlış qeyd** — "Circular lisenziyalıdır, Inter əvəzedicidir" yazılmışdı.
   → Design-system saytı elə özü Inter render edir (`--font-sans: var(--font-inter), Inter, …`),
   mono üçün Source Code Pro. Yəni Inter əvəzedici deyil, düz seçimdir.
6. **`vite-plugin-dts` API dəyişikliyi** — `rollupTypes` v5-də `bundleTypes` olub və
   `@microsoft/api-extractor` tələb edir.
7. **Windows fayl kilidi** — dev server işləyərkən `mv` ilə qovluq köçürmək "Permission denied"
   verir. Həlli: əvvəlcə dev server-i dayandır, sonra PowerShell `Move-Item` işlət (Git Bash `mv`
   bu halda yenə uğursuz olur).
9. **Playground strukturu upstream-dən fərqli idi** — tokenlər üst-üstə düşsə də səhifə
   eyni görünmürdü. Saytın öz CSS bundle-ı çəkilib müqayisə edildi: 620 ortaq CSS dəyişənindən
   yalnız 3-ü fərqlənirdi (font stack-inin yazılışı), yəni problem **layout**-da idi.
   Saytın HTML-indən çıxarılan real ölçülər tətbiq olundu: header `h-10`, aside `top-10`
   + `min-w-[220px] py-6 lg:py-8`, h1 `text-4xl`, açıqlama `text-lg text-foreground-light`,
   bölmə başlıqları `font-heading … border-b pb-2 text-2xl`, preview paneli
   `min-h-[256px] p-10` + **nöqtəli radial-gradient fon** (maskalı), kod bloku isə tab-da yox,
   panelin **altında birləşik** (`rounded-b-md`, 196px-ə kəsilmiş, Expand düyməsi ilə).
   Fon üçün `bg-studio` istifadə olunur.
10. **Tabs-ın başlıqları bir-birinə girirdi** — upstream `TabsTrigger`-də üfüqi padding
    yoxdur, boşluq istifadə yerindən gəlir: onların öz nümunəsində `TabsList` `grid w-full
    grid-cols-N` alır, siyahının içinə isə `<TabsIndicator />` qoyulur (animasiyalı alt xətt).
    Bizim istifadədə hər ikisi yox idi. Düzəliş: `tabs-demo` upstream nümunəsi kimi
    `grid-cols-3` + `TabsIndicator`, playground-un öz tabları isə `gap-5` + `TabsIndicator`.
    Kod nümunəsi yenə tab-dadır (preview/code), panel dizaynı isə dəyişmir.
8. **Shiki teması səssizcə işləmirdi** — kod rəngsiz görünürdü. Səbəb: TS xətasını susdurmaq
   üçün əlavə edilən `settings: []`. Shiki əvvəlcə `settings`-ə baxır və yalnız o **yoxdursa**
   `tokenColors`-a keçir; boş massiv truthy olduğu üçün bütün qaydalar atılırdı. Həlli: qaydalar
   `settings`-də saxlanılır, `tokenColors` ümumiyyətlə işlədilmir.

---

## Struktur

```
core/
├── CLAUDE.md                      # iş qaydaları (hər sessiyada avtomatik yüklənir)
├── docs/plan.md                   # bu fayl
├── playground/                    # dev-only design-system tipli demo sayt
│   ├── main.tsx                   # ThemeProvider wrap
│   ├── app.tsx                    # sidebar nav + komponent bölmələri
│   ├── docs.tsx                   # Section / Preview / Swatch
│   └── theme-switcher.tsx         # System / Dark / Light
├── index.html                     # Inter + Source Code Pro, no-flash tema script-i
├── src/
│   ├── index.ts                   # public entry
│   ├── styles/
│   │   ├── globals.css            # upstream import zənciri
│   │   └── vendor/supabase/       # 12 vendored CSS + NOTICE.md
│   ├── lib/                       # utils (cn), constants, get-explicit-tab-index
│   ├── providers/                 # theme-provider, single-themes
│   └── components/
│       ├── atoms/                 # packages/ui → "Atom components"
│       │   ├── actions/button/
│       │   ├── data-display/avatar/
│       │   ├── feedback/{alert,badge,progress,skeleton}/
│       │   ├── forms/{input,label,textarea,checkbox,switch,radio-group,select}/
│       │   ├── layout/{card,separator,aspect-ratio}/
│       │   └── navigation/ overlay/          # boş
│       └── fragments/             # packages/ui-patterns → "Fragment components" (hələ boş)
├── vite.config.ts
└── package.json
```

---

## Tamamlanmış işlər

- **Faza 0 — İnfrastruktur**: Vite library mode (es+cjs, `cssFileName: styles`),
  `@tailwindcss/vite`, `vite-plugin-dts` (`bundleTypes` + api-extractor), package.json
  `exports`/`sideEffects`/`peerDependencies`, playground ayrıldı, default Vite demo silindi.
- **Token sistemi**: 12 CSS faylı byte-exact vendor edildi (OKLCH semantic sistemi, Radix
  rəng skalaları, light/dark tema girişləri, Tailwind `@theme` mapping-i, utilities, variants,
  base, design-system tipoqrafiyası) + `NOTICE.md`.
- **Faza 1**: Button (real versiya), Input, Card.
- **Tema**: `ThemeProvider` + `useTheme` + `singleThemes`; localStorage persist, `matchMedia`
  ilə canlı system izləmə, tab-lar arası sync, no-flash inline script.
- **Faza 2 — Forms**: Label, Textarea, Checkbox, Switch, Radio Group (+LargeItem),
  Select (+SelectTrigger/ComboboxTrigger).
- **Faza 3 — Feedback/display**: Badge, Alert (+Title/Description), Skeleton, Progress
  (→ `feedback/`), Separator, Aspect Ratio (→ `layout/`), Avatar (+Image/Fallback)
  (→ `data-display/`). Yeni asılılıq tələb etmədi.
- **Atom/fragment bölgüsü**: `components/atoms/` və `components/fragments/`.
- **Playground**: sticky header + sidebar nav, 16 komponent bölməsi, Colors və Typography
  bölmələri. Hər demo üçün **Preview / Code tabları** — kod `playground/examples/*.tsx`
  faylının öz mənbəyindən (`?raw`) gəlir, Shiki ilə rənglənir (`var(--code-token-*)` ilə
  tema-uyğun), copy düyməsi var. 24 nümunə faylı.

- **Faza 4 — Overlay**: Dialog, Sheet, Popover, Dropdown Menu, Tooltip, Hover Card
  (→ `overlay/`), Accordion, Collapsible (→ `data-display/`), Tabs (+`useTabIndicator`)
  (→ `navigation/`). `animations.css` vendor edildi (`animate-accordion-*`, `animate-overlay-*`
  keyframe-ləri oradadır). Popover öz `popover.module.css`-i ilə gəlir. Yeni npm asılılığı yox.
- Playground-un Preview/Code tabları artıq **öz `Tabs` komponentimizlə** işləyir (dogfooding).

**Cari ölçülər:** `dist/core.js` 82.9 kB (gzip 16.3 kB), `dist/styles.css` 99.8 kB (gzip 19.2 kB),
111 public export, 25 atom komponent, 33 playground nümunəsi.
Shiki yalnız playground-dadır, library bundle-ına düşmür.

---

## Növbəti fazalar

### Atomlar (`packages/ui/src/components/shadcn/ui/`)
- **Faza 5 — Ağır/3rd-party**: Table, Command (`cmdk`), Drawer (`vaul`), Sonner,
  Calendar (`react-day-picker`), Chart (`recharts` + `charts.css`), Form (`react-hook-form`),
  Sidebar, Resizable, Input OTP.

### Fragmentlər (`packages/ui-patterns/src/`)
Atomlar hazır olandan sonra. Upstream-də mövcud olanlardan bizim üçün ən uyğunları:
Admonition, `collapsible-alert.tsx`, CollapsibleCardSection, `form/` (FormItemLayout),
`info-tooltip.tsx`, `multi-select/`, DataInputs, EmptyStatePresentational, ErrorDisplay,
FilterBar, InnerSideMenu, MetricCard, PageBreadcrumbs/Container/Header/Nav/Section,
ShimmeringLoader, SkipToContent, StatusCode, Toc, TimestampInfo, DatePicker, CodeBlock.

Qeyd: bir çox fragment Supabase-ə spesifik məzmun daşıyır (ConsentToast, PromoToast,
TweetCard, SqlToRest, McpUrlBuilder, PrivacySettings) — onlar portlanmır.

**Faza iş axını:** `packages/ui/index.tsx`-dən doğru mənbəni təsdiqlə → faylı çək, yalnız import
path-larını dəyiş → kateqoriya qovluğu + `index.ts` → `src/index.ts`-ə əlavə et → playground
bölməsi → `tsc` + build + CSS-də class yoxlaması → bu faylı yenilə.

---

## Verifikasiya

```
npm run dev      # playground → http://localhost:3000 (məşğuldursa növbəti port)
npm run verify   # build:lib + lint + check:classes + check:tokens
npx tsc -b       # tip yoxlaması
```

### Style səhvlərinə qarşı avtomatik yoxlama
İndiyə qədərki bütün dizayn fərqləri eyni iki səbəbdən yaranmışdı — hər ikisi indi skriptlə tutulur:

- **`scripts/check-classes.mjs`** — `src/` və `playground/` içində işlədilən hər utility class-ın
  `dist/styles.css`-də qarşılığı olub-olmadığını yoxlayır. Qarşılığı olmayan class səssizcə
  stilsiz render olunur. Bu yolla `hit-area-6` tapıldı (Dialog/Sheet-in bağlama düyməsinin
  toxunma sahəsi — `hit-area.css` vendor edilməmişdi). Səs-küyü azaltmaq üçün nümunə fayl
  adları və bir neçə demo id-si filtrdədir; siyahını qısa saxla ki, real tapıntı gözə dəysin.
- **`scripts/check-tokens.mjs`** — canlı `supabase.com/design-system` saytının CSS bundle-ını
  çəkib bizim tokenlərlə müqayisə edir (yalnız `:root`/`.light`/`.dark`/`[data-theme]` blokları;
  utility-daxili dəyişənlər — `--hit-area-*`, `--tw-*` — istifadəyə görə dəyişdiyi üçün
  müqayisədən kənardır). Font stack-indəki bilinən fərq `EXPECTED_DIFFERENCES`-dədir.
  **Hazırkı vəziyyət: 546 ortaq token, fərq yoxdur.**

### Üçüncü qayda (skriptlə tutulmur)
Komponenti portlayanda upstream-in öz istifadə nümunəsini də götür:
`apps/design-system/registry/default/example/<ad>-demo.tsx`. Komponent faylı tək başına
kifayət etmir — məsələn `TabsTrigger`-in padding-i yoxdur, boşluq `TabsList`-in `grid-cols-N`-i
ilə gəlir və `<TabsIndicator />` ayrıca əlavə olunmalıdır.

---

## Başqa agentə ötürmə

`docs/codex-prompt.md` — ChatGPT Codex (və ya başqa kod agenti) üçün tam brifinq: layihənin
məqsədi, stack, struktur, portlama qaydası, ödənilmiş tələlər, yol xəritəsi və açıq məsələlər.
Yeni komponent və ya qərar əlavə olunanda onu da yenilə.

---

## Açıq məsələlər

- **Gözlə vizual təsdiq edilməyib** — sessiyada brauzer aləti yox idi. Token və class
  səviyyəsində yoxlanılıb (yuxarıdakı skriptlər), amma yan-yana baxış istifadəçidədir.
- README hələ default Vite şablon mətnidir.
- Test yoxdur (upstream-də `*.test.tsx` var, portlanmayıb).
- `dark:`-in `data-theme` tələbi library istifadəçiləri üçün sənədləşdirilməlidir.
