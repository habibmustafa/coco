# Plan və iş jurnalı

> Canlı sənəd. Hər qərar, düzəliş və tamamlanan iş buraya yazılır.
> Son yenilənmə: 2026-09-22 · Status: Faza 0-4 tamamlanıb, Faza 5 davam edir (33 atom komponent).
> Hybrid API miqrasiyası (`docs/hybrid-api-migration.md`) **tamamlandı**: 17 atomun hamısı
> (Dialog, Sheet, Drawer, Tooltip, Popover, HoverCard, DropdownMenu, Tabs, Accordion,
> Collapsible, Select, RadioGroup, Command, Card, Alert, Avatar, Table) həm compound, həm
> props-driven API təqdim edir. Playground `examples/` qovluq-per-komponent restruktur edilib.
> Qalan Faza 5 atomları (Sonner, Calendar, Chart, Form, Sidebar, Resizable, Input OTP) hələ
> hibridləşdirilməyib — Resizable və Input OTP hələ portlanmayıb da.

## Məqsəd
Supabase-in açıq-mənbə design system-ini (`supabase.com/design-system`) React komponent paketi
kimi portlamaq. Vizual nəticə **birəbir** olmalıdır — approksimasiya deyil. Mənbə:
`github.com/supabase/supabase` (Apache-2.0): komponentlər `packages/ui`, tokenlər
`packages/config` + `packages/ui/build/css`, saytın demo faylları
`apps/design-system/registry/default/example/`.

---

## Qərarlar jurnalı

### coco adı və vizual kimlik — 2026-09-22

