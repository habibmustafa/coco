# Plan və iş jurnalı

> Canlı sənəd. Hər qərar, düzəliş və tamamlanan iş buraya yazılır.
> Son yenilənmə: 2026-09-23 · Status: Faza 0-5 tamamlandı (37 atom komponent — Resizable və
> Input OTP daxil, Faza 5-in bütün atomları bitdi). **Fragment Tur 1 və Tur 2 tamamlandı**:
> 20 fragment (Tur 1: Admonition, FormItemLayout, InfoTooltip, EmptyStatePresentational,
> ErrorDisplay, ShimmeringLoader, MetricCard, MultiSelect, DatePicker, CodeBlock; Tur 2:
> Breadcrumb — atom, DataInput, TimestampInfo, StatusCode, TextLink, ThemeToggle, GlassPanel,
> Row) portlandı. Hybrid API miqrasiyası (`docs/hybrid-api-migration.md`) **23 komponentə**
> tətbiq olunub (tam sweep-dən sonrakı yekun say): 20 atom (ilk miqrasiyanın 17-si — Dialog,
> Sheet, Drawer, Tooltip, Popover, HoverCard, DropdownMenu, Tabs, Accordion, Collapsible,
> Select, RadioGroup, Command, Card, Alert, Avatar, Table — + Breadcrumb + Input OTP +
> Resizable) + 3 fragment (MetricCard, MultiSelector, DatePicker). Qalan fragmentlər
> (Admonition, FormItemLayout, InfoTooltip, EmptyStatePresentational, ErrorDisplay,
> ShimmeringLoader, CodeBlock, DataInput, TimestampInfo, StatusCode, TextLink, ThemeToggle,
> GlassPanel, Row) artıq tək-rejimlidir, compound/props ikiliyi tələb etmir. Bütün 35 atom və
> 17 fragment əl ilə yoxlanılıb — **kitabxanada compound strukturu olub da hibridləşdirilməmiş
> komponent qalmayıb.** Playground `examples/` qovluq-per-komponent restruktur edilib. Qalan
> Faza 5 atomları (Sonner, Calendar, Chart, Form, Sidebar) hibridləşdirilməyəcək qərarı
> verilib (bax "Açıq məsələlər").

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
| 36 | Fragment fazasının ilk turu üçün `packages/ui-patterns/src`-dəki ~50 namizəddən **10-u** seçildi: Admonition, FormItemLayout, InfoTooltip, EmptyStatePresentational, ErrorDisplay, ShimmeringLoader, MetricCard, MultiSelect, DatePicker, CodeBlock | İstifadəçi ilə birgə təsdiqləndi. Seçim meyarı: Supabase-ə spesifik olmayan, ümumi-təyinatlı, digər fragment/atomlarla üst-üstə düşməyən komponentlər. Kənarda qalanlar: PageBreadcrumbs/Container/Header/Nav/Section və InnerSideMenu (app-shell-ə spesifik), Toc/SkipToContent/StatusCode/TimestampInfo (dar məqsədli), FilterBar/DataInputs/CollapsibleCardSection/collapsible-alert (Admonition/Collapsible atomu ilə örtüşür) |

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
12. **`--destructive-lightness` token-i canlı saytla üst-üstə düşmürdü (`check:tokens`)** —
    Admonition fragmentini portlayarkən aşkarlandı, özü fragment ilə əlaqəsizdir: upstream
    `packages/ui/build/css/source/semantic.css`-də dark-mode anchor-u `0.75`-dən `0.55`-ə
    dəyişdirmişdi (light.css-dəki `0.52` override toxunulmamışdı). `src/styles/vendor/theme/
    semantic.css`-dəki dəyər upstream ilə eyniləşdirildi. Eyni upstream fetch-də `--primary-hover`/
    `--warning-hover`/`--destructive-hover` kimi yeni tokenlər də görünürdü, amma bunlar bizdə
    ümumiyyətlə mövcud olmadığı üçün `check:tokens` skripti onları müqayisəyə salmır (yalnız hər
    iki tərəfdə olan dəyişənləri müqayisə edir) — button hover davranışına inteqrasiyası ayrıca,
    planlaşdırılmamış bir işdir, "Açıq məsələlər"ə əlavə olundu.
13. **Golden test normalizasiyası Radix ID-lərini tutmurdu** — ilk baseline-da regex köhnə
    React `useId` formatını (`:r0:`) axtarırdı, amma React 19 + Radix bu layihədə
    `radix-_r_p_` (alt xətt ilə, iki nöqtə yoxdur) formatını verir. Nəticədə `aria-describedby`
    kimi atributlar snapshot-larda xam qalırdı — refaktordan sonra sırf render sırası
    dəyişdiyinə görə saxta diff yaranacaqdı. Həlli: `tests/golden/normalize.ts`-də hər iki
    format da tutulur (`radix-_r_[a-z0-9]+_|:r[a-z0-9]+:`), baseline yenidən yaradıldı.
