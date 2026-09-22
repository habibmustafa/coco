# coco — Supabase design system portu

Bu layihə Supabase-in açıq-mənbə design system-inin (`supabase.com/design-system`,
`github.com/supabase/supabase`, Apache-2.0) React komponent paketi kimi portudur.
Hədəf: **birəbir eyni görünüş**, approksimasiya yox.

## İş qaydaları

- **Cavablar və sənədlər Azərbaycan dilində** olsun. Kod, identifikator və kod şərhləri ingiliscə qalır.
- **`docs/plan.md` canlı sənəddir.** Hər qərar, düzəliş və tamamlanan iş dərhal ora yazılmalıdır —
  təkcə planlaşdırma mərhələsində yox, iş getdikcə. Sessiyanın əvvəlində onu oxu.
- **Komponent portlayarkən:** əvvəlcə `packages/ui/index.tsx`-dən hansı implementasiyanın *public*
  olduğunu təsdiqlə (hər şey `shadcn/ui/` altında deyil), sonra faylı olduğu kimi götür və
  **yalnız import path-larını** dəyiş. CVA variantları, class-lar və markup toxunulmaz qalır.
- **Vendored fayllara dəyər dəyişikliyi etmə.** `src/styles/vendor/supabase/` altındakı CSS
  upstream-dən byte-exact gəlir; hər faylın başında mənbə şərhi var (Apache-2.0 tələbi).
- Fayl/qovluq adları **lowercase kebab-case** (Windows lokal / Linux CI case fərqi bug yaradır).
- **Atom / fragment bölgüsü** upstream-i əks etdirir:
  - `src/components/atoms/<kateqoriya>/<ad>/` — `packages/ui`-dən gələnlər ("Atom components").
    Kateqoriyalar: `actions`, `forms`, `layout`, `feedback`, `overlay`, `data-display`, `navigation`.
  - `src/components/fragments/<ad>/` — `packages/ui-patterns`-dən gələnlər ("Fragment components").
    Fragmentlər atomlardan qurulur, ona görə kateqoriyasız (flat) saxlanılır.
- Atom faylları `lib/`-ə **`../../../../lib/...`** ilə, fragment faylları **`../../../lib/...`** ilə çatır.

## Əmrlər

```
npm run dev            # playground (design-system tipli demo sayt)
npm run build:lib      # dist/coco.js + coco.cjs + styles.css + index.d.ts
npm run lint           # oxlint
npx tsc -b             # tip yoxlaması
npm run check:classes  # işlədilən class-ın CSS-də qarşılığı varmı
npm run check:tokens   # tokenlərimiz canlı supabase.com/design-system ilə üst-üstə düşürmü
npm run verify         # hamısı ardıcıl
```

## Style səhvlərinin qarşısını almaq (məcburi)

Bu layihədə dizayn fərqlərinin **hamısı** eyni iki səbəbdən yarandı: işlədilən class-ın CSS-i
ümumiyyətlə yaranmamışdı, və ya komponent upstream-dəki kimi *istifadə* olunmamışdı.
Ona görə hər dəyişiklikdən sonra:

1. **`npm run verify` işlət.** `check:classes` CSS-də qarşılığı olmayan class-ı tapır (belə class
   səssizcə stilsiz render olunur — `focus-ring`, `animate-accordion-down`, `hit-area-6`
   hamısı bu yolla tapıldı). `check:tokens` isə tokenlərimizi canlı saytınkı ilə müqayisə edir.
   Hər ikisi təmiz olmalıdır; səs-küy görsən filtri düzəlt, nəticəni görməzdən gəlmə.
2. **Komponenti portlayanda onun upstream istifadəsini də götür:**
   `apps/design-system/registry/default/example/<ad>-demo.tsx`. Komponent tək başına kifayət
   etmir — məsələn `TabsTrigger`-in padding-i yoxdur, boşluq `TabsList`-ə verilən `grid-cols-N`
   ilə gəlir və `<TabsIndicator />` ayrıca əlavə olunmalıdır.
3. **Layout ölçülərini gözlə seçmə** — lazım olanda saytın HTML/CSS-ini çək və real dəyərləri
   oxu (`scripts/check-tokens.mjs` içindəki yanaşma ilə).

## Diqqət tələb edən məqamlar

- `dark:` utility-ləri yalnız `data-theme*="dark"` ilə işləyir; token blokları isə `.dark`/`.light`
  class-ına baxır. `ThemeProvider` hər ikisini qoyur.
- Rendered görünüş təkcə komponent fayllarından gəlmir — tipoqrafiya və base layer
  `design-system-base.css`-dədir (upstream-də `apps/design-system/styles/globals.css`).
- Runtime asılılıqları (`radix-ui`, `cmdk`, `vaul`, `sonner`, `react-day-picker`, `recharts`,
  `react-hook-form`, `framer-motion`, `lucide-react`, `cva`, `clsx`, `tailwind-merge`) build-də
  **external**-dır; yeni runtime asılılığı əlavə edilsə, `vite.config.ts`-ə də yazılmalıdır.
