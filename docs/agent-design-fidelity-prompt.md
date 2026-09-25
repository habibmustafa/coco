# AI agent prompt — coco dizayn sistemi sadiqliyi

> Bunu istənilən AI agentə (Claude, Codex, başqa) bu layihə üzərində işə başlayanda
> sessiyanın əvvəlində ver — məqsəd: agent Supabase-in dizayn sistemindən kənara
> çıxmasın, öz zövqünə görə "bənzər" görünüş uydurmasın.

## Kontekst

Bu, Supabase-in açıq-mənbə (Apache-2.0) dizayn sisteminin
(`supabase.com/design-system`, `github.com/supabase/supabase`) React kitabxana
portudur — özəl layihədir, hələ yayımlanmayıb. **Hədəf upstream ilə birəbir eyni
görünüş və davranışdır — approksimasiya, "bənzər" dizayn, yaddaşdan qurma qəbul
edilmir.**

## Məcburi addımlar (bu sıra ilə)

1. `CLAUDE.md`-i oxu — məcburi iş qaydalarıdır, təkrarı burada saxlanmır.
2. `docs/plan.md`-i oxu — cari vəziyyət və qüvvədə olan qərarlar. Tarixi səbəb
   lazımdırsa `docs/plan-history.md`-ə bax; köhnə statusu cari tapşırıq sayma.
3. **Yeni komponent/dəyişiklik əlavə etməzdən əvvəl həmişə canlı mənbəyə bax:**
   - Komponent upstream-də varmı? `packages/ui/index.tsx`-dən (və ya
     `packages/ui-patterns`) public export-u təsdiqlə — hər `shadcn/ui/`-dəki fayl
     public deyil.
   - Upstream faylını **olduğu kimi götür**, yalnız import path-larını dəyiş — class,
     DOM strukturu, CVA variantları toxunulmaz qalır.
   - Upstream **demosunu** da gətir
     (`apps/design-system/registry/default/example/<ad>-demo.tsx`) — komponentin özü
     kifayət etmir, boşluq/layout çox vaxt demo-nun composition-undan gəlir.
   - Upstream faylı köhnəlmiş/uyğunsuz görünsə (bu layihədə `context-menu.tsx` belə
     çıxdı — eyni branch-də `dropdown-menu.tsx`-dən fərqli, köhnə token adları
     işlədirdi), kor-koranə köçürmə: layihədə artıq fidelity-təsdiqlənmiş EYNİ NÖVDƏN
     qardaş komponentə bax, ordan uyğunlaşdır və qərarı `docs/plan.md`-ə yaz.
4. Vizual ölçünü/rəngi/boşluğu heç vaxt təxmin etmə. Lazım olsa canlı saytın CSS-inə
   bax (`scripts/check-tokens.mjs`-dəki yanaşma) və ya headless brauzerlə screenshot
   çək.
5. Hər dəyişiklikdən sonra `npm run verify` (build+lint+check:classes+check:tokens+
   test) işlət — nəticəni görməzdən gəlmə, səs-küy görsən filtri düzəlt.
6. Görülən işi **və** qərarı **eyni turda** `docs/plan.md`-ə yaz, sonraya saxlama.
7. Hibrid API (props-driven + compound) yalnız mənalı Root+hissələri olan komponentə
   tətbiq olunur (bax `docs/hybrid-api-migration.md`) — hər hibrid nümunənin həm
   props, həm compound variantı olmalıdır (`codeVariants` cütü, `playground/registry.tsx`).
8. `src/styles/vendor/theme/` içindəki dəyərlərə **toxunma**.
9. coco-nun öz əlavələri (upstream portu olmayan — layout primitivləri, `DateField`,
   `form-fields` kimi) aydın qeyd olunmalıdır: "bu upstream portu deyil, coco
   əlavəsidir". Nə gizli upstream kimi təqdim et, nə də əsassız yerə upstream-dən
   uzaqlaş.

## Bu layihədə tutulan konkret tələlər (təkrarlanmasın)

- **`react-day-picker` (və bənzər kitabxanaların) `components` prop-u deep-merge
  olunmur** — bir hissəni (`MonthCaption`) override etsən, override etmədiyin digər
  default-lar (`Chevron`) da silinib kitabxananın öz default-una düşür (bəzən
  görünməz/yanlış rəngli render oluna bilər). Override edəndə HƏR overrided hissəni
  yenidən bəyan et.
- Kontrollu state üçün həmişə `useControllableState`
  (`src/lib/use-controllable-state.ts`) istifadə et, `useState`+`useEffect` ilə əl ilə
  sinxronlaşdırma yazma.
- `scripts/check-classes.mjs` şərh daxilindəki backtick-lənmiş sözləri də class kimi
  oxuya bilər (yalançı xəbərdarlıq) — şərhi backtick-siz yaz; `NOT_CLASSES`-ə əlavə
  etmə, kökündən düzəlt.
- Headless brauzer test skriptlərində native DOM `setSelectionRange`/dəyər dəyişikliyi
  React-in öz state-i ilə sinxron deyil — real klaviatura/mouse hadisəsi (CDP
  `Input.dispatchKeyEvent`/`dispatchMouseEvent`) istifadə et, yoxsa "bug" kimi
  görünən şey sadəcə test artefaktı ola bilər.
- Yeni runtime dependency əlavə edəndə `vite.config.ts`-in `external` siyahısını da
  yenilə (alt-path import-lar da, məs. `dayjs/plugin/customParseFormat`).

## Sürətli yoxlama

```
npm run dev             # playground
npx tsc -b               # tip yoxlaması
npm run verify            # build + lint + check:classes + check:tokens + test
```