14. **Playground açılanda tam qara/boş ekran verirdi** — istifadəçi bildirdi. Səbəb: CodeBlock
    fragmentinin `react-syntax-highlighter/dist/cjs/languages/hljs/*` deep-path importları
    `{ default: fn }` şəklində ikiqat sarılmış modul qaytarırdı (bu subpath-lər paketin öz
    ESM/CJS interop-unu keçib gedir); nəticədə `registerLanguage` funksiyaya deyil, wrapper
    obyektə üz tuturdu və `languageDefinition.bind is not a function` xətası ilə ilk render-də
    sınırdı. Heç bir Error Boundary olmadığı üçün bütün React ağacı unmount olur, səhifə boş
    qalırdı. **Golden testlər bunu tutmurdu** çünki vitest/jsdom mühiti həmin importu fərqli
    həll edir (CJS-i birbaşa require edir, Vite-in brauzer üçün etdiyi dev-time ESM interop-u
    keçmir) — səhv yalnız **əsl brauzerdə** üzə çıxırdı. Aşkarlamaq üçün Playwright ilə
    (`npx playwright install chromium`, sonra silindi) canlı dev server-ə qarşı konsol
    xətaları yoxlanıldı. Həlli: bütün dil importları (+ əsas `Light` class-ı) `dist/cjs/...`
    əvəzinə `dist/esm/...`-ə keçirildi (o fayllar sadə `export default <fn>`-dir, sarılma
    yoxdur). **Dərs**: React render-zamanı xətaları üçün golden testlər (jsdom) kifayət
    etmir — kitabxana `dist/cjs` vs `dist/esm` subpath-larını fərqli sarır, bu yalnız real
    brauzerdə/Vite dev serverində üzə çıxır.

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
│   └── shiki-theme.ts             # playground kod teması
├── index.html                     # Inter + Source Code Pro, no-flash tema script-i
├── src/
│   ├── index.ts                   # public entry
│   ├── styles/
│   │   ├── globals.css            # upstream import zənciri
│   │   └── vendor/theme/       # 17 vendored CSS + NOTICE.md
│   ├── lib/                       # utils (cn), constants, get-explicit-tab-index
│   ├── providers/                 # theme-provider, single-themes
│   └── components/
│       ├── atoms/                 # packages/ui → "Atom components"
│       │   ├── actions/button/
│       │   ├── data-display/{accordion,avatar,chart,collapsible,table}/
│       │   ├── feedback/{alert,badge,progress,skeleton,sonner}/
│       │   ├── forms/{calendar,checkbox,form,input,input-otp,label,radio-group,select,
│       │   │         switch,textarea}/
│       │   ├── layout/{card,floating-plate,resizable,separator,aspect-ratio}/
│       │   ├── navigation/{breadcrumb,command,sidebar,tabs}/
│       │   └── overlay/{dialog,drawer,dropdown-menu,hover-card,popover,sheet,tooltip}/
│       └── fragments/             # packages/ui-patterns → "Fragment components" (Tur 1+2: 18
│           │                        qovluq, 20 komponent — data-input 1, multi-select 2 saxlayır)
│           ├── admonition/, form-item-layout/, info-tooltip/, empty-state/, error-display/
│           ├── shimmering-loader/, metric-card/, multi-select/, date-picker/, code-block/
│           └── data-input/, timestamp-info/, status-code/, text-link/, theme-toggle/,
│               glass-panel/, row/
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

- **2026-09-23 — Mənbə başlıqları:** 113 fayldakı uzun və təkrarlanan atribusiya
  blokları, ardınca onlara qoyulan qısa əvəzedici şərhlər silindi. Mənbə, lisenziya
  və dəyişiklik xülasəsi `src/styles/vendor/theme/NOTICE.md`-də saxlanılır.
  Layihə özəldir; paylamadan əvvəl fayl səviyyəsində dəyişiklik bildirişləri
  yenidən qiymətləndirilməlidir.

- **2026-09-23 — Adlandırma və şərh təmizliyi:** CSS vendor qovluğu
  `src/styles/vendor/theme/` adlandırıldı; bütün import və sənəd yolları yeniləndi.
  Playground nümunələrindəki kənar brend adları coco/generic məzmunla əvəz edildi,
  kod temasının adı `coco` oldu, 17 fayldakı təkrar lisenziya sətri və digər artıq
  şərhlər çıxarıldı. Mənbə fayllarında tələb olunan atribusiya və dəyişiklik
  bildirişləri saxlanıldı.

- **2026-09-23 — Playground header:** tema dəyişdiricisi kitabxananın `ThemeToggle`
  fragmenti ilə əvəz edildi. Fragmentin sadə ikon trigger-i Supabase tokenləri ilə
  çərçivəli, cari seçimi göstərən kompakt düyməyə çevrildi; açılan menyuya başlıq və
  System/Dark/Light ikonları əlavə olundu.

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

