# coco — agent qaydaları

`coco` Supabase design system-inin (`supabase.com/design-system`, Apache-2.0) özəl React
kitabxanasıdır. Məqsəd vizual və davranış baxımından upstream ilə eyni nəticədir.

## İşə başlamazdan əvvəl

1. Bu faylı və cari qərar xülasəsi olan `docs/plan.md`-i oxu. Tarixi səbəb lazım olarsa
   `docs/plan-history.md`-də aid qeydə bax; köhnə planı cari tapşırıq sayma. Hibrid API-yə
   toxunanda `docs/hybrid-api-migration.md`-ə bax.
2. Dəyişəcəyin komponentin `src/` kodunu, playground nümunələrini və lazım olduqda upstream-in
   public export-unu və demosunu yoxla. Supabase-dəki hər `shadcn/ui/` faylı public deyil.
3. Mövcud işçi qovluğundakı başqa dəyişiklikləri qoruyub saxla.

## Dəyişməz qaydalar

- İstifadəçiyə cavablar və sənədlər Azərbaycan dilində; kod, adlar və kod şərhləri ingiliscə.
- Fayl və qovluq adları `lowercase-kebab-case`.
- Atomlar `src/components/atoms/<kateqoriya>/<ad>/`, fragmentlər
  `src/components/fragments/<ad>/` altındadır. Atomlar `lib/`-ə `../../../../lib/`,
  fragmentlər `../../../lib/` yolu ilə çatır.
- `src/styles/vendor/theme/` içindəki dəyərləri dəyişmə. Mənbə və lisenziya məlumatı həmin
  qovluğun `NOTICE.md` faylındadır; paylamadan əvvəl fayl səviyyəli bildirişləri yoxla.
- Mövcud komponentdə DOM, class, ARIA, focus, animasiya və davranış sadiqliyini qoru.
  İlk portda upstream-in public faylını götür, yalnız import yollarını uyğunlaşdır; upstream
  demosunu da gətir. Mövcud hibriddə daxili refaktor mümkündür, nəticəni golden testlə yoxla.
- Tailwind class adını runtime-da qurma (`gap-${n}` kimi). Literal class xəritəsi işlət;
  layout primitivlərində `layout-classes.ts` vahid mənbədir.
- `dark:` utility-ləri `data-theme*="dark"`, tokenlər isə `.dark`/`.light` ilə işləyir;
  `ThemeProvider` hər ikisini qoyur. Base üslublar `design-system-base.css`-dədir.
- Yeni runtime dependency əlavə edəndə `vite.config.ts`-də external siyahısını da yenilə.
- React 19-da `ref` adi prop-dur; yeni `forwardRef` istifadə etmə. Shiki tema qaydalarını
  `settings`-ə yaz, `tokenColors`-a yox. Windows-da qovluq köçürməzdən əvvəl dev serveri saxla.

## Hibrid API və nümunələr

- Yalnız mənalı Root + bir neçə hissəsi olan komponent hibridləşir. Tək elementə süni
  compound/props ikiliyi əlavə etmə. Strategiya və tiplər üçün `docs/hybrid-api-migration.md`.
- Props rejimi `<Component ... />`; compound rejimi
  `<Component.Root><Component.Child /></Component.Root>`. Mövcud `ComponentRoot` və
  `ComponentChild` named export-ları uyğunluq üçün qalır, yeni nümunələrdə namespace yazılışını
  işlət.
- Hər hibrid playground nümunəsinin props və compound kodu `playground/registry.tsx`-də
  `codeVariants: [{ id: 'props', ... }, { id: 'compound', ... }]` cütü ilə göstərilir.
  `Preview` props nümunəsini göstərir. Hibrid olmayan nümunə tək `Preview`/`Code` rejimindədir.
- Props API nümunənin davranışını ifadə etmirsə, uydurma wrapper yazma; səbəbini `plan.md`-də
  qeyd et. Props API genişlənməsi ayrıca əsaslandırılmış dəyişiklikdir.

## Bitirmə qaydası

- Qərarı və görülən işi **eyni turda** `docs/plan.md`-ə yaz. Tarixi arxivi dəyişmə;
  düzəlişi yeni cari qərar kimi qeyd et.
- `npm run verify` işlət: `build:lib`, `lint`, `check:classes`, `check:tokens`, `test`.
  Xəta və golden fərqlərini araşdır; sırf testi keçirmək üçün snapshot yeniləmə.
- Playground görünüşü və ya marşrutları dəyişibsə, lazım olduqda `scripts/browser-check.mjs`
  ilə brauzer yoxlaması apar. Vizual ölçüləri təxmin etmə; upstream HTML/CSS-ə bax.
