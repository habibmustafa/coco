# ui — layihə qaydaları

## Struktur

- Fayl və qovluq adları `lowercase-kebab-case`.
- Atomlar `src/components/atoms/<kateqoriya>/<ad>/`, fragmentlər
  `src/components/fragments/<ad>/` altındadır. Atomlar `lib/`-ə `../../../../lib/`,
  fragmentlər `../../../lib/` yolu ilə çatır.
- Kod, adlar və kod şərhləri ingiliscə; sənədlər Azərbaycan dilində.

## Üslub və tokenlər

- `src/styles/vendor/theme/` içindəki dəyərləri dəyişmə. Rəng dəyişikliyi lazım olarsa
  `semantic.css`-dəki giriş dəyişənlərindən (`--hue`, `--chroma`) get — qalan ~700 dəyər
  onlardan OKLCH-də törəyir, əl ilə yazılmır.
- Tailwind class adını runtime-da qurma (`gap-${n}` kimi). Literal class xəritəsi işlət;
  layout primitivlərində `layout-classes.ts` vahid mənbədir.
- `dark:` utility-ləri `data-theme*="dark"`, tokenlər isə `.dark`/`.light` ilə işləyir;
  `ThemeProvider` hər ikisini qoyur. Base üslublar `design-system-base.css`-dədir.

## Komponent yazarkən

- Mövcud komponentdə DOM, class, ARIA, focus, animasiya və davranış sadiqliyini qoru —
  dəyişiklikdən sonra golden test fərqini yoxla.
- React 19-da `ref` adi prop-dur; yeni `forwardRef` istifadə etmə.
- Yeni runtime dependency əlavə edəndə `vite.config.ts`-də external siyahısını da yenilə.
- Shiki tema qaydalarını `settings`-ə yaz, `tokenColors`-a yox.
- Windows-da qovluq köçürməzdən əvvəl dev serveri saxla.

## Hibrid API

Yalnız mənalı Root + bir neçə hissəsi olan komponent hibridləşir; tək elementə süni
compound/props ikiliyi əlavə etmə. Strategiya və tiplər üçün `docs/hybrid-api-migration.md`.

- Props rejimi `<Component ... />`; compound rejimi
  `<Component.Root><Component.Child /></Component.Root>`. Mövcud `ComponentRoot`/
  `ComponentChild` named export-ları uyğunluq üçün qalır, yeni nümunələrdə namespace
  yazılışını işlət.
- Hər hibrid playground nümunəsinin props və compound kodu `playground/registry.tsx`-də
  `codeVariants: [{ id: 'props', ... }, { id: 'compound', ... }]` cütü ilə göstərilir.
  `Preview` props nümunəsini göstərir. Hibrid olmayan nümunə tək `Preview`/`Code` rejimindədir.
- Props API nümunənin davranışını ifadə etmirsə, uydurma wrapper yazma.

## Bitirmə qaydası

`npm run verify` işlət — `build:lib`, `lint`, `check:classes`, `check:tokens`, `test`.
Xəta və golden fərqlərini araşdır; sırf testi keçirmək üçün snapshot yeniləmə.

Playground görünüşü və ya marşrutları dəyişibsə `scripts/browser-check.mjs` ilə brauzer
yoxlaması apar. Vizual ölçüləri təxmin etmə.

## Mənşə

Komponent qatı shadcn/ui və Supabase-in dizayn sistemindən törəyib; primitivlər Radix UI-dır.
Lisenziya qeydləri `THIRD-PARTY-NOTICES.md`-dədir — onları silmə.