**Fragment tur 1 başladı — Admonition**: `src/components/fragments/admonition/` (`admonition.tsx`,
`admonition-icons.tsx`, `admonition-constants.ts`, `admonition-types.ts`, `index.ts`) — bizim
hibrid `AlertRoot`/`AlertTitle`/`AlertDescription` üzərində qurulur (`Alert`-in `variant`
dəyərləri upstream-in `TYPE_TO_VARIANT` map-i ilə tam üst-üstə düşür, əlavə uyğunlaşdırma
lazım olmadı). `playground/examples/admonition/admonition-demo.tsx` upstream-in 9 ayrı nümunə
faylını (default/warning/destructive/success/description-only) bir görüntüdə birləşdirir —
CLAUDE.md-in "artıq nümunə yaratma" ruhuna uyğun. Yeni "Fragment components" nav qrupu
`playground/app.tsx`-ə əlavə olundu. `scripts/check-classes.mjs`-ə `third-party` (upstream
mətnindəki "third-party applications" ifadəsindən yaranan false-positive) filtr olaraq əlavə
edildi. Yeni npm asılılığı tələb etmədi.

**Fragment tur 1 — FormItemLayout**: `src/components/fragments/form-item-layout/`
(`form-layout.tsx`, `form-item-layout.tsx`, `index.ts`) — `FormLayout`-un bütün CVA
variant-ları (align/layout/size/labelLayout) toxunulmadan köçürüldü, `ui`-dan gələn
`FormDescription`/`FormLabel`/`FormMessage`/`Label`/`SIZE`/`cn` bizim atomlara bağlandı.
`playground/examples/form-item-layout/form-item-layout-demo.tsx` upstream-in `zod` +
`react-hook-form` nümunəsini (`FormField`/`FormControl` ilə) izləyir — Form atomunun öz
playground nümunəsində (`input-form.tsx`) artıq eyni asılılıqlar mövcud idi, yenisi əlavə
olunmadı. Yeni npm asılılığı tələb etmədi.