İstifadəçinin qərarı ilə layihə `coco` adlandırıldı. Paket, lockfile, build çıxışları,
HTML başlığı, playground loqosu və göstərilən import nümunələri yeniləndi.
`public/coco-logo.svg`, `public/coco-mark.svg` və temaya uyğun favicon hazırlandı.
README istifadə təlimatı ilə əvəzləndi; brend qaydaları `docs/brand.md`-dədir.
Fiziki workspace yolu hələ `C:\Users\hmustafazadeh\Desktop\core`-dur.
Reload zamanı scroll bərpası söndürülür və URL ankeri təmizlənir ki, playground
yuxarıdan açılsın. Adi bölmə keçidləri və birbaşa anker linkləri saxlanılır.

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
| 19 | Nümunə mənbəyində `'../../src'` → `'coco'` əvəzlənir | Fayl işlək qalır, amma istifadəçi paket adı ilə realistik import görür |
| 20 | Hybrid API miqrasiyası başladı: hər uyğun atom eyni vaxtda həm compound, həm props-driven API təqdim edəcək (`docs/hybrid-api-migration.md`) | Consumer-lər üçün sürətli, minimal-boilerplate istifadə (`<Tabs items={...} />`) compound-un tam kontrolunu itirmədən |
| 21 | "Eyni" indi dizayn+davranışdır, mənbə kodu deyil — byte-exact upstream sinxronu (qərar #13) mövcud atomlar üçün artıq hədəf deyil | Hibrid layer atomların öz sahibliyinə keçməsini tələb edir; sadiqlik indi golden markup testləri ilə sübut olunur, fayl müqayisəsi ilə yox |
| 22 | Strategy A (əlavə edilən data prop-lu discriminated union root) vs Strategy B (adı dəyişdirilən root): Dialog/Sheet/Drawer → B (`*Root`); Tooltip/Popover/HoverCard/DropdownMenu/Tabs/Accordion/Collapsible/Select/RadioGroup/Command/Card/Alert/Avatar/Table → A | Overlay-lərdə `open`+`children` prop mode ilə compound mode arasında birmənalı ayırd edici yoxdur (səhv təxmin görünməz sınmış UI verir); qalanlarda data prop compound root-da heç vaxt mövcud olmayıb |
| 23 | Collapsible → Strategy A, discriminator `trigger` (+ `content`, opsional `visible`) | Kök prop-larında (`open/defaultOpen/onOpenChange/disabled`) nə `trigger`, nə `content` var — qeyri-müəyyənlik yoxdur |
| 24 | Card → Strategy A, discriminator: `title`/`description`/`footer`/`headerAction`-dan hər hansı biri veriləndə props rejimi | Bu 4 prop native `HTMLAttributes<div>`-də yoxdur (aşağıda #29-a bax: `title` təkbaşına kolliziya yaradırdı, buna görə union-da ayrıca Omit edildi). Upstream-də ayrıca `card-demo.tsx` yoxdur — default render yerli `card-demo.tsx`-dəki istifadədən götürüldü |
| 25 | Alert → Strategy A, discriminator: `title`/`description`-dan hər hansı biri | `description` kolliziya yaratmır, amma `title` native `HTMLAttributes`-də var (#29) — Omit edilib |
| 26 | Golden markup testləri (`vitest` + `jsdom` + `@testing-library/react` + `@testing-library/user-event`) sadiqlik təminatı kimi əlavə olundu, `tests/golden/` | Mənbə artıq byte-exact olmadığı üçün render olunan DOM-un dəyişməzliyi bilavasitə test edilməlidir |
| 27 | Dəyişdirilən hər fayla Apache-2.0 §4(b) tələb etdiyi modifikasiya başlığı əlavə olundu, `NOTICE.md` yeniləndi | Lisenziya tələbi |
| 28 | Playground nümunələri `playground/examples/<ad>.tsx` (flat) → `playground/examples/<komponent>/<ad>.tsx` (qovluq-per-komponent) restruktur edildi | İstifadəçi tələbi — 43 fayl bir qovluqda az strukturlu görünürdü. `component-preview.tsx`, `tests/golden/golden.test.tsx`, `scripts/check-classes.mjs` `**/*.tsx` rekursiv glob-a keçdi, nümunə adları (`name` prop) dəyişmədi — basename ilə axtarılır |
| 29 | **Native `HTMLAttributes` kolliziyaları** — bir neçə komponentin content prop adı (`content`, `title`) React-ın `HTMLAttributes`-ində artıq mövcuddur (`content` — RDFa dəstəyi, `title` — tooltip mətni). `Omit<RootProps, 'children'>`-ə etibar etmək kifayət etmir, `content`/`title`-ı da açıq-aydın Omit etmək lazımdır | Kolliziya olanda TS xətası deyil, qəribə görünən `string & ReactPortal` tipli birləşmə xətası verir (Collapsible, Card, Alert-də tapıldı) — gələcək komponentlərdə eyni tələ gözlənilir, bax bölmə 6.1 |
| 30 | Çox-sahəli (`\|\|`) discriminator olan branch-larda TS avtomatik daralmır — compound branch-a spread edərkən `props as CompoundProps` cast lazımdır (Alert, Card) | TS yalnız TƏK sahə üzərində `!== undefined` yoxlamasını dar tipə çevirə bilir, bir neçə sahənin OR-u ilə yox |
| 31 | `Object.assign(Hybrid, { … })` namespace-i qurarkən əlavə olunan hər part-ın prop tipi (`RadioGroupLargeItemProps`, `TableRootProps`, `TableHeadSortProps`, `CommandDialogProps`) **export edilməlidir** | api-extractor bundle .d.ts qurarkən həmin tipi adlandıra bilmirsə build sınır (`TS4023`); part faylında unexported interface qalıbsa, namespace-ə əlavə olunan kimi üzə çıxır |
| 32 | Collapsible-in hibrid komponentində `useControllableState` şərti (`if` branch-dan sonra) çağırılırdı — React-ın rules-of-hooks-unu pozurdu | `oxlint` bunu error kimi tutdu (warning yox); həll: hook-u həmişə çağır, nəticəni yalnız trigger-mode branch-ında istifadə et |
| 33 | İstifadəçinin sorğusu ilə 4 hibrid komponentə əlavə edilən variant/rejim tapıldı: Select `groups` (flat `options`-a əlavə, qarşılıqlı istisna edici), RadioGroup `options[].variant: 'large'` (`RadioGroupLargeItem`-ə map olunur), Command `groups`-un `CommandDialog`-a da köçürülməsi | Əvvəlki turlarda "spekulyativ olmasın" deyə saxlanılan scope-lar (Select groups, RadioGroupLargeItem, CommandDialog) real istifadəçi tələbi ilə açıq şəkildə əsaslandırıldı |
| 34 | `CommandDialog` `command-parts.tsx`-dən `command.tsx`-ə (hibrid fayl) köçürüldü | `CommandDialog`-un `groups` rejimi `CommandHybrid`-i çağırır — `command-parts.tsx`-də qalsaydı `command.tsx` ↔ `command-parts.tsx` arasında circular import yaranardı |
| 35 | `Chart` — tam hibrid deyil, dar məqsədli **əlavə** komponentdir (`chart-props.tsx`, yeni fayl, `chart.tsx` toxunulmadı): yalnız bar chart, `data`+`series`+`xKey` | `ChartContainer`-in "root"-u heç vaxt olmayıb (uyğun rename/discriminator yoxdur) və tərkibi arbitrary Recharts JSX-dir — ümumi charting API-si yazmaq CLAUDE.md-ə zidd olardı; ona görə yalnız upstream-in tək istinad etdiyi bar-chart formasına dar API verildi, `ChartContainer` compound yol olaraq qalır |

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
11. **Golden test normalizasiyası Radix ID-lərini tutmurdu** — ilk baseline-da regex köhnə
    React `useId` formatını (`:r0:`) axtarırdı, amma React 19 + Radix bu layihədə
    `radix-_r_p_` (alt xətt ilə, iki nöqtə yoxdur) formatını verir. Nəticədə `aria-describedby`
    kimi atributlar snapshot-larda xam qalırdı — refaktordan sonra sırf render sırası
    dəyişdiyinə görə saxta diff yaranacaqdı. Həlli: `tests/golden/normalize.ts`-də hər iki
    format da tutulur (`radix-_r_[a-z0-9]+_|:r[a-z0-9]+:`), baseline yenidən yaradıldı.

---

## Struktur

```
coco/
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
│   │   └── vendor/supabase/       # 17 vendored CSS + NOTICE.md
│   ├── lib/                       # utils (cn), constants, get-explicit-tab-index
│   ├── providers/                 # theme-provider, single-themes
│   └── components/
│       ├── atoms/                 # packages/ui → "Atom components"
│       │   ├── actions/button/
│       │   ├── data-display/{accordion,avatar,chart,collapsible,table}/
│       │   ├── feedback/{alert,badge,progress,skeleton,sonner}/
│       │   ├── forms/{calendar,checkbox,form,input,label,radio-group,select,switch,textarea}/
│       │   ├── layout/{card,separator,aspect-ratio}/
│       │   ├── navigation/{command,sidebar,tabs}/
│       │   └── overlay/{dialog,drawer,dropdown-menu,hover-card,popover,sheet,tooltip}/
│       └── fragments/             # packages/ui-patterns → "Fragment components" (hələ boş)
├── tests/
│   ├── setup.ts                   # jsdom polyfill-ləri (matchMedia, ResizeObserver, pointer capture)
│   └── golden/
│       ├── normalize.ts           # Radix ID / data-slot / atribut sırası normalizasiyası
│       ├── golden.test.tsx        # 42 playground nümunəsini render edir + 7 overlay açır
│       └── *.html                 # baseline snapshot-lar (49 fayl)
├── vite.config.ts
├── vitest.config.ts
├── tsconfig.vitest.json
└── package.json
```

---

## Tamamlanmış işlər

- **Faza 0 — İnfrastruktur**: Vite library mode (es+cjs, `cssFileName: styles`),
  `@tailwindcss/vite`, `vite-plugin-dts` (`bundleTypes` + api-extractor), package.json
  `exports`/`sideEffects`/`peerDependencies`, playground ayrıldı, default Vite demo silindi.
- **Token sistemi**: 17 CSS faylı byte-exact vendor edildi (OKLCH semantic sistemi, Radix
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
- **Playground**: sticky header + sidebar nav, 33 komponent bölməsi, Colors və Typography
  bölmələri. Hər demo üçün **Preview / Code tabları** — kod `playground/examples/*.tsx`
  faylının öz mənbəyindən (`?raw`) gəlir, Shiki ilə rənglənir (`var(--code-token-*)` ilə
  tema-uyğun), copy düyməsi var. 42 nümunə faylı.

- **Faza 4 — Overlay**: Dialog, Sheet, Popover, Dropdown Menu, Tooltip, Hover Card
  (→ `overlay/`), Accordion, Collapsible (→ `data-display/`), Tabs (+`useTabIndicator`)
  (→ `navigation/`). `animations.css` vendor edildi (`animate-accordion-*`, `animate-overlay-*`
  keyframe-ləri oradadır). Popover öz `popover.module.css`-i ilə gəlir. Yeni npm asılılığı yox.
- Playground-un Preview/Code tabları artıq **öz `Tabs` komponentimizlə** işləyir (dogfooding).
- **Faza 5 başladı — Table**: public `table.tsx` implementasiyası, onun daxili
  `ShadowScrollArea` + `useHorizontalScroll` zənciri və upstream invoice demo-su portlandı.
  `heading-meta` utility-si üçün upstream `packages/config/typography.css` vendor edildi.
  Yeni npm asılılığı tələb etmədi.
- `check:classes` tapıntı olduqda artıq non-zero exit code qaytarır; Table mənbəyindəki boşluqlu
  upstream easing ifadələrinin parser tərəfindən yaranan iki fraqmenti false-positive kimi
  sənədləşdirilib filtrə əlavə edildi.
- **Faza 5 — Command**: `Command`, `CommandDialog`, input/list/group/item/empty/separator/shortcut
  public API-si və iki upstream demo portlandı. Upstream-lə eyni `cmdk@1.1.1` runtime asılılığı
  əlavə edildi və library bundle-da external saxlanıldı.
- **Faza 5 — Drawer**: `Drawer` və 9 alt komponenti, directional layout/drag davranışları və
  upstream goal/chart demo-su portlandı. `vaul@1.1.2` runtime dependency kimi external saxlanıldı;
  demo üçün upstream catalog-dakı `recharts@2.15.4` əvvəlcə dev dependency kimi əlavə edildi.
- **Faza 5 — Sonner, Calendar, Chart, Form, Sidebar**: beş komponent eyni keçiddə portlandı.
  Sonner `StatusIcon`, Form `InputGroup`, Sidebar isə `useIsMobile` və legacy shadcn Button
  implementasiyalarını daxili köməkçi kimi istifadə edir; bunlar ayrıca public atom sayılmır.
  Chart üçün upstream `charts.css` vendor edildi. `sonner`, `react-day-picker`, `recharts`,
  `react-hook-form` və `framer-motion` runtime dependency-dir və bundle-da external saxlanılır;
  `@hookform/resolvers` ilə `zod` yalnız Form playground nümunəsi üçündür. Sonner playground
  toaster-i `ThemeProvider`-in `resolvedTheme` dəyəri ilə sinxronlaşdırılıb. Upstream React
  mənbələrinin istinad etdiyi legacy `text-success-600` və `text-destructive-50` utility-ləri
  mövcud semantik tokenlərə bağlandı.

**Hybrid API miqrasiyası — Turn 1 (analiz) və Turn 2 (golden baseline)**: 16 atom üçün
Strategy A/B qərarları verildi (yuxarıda #20-25), `docs/hybrid-api-migration.md` yaradıldı.
Golden markup test infrastrukturu quruldu: `vitest.config.ts` (jsdom, `tests/setup.ts` ilə —
`matchMedia`/`ResizeObserver`/pointer-capture/`scrollIntoView` polyfill-ləri, çünki jsdom
bunları implement etmir), `tests/golden/normalize.ts` (Radix ID-lərini soyur — React 19-da
format `radix-_r_p_` şəklindədir, köhnə `:r0:` formatı deyil; `data-slot` silinir; atributlar
sıralanır) və `tests/golden/golden.test.tsx` — 42 playground nümunəsinin hamısını render edib
`document.body`-ni snapshot edir, 7 overlay nümunəsi (Dialog/Sheet/Drawer/Popover/
DropdownMenu — click, Tooltip/HoverCard — hover) əlavə olaraq açıq vəziyyətdə də snapshot
olunur (49 test, 49 `.html` fayl `tests/golden/`-də). `npm run test` → `npm run verify`-ə
əlavə edildi. Dev asılılıqları: `vitest` (quraşdırılan versiya 5.0.1, planlaşdırılan 3.2.0-dan
fərqli — npm ən son uyğun versiyanı çəkdi), `jsdom` 29.1.1, `@testing-library/react` 16.3.3,
`@testing-library/user-event` 14.6.7. Ayrıca `tsconfig.vitest.json` yaradıldı və
`tsconfig.json`-a reference kimi əlavə olundu ki, `tsc -b` test fayllarını da yoxlasın.
Heç bir komponent hələ hibridləşdirilməyib — bu, yalnız baseline-dır.

**Hybrid API — Dialog (Strategy B, referans komponent)**: `src/components/atoms/overlay/dialog/`
`dialog-parts.tsx` (əvvəlki `dialog.tsx`, `Dialog` → `DialogRoot` adı dəyişib, `DialogRootProps`
tipi, Apache-2.0 modifikasiya başlığı əlavə olunub, qalan hər şey — class-lar, `forwardRef`,
`displayName` — toxunulmaz) və `dialog.tsx` (yeni `DialogHybrid`, `useControllableState` ilə
open/pending state) olaraq bölündü. `index.ts` `Dialog = Object.assign(DialogHybrid, { Root,
Trigger, Content, Header, Title, Description, Section, SectionSeparator, Footer, Close })`
namespace-ini yaradır. `src/lib/use-controllable-state.ts` əlavə olundu (bölmə 4.2-dəki paylaşılan
hook). Default footer (`onConfirm` veriləndə) upstream demo-dakı Header→SectionSeparator→
Section→Footer sırasını izləyir. **Brief-in `Button` fərziyyəsi düzəldildi**: real `Button`-da
vizual variant prop-u `type` yox, `variant`-dır (`primary`/`default`/`secondary`/`outline`/
`dashed`/`link`/`text`/`danger`/`warning`), `htmlType` isə heç vaxt implement olunmayıb — native
HTML tipi elə `type`-ın özüdür (upstream-dəki köhnəlmiş şərh saxlanılıb). `DialogProps.confirmType`
bu üzdən `React.ComponentProps<typeof Button>['variant']`-dan derive olunur.
Ripple: `command.tsx`-in daxili `CommandDialog`-u `{ Dialog, DialogContent }` importunu
`{ DialogRoot, DialogContent }`-ə keçirdi (Command-ın öz API-si dəyişmədi).
Playground: `dialog-demo.tsx` `<Dialog>` → `<DialogRoot>` migrasiya olundu. Props nümunəsi
tək fayldadır (`dialog-props-demo.tsx`) — iki `Dialog` yan-yana (Delete project: minimal,
default footer; Update email: `children` render-function, `ctx.pending` ilə input-u disable
edir), CLAUDE.md-in "artıq nümunə yaratma" ruhuna uyğun bir demonstrasiya kifayətdir. Bölmədə
göstərim üçün `ComponentPreview` `codeVariants` prop-u ilə ümumiləşdirildi (`component-preview.tsx`):
"Preview" tab-ı canlı render edir (indi 2 düymə), "Props-driven" və "Compound" tab-ları isə
müvafiq faylın kodunu göstərir (canlı render təkrarlanmır) — əvvəlki 3 ayrı `ComponentPreview`
blokunu (Compound/Props/Props-render-fn) əvəz etdi. Bu ümumiləşdirmə geriyə uyğundur: `codeVariants`
verilməyəndə köhnə tək "Code" tab-lı davranış saxlanılır, digər bütün komponentlər toxunulmadı.
Golden testlərdə `dialog-props-demo` açıq vəziyyətdə də snapshot olunur (`CLICK_TO_OPEN`);
ilk buton (Delete project) klikləndiyi üçün Update email dialoqu yalnız bağlı vəziyyətdə
yoxlanılır. `scripts/check-classes.mjs`-ə `dialog-props-render-fn-email` (input id-si, class-a
bənzəyən false-positive) filtr olaraq əlavə olundu.

**Hybrid API — qalan 16 atom (Tabs → Command)**: eyni Dialog nümunəsi (`-parts.tsx` + hibrid
fayl + `index.ts`-də `Object.assign` namespace) 16 komponentə tətbiq edildi, hər biri üçün
compound demo (mövcud) + `<ad>-props-demo.tsx` (yeni) cütü, `codeVariants` ilə eyni bölmədə
"Props-driven"/"Compound" tab-ları:

- **Tabs** (Strategy A, referans) — §7.2-dəki nümunə demək olar dəyişmədən tətbiq olundu.
- **Sheet, Drawer** (Strategy B) — Dialog-un eyni struktur (trigger/title/description/footer/
  onConfirm), Sheet-ə əlavə `side`/`size`. Drawer-in compound demosu (goal counter + recharts
  bar chart) props-mode-a `children` render-function + custom `footer` render-function ilə
  bilavasitə köçürüldü (`classNames.body` ilə `mx-auto max-w-sm p-4 pb-0` saxlanıldı — bu
  spesifik wrapper upstream-in xüsusi demo tərtibatıdır, hibrid API-nin ümumi hissəsi deyil).
- **Tooltip, Popover, HoverCard** (Strategy A, `content`) — `trigger`+`content` cütü, Tooltip
  `TooltipProvider`-i şəffaf sarır (əlavə DOM node yaratmır, ona görə markup dəyişmir).
- **Accordion** (Strategy A, `items`) — Radix-in `type`-a görə diskriminasiya olunan
  `AccordionSingleProps \| AccordionMultipleProps` union-u `Omit`-lə düzləşdirmək mümkün
  olmadı (bax qərar #29-a bənzər problem, amma fərqli səbəb: `Pick`/`Omit` union-dan yalnız
  **ortaq** açarları saxlayır, `collapsible`/`value` kimi variant-spesifik sahələr itir) — həll:
  iki variant əl ilə güzgülənib (`AccordionSingleItemsProps \| AccordionMultipleItemsProps`).
- **Collapsible** (Strategy A, `trigger`) — qərar #23-ə uyğun, `label` (əvəzinə "visible")
  header sətirində görünür; rules-of-hooks pozuntusu tapılıb düzəldildi (qərar #32).
- **Select** (Strategy A, `options`) — hələlik flat (açıq sual #2, qruplu variant əlavə
  olunmayıb). `select-groups.tsx`/`select-sizes.tsx` compound nümunələri toxunulmadı, üçüncü
  "Props-driven" preview əlavə edildi.
- **RadioGroup** (Strategy A, `options`) — `id` verilməyəndə `${name ?? 'radio-group'}-${value}`
  ilə avtomatik generasiya olunur.
- **DropdownMenu** (Strategy A, `items`, `MenuItem` §6.4-ə uyğun) — item/separator/label/
  group/submenu/checkbox render olunur (radio variant §6.4-də yoxdur, əlavə olunmadı).
- **Alert, Card** (Strategy A, `title`/`description`(/`footer`/`headerAction`)) — hər ikisində
  native `title` kolliziyası aşkarlandı və Omit edildi (qərar #29). Card-ın `headerAction`
  yalnız veriləndə əlavə flex wrapper görünür, yoxdursa compound ilə eyni markup.
- **Avatar** (Strategy A, `src`) — Turn 1-dəki sadə `src`-only diskriminatordan fərqli olaraq
  `src \|\| fallback` istifadə olunur, çünki yalnız-fallback (image-sız) halı `src`-only
  diskriminatorla compound-a düşüb sınardı.
- **Table** (Strategy A, `columns`+`data`) — `footer` prop öz strukturunu tam sərbəst saxlayır
  (`<TableFooter>{footer}</TableFooter>`, avtomatik `colSpan` yoxdur), çünki upstream-in
  invoice cədvəlindəki footer sətri (4 sütun `colSpan` + 1 ayrıca "Amount" xanası) tək bir
  avtomatik sxemə sığmır.
- **Command** (Strategy A, `groups`) — `CommandDialog` toxunulmadı (`DialogRoot` ripple-i
  Dialog turunda artıq həll edilmişdi).

Bütün turlarda tapılan ümumi problemlər (qərar #29-32-yə bax): native `HTMLAttributes`
kolliziyaları (`content`, `title`), çox-sahəli discriminator-da TS-in avtomatik daralmaması,
`Object.assign` namespace-inə əlavə olunan hər part-ın prop tipinin export edilməli olması
(əks halda `api-extractor` `TS4023` ilə bundle-ı sındırır) və Collapsible-dəki rules-of-hooks
xətası. Bunların hamısı tapılıb düzəldilib, `npm run verify` və 73 golden test yaşıldır.

**Yenidən baxılan 5 element (istifadəçi sorğusu)** — Select `groups` (qərar #33), RadioGroup
`variant: 'large'` (qərar #33), `CommandDialog` `groups` (qərar #33-34), `Chart` (qərar #35,
tam hibrid deyil — bax yuxarı). Hər biri üçün əvvəlki compound nümunə saxlanıldı, yeni
"Props-driven" cütü əlavə olundu.

**Düzəliş — Select-in Props/Compound cütü natamam idi**: `select-props-demo.tsx` (flat
`options`) və `select-sizes.tsx` (5 ölçü) üçün heç vaxt uyğun compound cütü/`codeVariants`
əlavə edilməmişdi (yalnız tək "Props-driven" nümunəsi göstərilirdi, digər komponentlərdəki
kimi "Compound" tab-ı yox idi). `select-demo.tsx` (yeni, compound) və
`select-sizes-props-demo.tsx` (yeni, props) əlavə olundu, hər ikisi indi digərləri kimi
codeVariants cütü ilə göstərilir.

**Playground UX** (istifadəçi sorğusu):
- **Reload-da scroll ortaya sıçrayırdı** — köhnə həll yalnız React mount-dan **əvvəl**, boş
  səhifədə `scrollTo(0,0)` çağırırdı; async font yüklənməsi/ilk render-dən sonrakı hündürlük
  dəyişiklikləri sonradan scroll-u sürüşdürürdü. Həll: `index.html`-də `resetScroll`
  funksiyası `load` event-ində və iki `requestAnimationFrame`-dən sonra da təkrar çağırılır,
  həmçinin `html { overflow-anchor: none }` əlavə olundu (Chrome-un scroll-anchoring-i
  hündürlük dəyişəndə görünüşü "ortaya tullanma" kimi düzəldə bilirdi).
- **Header yenidən dizayn edildi**: hündürlük `h-10` → `h-14`, üst kənarda incə brand-rəngli
  gradient xətt, "design system" mətni öz `Badge` komponentimizə (`variant="secondary"`)
  keçirildi, sağda `Badge variant="success"` ilə "17 hybrid · 33 atoms" statistikası əlavə
  olundu (dogfooding — kitabxananın öz komponenti işlədilir).
- **Sağ tərəfin boş qalması** — əvvəlcə sol naviqasiyanın təkrarı olan "On this page" sağ
  panel əlavə edildi, sonra istifadəçi bunun mənasız olduğunu (eyni siyahı iki yerdə) qeyd
  etdi — silindi. Əvəzinə məzmun sütunu `max-w-3xl` → `max-w-4xl` genişləndirildi ki, boşluq
  təkrarsız şəkildə azalsın.

**Cari ölçülər:** `dist/coco.js` 202.9 kB (gzip 44.5 kB), `dist/styles.css` 165.1 kB (gzip 28.4 kB),
271 public export, 17 hibrid atom + 1 əlavə props-only (`Chart`), 65 playground nümunəsi,
79 golden test. Shiki yalnız playground-dadır, library bundle-ına düşmür.

---

## Növbəti fazalar

### Atomlar (`packages/ui/src/components/shadcn/ui/`)
- **Faza 5 — Ağır/3rd-party**: Table, Command, Drawer, Sonner, Calendar, Chart, Form və Sidebar
  tamamlandı. Qalanlar: Resizable və Input OTP.

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
npm run verify   # build:lib + lint + check:classes + check:tokens + test
npm run test     # vitest run — golden markup testləri (tests/golden/)
npx tsc -b       # tip yoxlaması (src, playground, vite/vitest config-ləri, tests/)
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
  **Hazırkı vəziyyət: 585 ortaq token, fərq yoxdur.**

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

`docs/hybrid-api-migration.md` — hybrid API miqrasiyası üçün tam agent brifinqi.
**Miqrasiya tamamlandı** (2026-09-22): 17 atomun hamısı (Dialog/Sheet/Drawer → Strategy B,
qalan 14 → Strategy A) compound + props-driven ikili API-yə keçirilib, golden markup testləri
(`tests/golden/`, 73 test) ilə vizual sadiqlik təsdiqlənir. Qərarlar #20-32-də ətraflı jurnal.
Sənəd özü hələ arxivlənməyib — gələcək atomlar (Sonner, Calendar, Chart, Form, Sidebar,
Resizable, Input OTP) eyni prinsipləri izləyə bilər.

---

## Açıq məsələlər

- **Gözlə vizual təsdiq edilməyib** — sessiyada brauzer aləti yox idi. Token və class
  səviyyəsində yoxlanılıb (yuxarıdakı skriptlər), golden testlər DOM strukturunu təsdiqləyir,
  amma real brauzerdə yan-yana baxış istifadəçidədir.
- Tema inteqrasiyası və `data-theme` tələbi README-də sənədləşdirilib.
- DropdownMenu-nun checkbox/radio `MenuItem` variantlarının canonical demo-su yoxdur —
  `dropdown-menu-checkboxes.tsx`/`dropdown-menu-radio-group.tsx`-dən portlanmayıb (hibrid
  `MenuItem` tipi checkbox variantını dəstəkləyir, amma playground nümunəsi yoxdur).
- Table-ın sıralanan başlığı (`TableHeadSort`) opt-in `sortable` sahəsi kimi hələ props
  API-yə bağlanmayıb — indi yalnız compound-da (`Table.HeadSort`) əlçatandır.
- **Faza 5-in qalan atomları qiymətləndirildi, hibridləşdirilməyəcək** — hər biri bu sadə
  discriminator-prop naxışına (tək `items`/`content` sahəsi ilə bağlı, sərhədli render)
  uyğun gəlmir:
  - **Sonner** — artıq tək, tam props-driven konfiqurasiya komponentidir (`SonnerToaster`);
    toast-lar özləri `toast()` ilə imperativ çağırılır (bizim atomdan kənarda), compound
    Root/Trigger bölgüsü heç vaxt olmayıb.
  - **Calendar** — artıq tək komponentdir (`react-day-picker`-in özünün props API-si), compound
    hissəsi yoxdur.
  - ~~**Chart**~~ — istifadəçinin xahişi ilə yenidən baxıldı, aşağıya bax: tam hibrid deyil
    (heç vaxt "root" olmayıb, ona görə discriminator/rename yoxdur), amma dar məqsədli
    əlavə `Chart` komponenti alındı (yalnız bar chart, upstream-in tək istinadına uyğun).
  - **Form** — `react-hook-form`-un `Controller`/`FormProvider`-inə bağlıdır; sxem-əsaslı
    props-driven form generator ayrıca, çox daha böyük bir fraqment olardı (artıq roadmap-da
    `FormItemLayout` kimi qeyd olunub) — atom hibrid naxışına sığmır.
  - **Sidebar** — 20+ hissəli tam app-shell layout sistemi (qrup/menu/submenu/badge/skeleton…);
    `DropdownMenu`-nun `MenuItem`-indən qat-qat böyük bir nav-tree tipi tələb edərdi,
    diapazonu uyğunsuzdur.
  Resizable və Input OTP hələ portlanmayıb (Faza 5-in qalan hissəsi, hibrid sualından ayrı).
- Fragmentlər (`ui-patterns`) hələ başlanmayıb — bax bölmə "Növbəti fazalar".