**Fragment tur 1 — InfoTooltip, EmptyStatePresentational, ErrorDisplay**:
- `src/components/fragments/info-tooltip/` — bizim `TooltipRoot`/`TooltipTrigger`/
  `TooltipContent`/`TooltipProvider` üzərində. Upstream tək bir app-wide `TooltipProvider`-ə
  etibar edir; bizim hibrid `Tooltip`-in Provider-i yalnız `content` prop rejimində şəffaf
  sarır (qərar #22), compound rejimdə yox — ona görə `InfoTooltip` öz `TooltipProvider`-ini
  sarır ki, consumer ayrıca əlavə etməli olmasın.
- `src/components/fragments/empty-state/` (`EmptyStatePresentational`) — birbaşa köçürmə,
  yalnız `cn` importu bizim `lib/utils`-ə bağlandı.
- `src/components/fragments/error-display/` (`ErrorDisplay`) — bizim `CardRoot`/`CardHeader`
  və artıq portlanmış Admonition fragmentinin `WarningIcon`-u üzərində. Dəstək linkinin
  default bazası (`/support/new`) upstream-in Supabase dashboard route-udur, dəyişdirilmədi —
  upstream-də də `supportFormParams` verilməyəndə eyni fallback işlədilir.
`playground/`-a uyğun 3 nümunə (`info-tooltip-demo.tsx`, `empty-state-presentational-demo.tsx`,
`error-display-demo.tsx`) və Section-lar əlavə olundu. `scripts/check-classes.mjs`-ə
`error-display-title` (aria id, false-positive) filtr olaraq əlavə edildi. Yeni npm asılılığı
tələb etmədi.

**Fragment tur 1 — ShimmeringLoader, MetricCard**:
- `src/components/fragments/shimmering-loader/` — `ShimmeringLoader`,
  `GenericSkeletonLoader`, `GenericSelectionSkeletonLoader`, `GenericTableLoader`. Upstream-in
  `.shimmering-loader` CSS-i (`index.css`) `src/styles/vendor/theme/shimmering-loader.css`
  kimi vendor edildi və `globals.css`-ə əlavə olundu (Chart-ın `charts.css`-i ilə eyni naxış).
  Upstream həm komponenti, həm onun props tipini `ShimmeringLoader` adlandırır (TS-də iki ayrı
  namespace olduğu üçün qanuni) — bizim flat public API-də qarışıqlıq yaratmasın deyə tip
  `ShimmeringLoaderProps` adlandırıldı.
- `src/components/fragments/metric-card/` — 8 hissəli (`MetricCard`, `…Header`, `…Icon`,
  `…Label`, `…Content`, `…Value`, `…Differential`, `…Sparkline`) dashboard kartı, bizim
  Card/Button/Skeleton/Tooltip atomları üzərində. `next/link` sadə `<a>` ilə əvəzləndi (bu
  paketin Next.js runtime asılılığı yoxdur). Hər iki daxili `Tooltip` (header chevron,
  label info-glyph) InfoTooltip-dəki eyni səbəbdən öz `TooltipProvider`-ini sarır.
  **Yeni npm asılılığı: `dayjs`** (sparkline tooltip-in tarix formatı üçün) — `package.json`
  və `vite.config.ts` external siyahısına əlavə edildi.
`playground/`-a `shimmering-loader-demo.tsx` (özümüzün yazdığı — upstream design-system
saytında bu komponent üçün ayrıca nümunə yoxdur) və `metric-card-demo.tsx` (upstream-in öz
nümunəsi, birbaşa köçürüldü) əlavə olundu. `scripts/check-classes.mjs`-ə iki false-positive
(`hsl(var(--brand-default))` — Recharts `stopColor` dəyəri, `multi-select` — variant prop
dəyəri) filtr olaraq əlavə edildi.

**Fragment tur 1 — MultiSelect**: `src/components/fragments/multi-select/` (`multi-select.tsx`,
`selection-list-state.tsx`, `index.ts`) — 6 hissəli (`MultiSelector` + `Trigger`/`Input`/
`Content`/`List`/`Item`) command-driven combobox, bizim Badge/Command/Popover atomları
üzərində. `SelectionListState` (upstream-də ayrıca `ui-patterns/SelectionListState` paketi,
seçilən 10-a daxil deyildi) MultiSelect-in daxili loading/empty/error sətri kimi ported
edildi — ShimmeringLoader-dəki `GenericSelectionSkeletonLoader`-dən istifadə edir, ayrıca
public fragment sayılmır (Sonner-in `StatusIcon`-u ilə eyni presedent).
**Yeni dev asılılığı: `tailwind-scrollbar@^4.0.2`** (`@plugin "tailwind-scrollbar"`,
`globals.css`) — upstream-in siyahı skrollbarının rəngli/nazik görünüşü üçün. Bir uyğunsuzluq
tapıldı: upstream `scrollbar-thumb-rounded-lg` class-ı işlədir, bu isə köhnə (v1-v3,
Tailwind v3-only) plugin API-sinə aiddir — cari v4 (yeganə Tailwind v4-uyğun major) bunu
artıq vermir. Həll: `globals.css`-də əl ilə 1 sətirlik `@utility scrollbar-thumb-rounded-lg`
(`rounded-lg` ilə eyni radius, 0.5rem) əlavə edildi. Digər 2 false-positive
(`calc(var(--radix-popover-content-available-height)`, `inline-combobox`) və upstream-in öz
işləməyən `font-italic` class-ı (Tailwind-in əsl utility adı `italic`-dir, upstream saytında
da stilsizdir — sadiqliyə görə olduğu kimi saxlanıldı) `check-classes.mjs` filtrinə əlavə
olundu. `playground/examples/multi-select/multi-select-demo.tsx` upstream-in öz nümunəsi,
birbaşa köçürüldü.

**Fragment tur 1 — DatePicker, CodeBlock (+ FloatingPlate atomu)**:
- `src/components/fragments/date-picker/` — Popover-un nazik, adlandırılmış sarğısı
  (`DatePicker`/`DatePickerTrigger`/`DatePickerButton`/`DatePickerContent`), bizim raw
  `PopoverRoot`/`PopoverTrigger`/`PopoverContent` üzərində (hibrid `Popover` yox — bu fragment
  artıq compound API-nin özünün adlandırılmış təkrarıdır, props-driven rejim mənasız olardı).
  Playground nümunəsi upstream-in özü, tək fərq: `date-fns`-in `format(date, 'PPP')`-u əvəzinə
  artıq mövcud olan `dayjs().format('MMMM D, YYYY')` (MetricCard-dan qalan asılılıq, ikinci
  tarix kitabxanası əlavə etməmək üçün) — bu, yalnız **demo**dadır, kitabxananın özü heç bir
  tarix kitabxanasından asılı deyil.
- `src/components/fragments/code-block/` (`code-block.tsx`, `code-block-theme.ts`) —
  `react-syntax-highlighter` (Monokai tema, 20 dil) + kopyala düyməsi. `next-themes`-in
  `useTheme`-i bizim `ThemeProvider`-ə keçirildi (`resolvedTheme` artıq düz `'dark'|'light'`
  olduğu üçün `.includes('dark')` → `=== 'dark'`), `lodash`-ın `noop`-u inline `() => {}` ilə
  əvəzləndi (ayrıca asılılığa dəyməzdi — `cn()` qərarı #9 ilə eyni məntiq).
  **Yeni public atom: `FloatingPlate`** (`src/components/atoms/layout/floating-plate/`) —
  `packages/ui`-dən (Atom, Fragment yox) CodeBlock-un kopyala düyməsinin arxasındakı qeyri-şəffaf
  lövhə; birbaşa köçürüldü. **Yeni lib helper: `copyToClipboard`** (`src/lib/copy-to-clipboard.ts`,
  `packages/ui/src/lib/utils/clipboard.ts`-dən) — `sonner` ilə xəta toast-ı göstərir.
  **Yeni npm asılılıqları**: `react-syntax-highlighter` + `@types/react-syntax-highlighter`
  (dev) + `highlightjs-curl` — `vite.config.ts` external siyahısına əlavə edildi (curl növü
  öz kiçik paketindən gəlir, upstream-in özü də belədir). Playground nümunəsi upstream-də
  yoxdur (yalnız markdown renderer daxilində işlədilir) — özümüz yazdıq (ShimmeringLoader
  presedenti).
- **Golden test infrastrukturu düzəldildi**: `tests/golden/golden.test.tsx` heç bir nümunəni
  `ThemeProvider` ilə sarmırdı (yalnız playground-un öz `main.tsx`-i sarır); `CodeBlock`
  daxildə birbaşa `useTheme()` çağırdığı üçün (upstream-in `next-themes` istifadəsi ilə eyni)
  təcrid olunmuş render zamanı "useTheme must be used inside a ThemeProvider" xətası ilə
  sınırdı. Hər iki `render(<Example />)` çağırışı `render(withTheme(Example))`-ə keçirildi —
  digər 88 nümunəyə təsiri yoxdur (heç biri context-dən asılı deyildi).
`scripts/check-classes.mjs`-ə 4 yeni filtr əlavə olundu: `code-block` və `border-surface`
(upstream-in özündə də işləməyən dead class-lar — `check-tokens.mjs` `--color-surface`
tokeninin canlı saytda da mövcud olmadığını təsdiqlədi), `language-pgsql`/
`var(--background-selection)` (demo/JS-string false-positive-ləri).

**Tur 2 tamamlandı (istifadəçi sorğusu, 2026-09-23) — 3 atom + 7 fragment**:
- **Resizable** (atom, `layout/resizable/`) — `react-resizable-panels` (yeni asılılıq, v4 —
  Supabase-in özünün istifadə etdiyi `Group`/`Panel`/`Separator`/`useDefaultLayout`/`usePanelRef`
  API-si yalnız bu major-da var, v3 Tailwind v3-only idi). localStorage-based layout
  persistence (`autoSaveId`) daxil, dəyişiklik edilmədi.
- **Input OTP** (atom, `forms/input-otp/`) — `input-otp` (yeni asılılıq). `animate-caret-blink`
  artıq `tw-animate-css`-dən gəlir, ayrıca vendor lazım olmadı.
- **Breadcrumb** (atom, `navigation/breadcrumb/`) — `PageBreadcrumbs` fragmentinin (
  `PageContainer`-dən asılı, app-shell) əvəzinə seçildi. **Bu turun yeganə yeni hibrid
  komponentidir**: upstream-də compound-dan başqa heç nə yoxdur, amma DropdownMenu/Select-in
  `items`/`options` naxışına bənzər `items: {label, href?}[]` prop-driven rejimi bizim
  əlavəmizdir (Strategy A) — son elementin `href`-i avtomatik `BreadcrumbPage`-ə düşür.
- **DataInput** (fragment, `data-input/`, upstream adı `Input`/`Props` — bizim `Input` atomu
  ilə toqquşmasın deyə `DataInput`/`DataInputProps` adlandırıldı) — copy/reveal/actions-lı
  input, artıq portlanmış `InputGroup` + `copyToClipboard` üzərində.
  **Aşkarlanan çatışmazlıq**: `InputGroup`/`InputGroupAddon`/`InputGroupButton`/
  `InputGroupInput`/`InputGroupText`/`InputGroupTextarea` (`form/input-group.tsx`-də mövcud
  idi) `form/index.ts`-dən heç vaxt ixrac edilməmişdi — yalnız `react-hook-form`-a bağlı
  `FormInputGroupInput`/`FormInputGroupTextArea` görünürdü. Əlavə edildi.
- **TimestampInfo** (fragment) — `dayjs` + `relativeTime`/`utc`/`timezone` plugin-ləri, hər
  tooltip sətri klik-lə kopyalanır. Compound `Tooltip` öz `TooltipProvider`-ini sarır
  (InfoTooltip/MetricCard-dakı eyni səbəb).
- **StatusCode** (fragment) — HTTP metod+status pill-i, asılılıqsız.
- **TextLink** (fragment) — `next/link` → sadə `<a>`.
- **ThemeToggle** (fragment) — `next-themes` → bizim `useTheme`/`singleThemes`, DropdownMenu
  atomu üzərində.
- **GlassPanel** (fragment) — `FilterBar` əvəzinə seçildi (aşağı bax). `next/image` → sadə
  `<img>`, `next-themes` → bizim `useTheme`.
- **Row** (fragment) — `FloatingPlate` + `Button` üzərində ox-naviqasiyalı üfüqi sıra.

**Seçim dəyişikliyi: FilterBar → GlassPanel** — FilterBar 20+ fayldan ibarət tam sorğu-qurucusu
imiş (`FilterBarContext`, `useAIFilter`, `useCommandMenu`, `useKeyboardNavigation`, `menuItems`,
`FilterCondition`/`FilterGroup` və s.) — bu turun digər 9 elementinin miqyasından qat-qat böyük,
AI backend inteqrasiyası ehtiva edir. GlassPanel (tək fayl, dekorativ feature-card) əvəzinə
seçildi, `docs/plan.md`-ə qeyd olundu ki, FilterBar gələcək bir turda öz başına
qiymətləndirilsin.

`scripts/check-classes.mjs`-ə 6 yeni filtr: `items-right`/`rounded-l-0` (TimestampInfo/
StatusCode-da upstream-in özündə də işləməyən typo class-lar — `font-italic`/`border-surface`
presedenti), `resizable-panel`/`resizable-panel-group` (data-slot dəyərləri),
`var(--column-width)` (Row-un JS `style` obyektindən). Yeni npm asılılıqları:
`react-resizable-panels`, `input-otp`. `npm run verify` təmizdir (2 əvvəlcədən sənədləşdirilmiş
qeyri-determinist test istisna).

**Tur 1 fragmentlərinin hibrid qiymətləndirməsi və 2 dönüşüm**: Tur 1-in 10 fragmentindən
yalnız **MetricCard** və **MultiSelector**-un compound-u var idi (qalan 8-i — Admonition,
FormItemLayout, InfoTooltip, EmptyStatePresentational, ErrorDisplay, ShimmeringLoader,
DatePicker, CodeBlock — artıq tək-rejimli/flat idi, compound-props ikiliyi mənasız olardı,
dəyişməz qaldı):
- **MetricCard** → `Strategy A`, diskriminator `value`. `metric-card.tsx` (əvvəlki tam fayl)
  `metric-card-parts.tsx`-ə köçürüldü, kök `MetricCard` → `MetricCardRoot` adlandırıldı (Dialog
  presedentindəki eyni "-parts.tsx + hibrid fayl" strukturu). Yeni `metric-card.tsx`
  `MetricCardHybrid`-i `label`/`tooltip`/`href`/`linkTooltip`/`icon`/`value`/`differential`/
  `sparklineData` kimi düz prop-larla təqdim edir — Card atomunun `title`/`description`
  diskriminatoru ilə eyni ruhda. `value` təhlükəsiz diskriminatordur: `MetricCardRoot` sadə
  `<div>`-ə düşür, native `div` atributlarında heç vaxt `value` olmayıb.
- **MultiSelector** → `Strategy A`, diskriminator `options` (Select atomunun `SelectOption`
  naxışı ilə eyni: `{value, label?, disabled?}`). Kök `MultiSelector` → `MultiSelectorRoot`,
  `MultiSelector.Trigger/Input/Content/List/Item = ...` namespace mənimsəmələri `index.ts`-ə
  köçürüldü (digər 17 hibrid atomun `Object.assign` naxışına uyğunlaşdırıldı — əvvəllər
  bu fragment öz-özünə statik property mənimsəməsi işlədirdi, indi bizim standart naxışa
  keçdi). `MultiSelectorHybrid` `label`/`badgeLimit`/`wrapBadges`/`creatable`/`emptyLabel`
  kimi trigger/list prop-larını da ötürür.
- Hər ikisinə `*-props-demo.tsx` əlavə olundu, playground bölmələri Dialog-dakı kimi
  "Props-driven"/"Compound" `codeVariants` cütünə keçirildi.
- Qərar #31-ə (part prop tiplərinin export edilməli olması) yenidən rast gəlindi: MetricCard-ın
  `MetricCardHeaderProps`/`MetricCardContentProps`/`MetricCardLabelProps`/
  `MetricCardDifferentialProps`/`MetricCardSparklineProps` export edilməyəndə
  `api-extractor` `TS4023` ilə bundle-ı sındırdı — hamısı export edildi.

**Aşkarlanan və düzəldilən başqa çatışmazlıq**: `InputGroup`/`InputGroupAddon`/
`InputGroupButton`/`InputGroupInput`/`InputGroupText`/`InputGroupTextarea`
(`form/input-group.tsx`) heç vaxt `form/index.ts`-dən ixrac edilməmişdi — yalnız
`react-hook-form`-a bağlı `FormInputGroupInput`/`FormInputGroupTextArea` görünürdü. DataInput
fragmentini portlayarkən aşkarlandı, əlavə edildi.

**Hibrid API — Input OTP və Resizable** (istifadəçi sorğusu, 2026-09-23: "bəzi komponentlər
hibrid deyil, onları düzəldək"): Faza 5-in son iki atomu portlanarkən hibridləşdirilməmişdi,
yenidən qiymətləndirildi və hər ikisi üçün mənalı bir diskriminator tapıldı:
- **Input OTP** → Strategy A, diskriminator `slots` (say). `InputOTP` → `InputOTPRoot`
  adlandırıldı (`input-otp-parts.tsx`-ə köçürüldü). `InputOTPHybrid` `slots` verilingə daxili
  `maxLength`-i təyin edir və o qədər `InputOTPSlot` avtomatik render edir; `groupSize`
  verilsə, slotlar `InputOTPSeparator`-la ayrılan qruplara bölünür (məs. `slots={6}
  groupSize={3}` → "123 456" görünüşü). `render` prop-u (upstream-in `OTPInput`-unda
  `children`-lə qarşılıqlı-istisna edici union üzvüdür) props rejimindən `Omit` edildi —
  uyğunsuz `TS2322` xətası çıxardı.
- **Resizable** → Strategy A, diskriminator `panels` (`{content, id?, defaultSize?, minSize?,
  maxSize?, collapsible?, collapsedSize?}[]`). Kök adı dəyişdirilmədi: `ResizablePanelGroup`
  hibrid default export-un adı (`Resizable`) ilə toqquşmur (Card → CardRoot-dan fərqli olaraq)
  — bu, plan.md-də ilk dəfə "rename lazım deyil" presedenti kimi qeyd olunur.
  `ResizableHybrid` panellər arasına avtomatik `ResizableHandle` yerləşdirir (`withHandle`
  prop-u ilə tutacaq ikonu göstərilib-göstərilməyəcəyi idarə olunur).
Hər ikisinə `*-props-demo.tsx` əlavə olundu, playground bölmələri "Props-driven"/"Compound"
`codeVariants` cütünə keçirildi. **Hibrid komponentlərin yekun sayı 22-yə çatdı**: 17 (ilk
miqrasiya) + Breadcrumb + Input OTP + Resizable (4 atom) + MetricCard + MultiSelector
(2 fragment). Bütün digər atom/fragmentlər ya artıq hibriddir, ya da compound-u olmayan
tək-rejimli komponentlərdir — daha hibridləşəcək namizəd qalmayıb (Sonner/Calendar/Chart/
Form/Sidebar-ın niyə saxlanıldığı "Açıq məsələlər"də izah olunub).

Bu iş zamanı əlavə doğrulama: `npm run build:lib`/`test` real brauzer bundler interop
xətalarını (əvvəlki CodeBlock səhvi kimi) tutmur — hər iki yeni hibrid komponent üçün
Playwright ilə canlı dev server-ə qarşı əlavə yoxlama aparıldı (konsol xətası yoxdur).

**Tam sweep (istifadəçi sorğusu: "bütün komponentləri gözdən keçir")** — hər 35 atom və 17
fragment `index.ts`-i `Object.assign(...Hybrid, {...})` naxışına görə proqramla
təsnifləşdirildi, sonra "plain" çıxanların hər biri əl ilə yoxlanıldı ki, əsl compound
strukturu (bir neçə ayrıca ixrac olunan hissə) var, yoxsa yalnız tək komponentdir:
- **Tapılan 3-cü boşluq: DatePicker** — `DatePicker`/`DatePickerTrigger`/`DatePickerButton`/
  `DatePickerContent` həqiqətən 4 hissəli compound idi, "artıq nazik sarğıdır" arqumenti ilə
  hibridləşdirilməmişdi. Yenidən qiymətləndirildi: Strategy A, diskriminator `calendarProps`
  (Calendar atomunun bütün props union-unu — `mode`/`selected`/`onSelect` və s. — birbaşa
  ötürür). Kök `DatePicker` → `DatePickerRoot` adlandırıldı. Playwright ilə canlı brauzerdə
  klik-aç funksionallığı da yoxlanıldı (trigger tapıldı, popover açıldı).
- **Checkbox/Switch/Textarea/AspectRatio/Input/Label** və s. — birər export-lu, əsl compound
  strukturu heç vaxt olmayıb, dəyişməz qaldı.
- **ShimmeringLoader** — 4 müstəqil funksiyadan ibarətdir (`ShimmeringLoader`,
  `GenericSkeletonLoader`, `GenericSelectionSkeletonLoader`, `GenericTableLoader`), heç biri
  digərinin Root/Parts-i deyil (paylaşılan kontekst yoxdur) — hibrid naxışına aid deyil.
- Qalan 12 tək-rejimli fragment (Admonition, CodeBlock, DataInput, EmptyState, ErrorDisplay,
  FormItemLayout, GlassPanel, InfoTooltip, Row, StatusCode, TextLink, ThemeToggle,
  TimestampInfo) və 5 sənədləşdirilmiş istisna (Sonner/Calendar/Chart/Form/Sidebar) yenidən
  təsdiqləndi — **indi kitabxanada compound strukturu olub da hibridləşdirilməmiş komponent
  qalmayıb.**

**Cari ölçülər:** `dist/coco.js` 470.6 kB (gzip 121.5 kB), `dist/styles.css` 185.6 kB
(gzip 31.4 kB), 20 hibrid atom (17 + Breadcrumb + Input OTP + Resizable) + 1 əlavə props-only
(`Chart`), 37 atom (FloatingPlate/Resizable/Input OTP/Breadcrumb daxil), 18 fragment qovluğu /
20 fragment komponenti (3-ü — MetricCard, MultiSelector, DatePicker — hibrid; **yekun hibrid
say: 23**, tam sweep-dən sonra), 92 playground nümunəsi, 106 golden test (3-ü tarix/
`Math.random()` səbəbindən qeyri-determinist, yuxarı bax). Shiki yalnız playground-dadır,
library bundle-ına düşmür.

---

## Növbəti fazalar

### Atomlar (`packages/ui/src/components/shadcn/ui/`)
**Faza 5 tamamlandı.** Table, Command, Drawer, Sonner, Calendar, Chart, Form, Sidebar,
Resizable, Input OTP — hamısı portlanıb. Faza 5-dən kənar, Tur 2 zamanı əlavə bir atom da
portlandı: **Breadcrumb** (`packages/ui/src/components/shadcn/ui/breadcrumb.tsx`).
`packages/ui`-dən qalan namizədlər indi yalnız tək-istifadəli kiçik köməkçilərdir (məs.
`FloatingPlate` artıq portlanıb) — yeni geniş-təyinatlı atom qalmayıb.

### Fragmentlər (`packages/ui-patterns/src/`)
**Tur 1 (qərar #36) və Tur 2 (istifadəçi sorğusu, 2026-09-23) tamamlandı** — 18 fragment
qovluğu / 20 komponent:
- Tur 1: Admonition, FormItemLayout, InfoTooltip, EmptyStatePresentational, ErrorDisplay,
  ShimmeringLoader, MetricCard, MultiSelect, DatePicker, CodeBlock.
- Tur 2: DataInput, TimestampInfo, StatusCode, TextLink, ThemeToggle, GlassPanel, Row
  (+ Breadcrumb, yuxarıda atom kimi sayılır).

Ətraflı jurnal üçün "Tamamlanmış işlər"ə bax.

**Hibrid API — Tur 1/2-nin qiymətləndirməsi**: 20 fragmentdən yalnız **MetricCard** və
**MultiSelector**-un compound-u var idi, hər ikisi hibridləşdirildi (Strategy A). Qalan 18-i
artıq tək-rejimlidir (Admonition/FormItemLayout/InfoTooltip/EmptyState/ErrorDisplay/
ShimmeringLoader/DatePicker/CodeBlock/DataInput/TimestampInfo/StatusCode/TextLink/
ThemeToggle/GlassPanel/Row) — compound/props ikiliyi onlara aid deyil, dəyişməz qalacaq.

**Seçilməyən namizədlər** (Supabase-ə spesifik məzmun — ConsentToast, PromoToast, TweetCard,
SqlToRest, McpUrlBuilder, PrivacySettings, Banners/LW15Banner — və ya miqyasca uyğunsuz):
- **FilterBar** — 20+ fayldan ibarət tam sorğu-qurucusu (`FilterBarContext`, `useAIFilter`,
  `useCommandMenu`, `useKeyboardNavigation`, `menuItems`, `FilterCondition`/`FilterGroup`).
  Tur 2-də GlassPanel ilə əvəz edildi (bax qərar jurnalı). Öz başına ayrıca, böyük bir tur
  tələb edir.
- **PageBreadcrumbs/PageContainer/PageHeader/PageNav/PageSection, InnerSideMenu** —
  app-shell-ə spesifik, bir tətbiqin öz naviqasiya strukturuna bağlıdır.
- **Toc, SkipToContent, CollapsibleCardSection, collapsible-alert** — dar məqsədli, aşağı
  prioritetli.
- **CommandMenu** (`api/`, `internal/`, `prepackaged/` alt-qovluqları) — FilterBar-a bənzər
  miqyasda, Supabase-in öz axtarış backend-inə bağlı.

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
  **Hazırkı vəziyyət: 587 ortaq token, fərq yoxdur.**

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
  Resizable və Input OTP artıq portlanıb (Tur 2, 2026-09-23) — atom özləri portlandı, sadəcə
  yuxarıdakı hibridləşdirilməyəcək qərarı dəyişmədi (onların da compound/props ikiliyi yoxdur).
- Fragment Tur 1 və Tur 2 tamamlandı — bax bölmə "Növbəti fazalar" və "Tamamlanmış işlər".
  Seçilməyən böyük namizəd **FilterBar** (20+ fayl, AI filter/command-menu inteqrasiyalı
  sorğu-qurucusu) gələcək ayrıca bir turda qiymətləndirilə bilər.
- **`metric-card-demo` və `metric-card-props-demo` golden testləri qeyri-deterministdir** —
  hər ikisinin sparkline datası `Math.random()` ilə yaranır (playground-da canlı görünüş üçün
  qəsdlidir, `metric-card-props-demo` eyni data-generasiya nümunəsini `metric-card-demo`-dan
  götürüb). `calendar-demo`-dakı tarix-asılılığı ilə eyni səbəbdən düzəldilmədi: sadiqlik
  demo-nu olduğu kimi saxlamağı tələb edir, hər test qaçışında fərqli dəyərlər gözlənilən
  davranışdır. **`npm run verify` bu 3 testdən başqa hər zaman yaşıl olmalıdır.**
- **`calendar-demo` golden testi tarix-asılıdır** — snapshot "bugün" kimi işarələnən günü
  bakılayır (`data-today`), ona görə sistem tarixi dəyişəndə (məs. gündən-günə) test saxta
  fail verir. `Calendar`-ın öz davranışı düzgündür, problem test infrastrukturundadır (bugünü
  mock etmək lazımdır, `tests/setup.ts`-ə əlavə oluna bilər). Admonition işi zamanı aşkarlandı,
  ona aid deyil — düzəldilmədi, scope-dan kənardır.
