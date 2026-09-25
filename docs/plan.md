# Plan — cari vəziyyət və qərarlar

> Son yenilənmə: 2026-09-24 (#51). Bu fayl cari qərarların qısa mənbəyidir.
> Tam qərar, düzəliş və icra jurnalı [plan-history.md](plan-history.md)-də saxlanılır.
> Köhnə qeydlə cari qərar toqquşanda cari qərar əsas götürülür. Yeni qərarı və görülən işi
> **eyni turda** burada qeyd et; tarixi arxivi geriyə dönük dəyişmə.

## Vəziyyət

`coco` Supabase design system-inin Apache-2.0 əsaslı, hələ yayımlanmayan React kitabxana
portudur. Atom və fragment turları tamamlanıb. 26 komponent hibriddir; uyğun komponentlər
eyni importdan props-driven və compound API verir. `Chart` yalnız bar chart üçün ayrıca,
qismən props API alıb. Beş layout primitivi (`Box`, `Container`, `Flex`, `Grid`, `Stack`)
coco əlavəsidir, upstream portu deyil. `form-fields` fragmenti (`FormInput`, `FormTextarea`,
`FormSelect`, `FormCheckbox`, `FormSwitch`, `FormRadioGroup`, `FormDatePicker`) də eyni
şəkildə coco əlavəsidir — `react-hook-form`+`zod` üçün `FormField`/`FormItem`/`FormLabel`/
`FormControl`/`FormMessage` ceremony-sini bir sətirlik `<FormInput name="..." label="..." />`
formasına yığır, `name`-ə görə `Form` (FormProvider) context-indən `control`-u avtomatik tapır.

Playground route-ları `/components/<id>` formatındadır. Komponent siyahısı, route-lar və
kod nümunələri `playground/registry.tsx`-də idarə olunur. 82 hibrid nümunə
`Props-driven`/`Compound` kod cütü göstərir; `Preview` props rejimini render edir.
Son `npm run verify` nəticəsi: build, lint, class/token yoxlamaları və **296 test** keçib.
Bu nəticə növbəti dəyişikliyin baseline-ıdır; yeni işdən sonra yenidən yoxla. `date-field`
atomu (`src/components/atoms/forms/date-field/`) da `form-fields` kimi coco əlavəsidir —
detalı #47-də. `DatePicker` (`mode:'single'` halında) indi trigger olaraq bunu göstərir —
#48-də. Hər ikisi MUI-X `DatePicker` parity işinin fazalı icrasıdır, tam yol xəritəsi
`clever-mapping-rivest.md` plan faylındadır.

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

## Son qərar — #46 (2026-09-24)

İstifadəçi mövcud `FormField`/`FormItem`/`FormLabel`/`FormControl`/`FormMessage`
kompozisiyasının hər sahə üçün həddindən artıq təkrar kod tələb etdiyini bildirdi; `useForm`
+ `zod` saxlanılmaqla daha qısa API istəndi. Cavab olaraq yeni
`src/components/fragments/form-fields/` fragmenti yazıldı: `FormInput`, `FormTextarea`,
`FormSelect`, `FormCheckbox`, `FormSwitch`, `FormRadioGroup`, `FormDatePicker` — hər biri
daxildə `FormField` (`useController`) çağırır, `FormItemLayout`-un (`Input`/`Textarea`/
`Select`/`RadioGroup` üçün) `isReactForm`+`FormItem` context-i vasitəsilə error/label/
description-u avtomatik göstərir. `Checkbox`/`Switch` üçün ayrıca inline label+description
sarğısı var (`FormItemLayout`-un label-üstdə grid-i checkbox/switch-ə uyğun deyil). Atomların
özü (Input, Textarea, Checkbox, Switch, Select, RadioGroup, DatePicker, FormItemLayout)
toxunulmadı — bu fragment sırf üstlərinə nazik bir qat əlavə edir, formadan kənar istifadəyə
təsiri yoxdur. Bu, upstream-dən port deyil, coco-nun öz əlavəsidir (layout primitivləri kimi).

Playground-a `form-fields` route-u və `form-fields-demo.tsx` (username/bio/role/plan/terms
sahələri ilə realistik nümunə) əlavə olundu. `npm run verify` yaşıl keçdi (295 test).
Headless Chrome ilə həm yeni `form-fields` demosunda, həm də əvvəldən mövcud
`input-form.tsx` (`Form` route) demosunda submit-dən sonra error mesajının görünüb-görünmədiyi
CDP vasitəsilə yoxlandı — hər ikisində eyni nəticə (error DOM-da görünmür) alındı, yəni bu
`form-fields`-ə xas reqressiya deyil, sintetik CDP click-in real brauzer davranışını tam
canlandırmamasıdır. Real brauzerdə əl ilə sınaqdan keçirmək faydalı olardı, amma kod tərəfi
(`FormItemLayout`-un `isReactForm`/`FormItem` context zənciri) mövcud, artıq işlək nümunə ilə
eyni mexanizmi istifadə edir.

**Əlavə (eyni gün):** istifadəçi `form-fields-demo.tsx`-də `FormSwitch`/`FormDatePicker`-in
nümayiş olunmadığını qeyd etdi (fragmentin 7 komponentindən yalnız 5-i demoda var idi).
Demoya `renewalDate` (`FormDatePicker`, zod `z.date()`) və `notifications` (`FormSwitch`, zod
`z.boolean()`) sahələri əlavə olundu; bütün 7 komponent artıq tək demoda göstərilir.

## Son qərar — #47 (2026-09-24)

İstifadəçi `DatePicker`-i MUI-nin `DatePicker`-i kimi — seqmentli, əl ilə yazıla bilən sahəyə
çevirmək istədi (bire-bir funksionallıq parity), açıq şəkildə **fazalara bölünmüş, hər faza
ayrıca təsdiqlənən** iş kimi. Tam plan `EnterPlanMode` ilə yazılıb təsdiqləndi (arxiv:
Claude Code plan tarixçəsi, `clever-mapping-rivest.md`). Yol xəritəsi: Faza 1 — headless
`DateField` atomu (calendar olmadan); Faza 2 — `DatePicker`-ə inteqrasiya (trigger-button
`DateField`+ikon-adornment ilə əvəzlənir); Faza 3 — validasiya/MUI detalları (min/max,
invalid state, Enter/Escape); Faza 4 — `FormDatePicker` köçürülməsi, range qərarı.

**Faza 1 tamamlandı:** `src/components/atoms/forms/date-field/` — yeni, upstream portu
olmayan coco atomu (layout primitivləri presedentinə uyğun). `use-date-field-state.ts`
headless hook-u format string-i (`YYYY`/`MM`/`DD` + literal ayırıcılar) sabit-enli seqmentlərə
ayrıştırır; `date-field.tsx` tək native `<input>` render edir, aktiv seqmenti brauzerin öz
mətn seçimi (`setSelectionRange`) ilə göstərir — MUI-nin əsl `DateField`-inin texnikası,
InputOTP-nin çoxlu saxta slot yanaşması deyil (bu halda seqmentlər fərqli enlərdə olduğu üçün
sabit sayda slot mənası yoxdur). Dəstəklənən davranış: rəqəm yazma + avtomatik növbəti seqmentə
keçid (dəyər maksimumu keçəcəksə tək rəqəmdən sonra da), ArrowUp/Down ilə addım (dövrəli),
ArrowLeft/Right/Home/End ilə naviqasiya, Backspace ilə aktiv seqmenti təmizləmə (boşdursa
əvvəlkinə keçib onu təmizləmə), klikləmə ilə seqment seçimi, tam tarix paste-i
(`dayjs(text, format, true)` ilə strict parse). Tarix formatlaşdırma/parse üçün `date-fns`
yox, artıq asılılıq olan `dayjs` (+ `dayjs/plugin/customParseFormat`, `vite.config.ts`
external siyahısına əlavə olundu) istifadə edildi. Controlled/uncontrolled dəyər
`src/lib/use-controllable-state.ts` ilə idarə olunur. min/max/disabled-date validasiyası və
calendar/popover inteqrasiyası **qəsdən Faza 1-də deyil** — sonrakı fazalara saxlanılıb.

Playground-a `date-field` girişi (`Atom components`) və `date-field-demo.tsx` əlavə olundu.
`npm run verify` yaşıl keçdi (build, lint, check:classes, check:tokens, 296 test — köhnəlmiş
`form-fields-demo.html` golden snapshot-u da bu turda yeniləndi, yuxarıdakı demo əlavəsinə görə
gözlənilən dəyişiklik idi). Headless Chrome ilə əl ilə funksional yoxlama aparıldı: tam tarix
yazma+avtomatik keçid, ArrowLeft+ArrowUp ilə ay dəyişdirmə, Backspace ilə seqment təmizləmə,
klikləmə ilə gün seqmentinə keçib üzərinə təzə yazma, və tam tarix paste-i — hamısı gözlənilən
nəticəni verdi.

Faza 1 icra zamanı istifadəçi `date-field.tsx`-də default `format`-ı `'MM/DD/YYYY'`-dən
`'DD.MM.YYYY'`-ə dəyişdi (koddan kənar, birbaşa fayl düzəlişi) — qəsdən edildiyi qəbul edilib,
geri qaytarılmadı.

Faza 2 (DatePicker-ə inteqrasiya) üçün ayrıca plan/təsdiq lazımdır.

## Son qərar — #48 (2026-09-24)

**Faza 2 tamamlandı** (#47-in davamı, `docs/plan-history.md`-də deyil, `clever-mapping-rivest.md`
plan faylında ətraflı yazılıb): `DateField` `DatePicker`-ə inteqrasiya olundu. Yeni compound
hissə `DatePickerField`
(`src/components/fragments/date-picker/date-picker-parts.tsx`) — `DateField` + calendar-ikon
düymə (bu düymə həqiqi `PopoverTrigger`-dir). `DatePickerHybrid`
(`date-picker.tsx`) `calendarProps.mode === 'single'` olduqda köhnə mətn-label
`DatePickerButton` yerinə bunu göstərir; `calendarProps.selected`/`onSelect` tək mənbə
kimi qalır — `DateField`-in `value`/`onChange`-i birbaşa oradan körpülənir, əlavə state
yoxdur. `mode: 'range'`/`'multiple'` **toxunulmadı**, köhnə düymə-trigger olaraq qalır
(golden snapshot testləri bunu təsdiqlədi — yalnız 3 single-mode demo +
`form-fields-demo` dəyişdi, range/multiple dəyişmədi). Yeni props-mode prop-u:
`format?: string` (yalnız single-mode field-ə ötürülür). Kalendarın açılan ayı indi yazılan
tarixə uyğun naviqasiya edir (`defaultMonth` calendarProps.selected-dən, caller özü
`defaultMonth` verməyibsə) — Popover content Radix-in defolt davranışı ilə hər açılışda
yenidən mount olunduğu üçün bu düzgün işləyir.

`FormDatePicker` (`form-fields.tsx`) kod dəyişmədi — `mode:'single'` istifadə etdiyi üçün
avtomatik yeni field-trigger aldı (golden snapshot fərqi elə budur).

Headless Chrome-da yoxlanıldı: sahəyə yazma (`14.07.1990`) ✓, ikona klikləyib popover
açılması ✓, calendar həmin ayı (iyul 1990) göstərməsi ✓, calendardan fərqli gün (20)
seçəndə sahənin `20.07.1990`-a yenilənməsi ✓ (iki-tərəfli sinxronizasiya). `npm run verify`
yaşıl (296 test, 4 gözlənilən golden snapshot yeniləndi: `date-picker-props-demo`,
`date-picker-form-props-demo`, `date-picker-with-presets-props-demo`, `form-fields-demo`).

Faza 3 (min/max, disabled-date, invalid state, Enter/Escape, clear düyməsi) və Faza 4
(range qərarı, `FormDatePicker` təmizliyi) hələ başlanmayıb — ayrıca təsdiqlə.

**Əlavə düzəliş (eyni gün):** istifadəçi tam tarix yazıldıqdan sonra əlavə rəqəm
yazmağın mümkün olduğunu bildirdi — son seqment (il) doldurulub daha növbəti seqmentə
keçid olmadığı üçün `handleDigit` köhnə bufferin üstünə yazmağa davam edir, sabit-enli
seqmenti aşırdı (məs. il "1990" + "5" → "19905"). Fix:
`use-date-field-state.ts`-də `handleDigit` indi seqment artıq dolu olub istifadəçi ora
təzədən naviqasiya etməyibsə (`freshEntryRef.current === false`) əlavə rəqəmi sadəcə
görməzdən gəlir. Headless Chrome-da 8 rəqəmlik tam tarixdən sonra 10 əlavə rəqəm yazılıb
sahənin `"14.07.1990"` olaraq dəyişmədiyi təsdiqləndi. `npm run verify` yaşıl (296 test,
golden snapshot dəyişikliyi tələb olunmadı).

## Son qərar — #49 (2026-09-24)

**Faza 3 tamamlandı** (roadmap: `clever-mapping-rivest.md`). `DateField`
(`use-date-field-state.ts`) indi opsional `minDate`/`maxDate`/`isDateInvalid` qəbul edir —
tam tarix formalaşanda bu şərtlər yoxlanılır (yazma zamanı bloklama yoxdur, MUI kimi
yalnız error göstərilir), nəticə `invalid` state-i olaraq `aria-invalid`-ə çıxır
(`InputVariants`-ın artıq mövcud `aria-[invalid=true]:...` qaydaları avtomatik tətbiq
olunur, əlavə class lazım olmadı). `DatePicker` bunu `calendarProps.disabled`
(react-day-picker `Matcher`) ilə körpüləyir —
`dateMatchModifiers` (react-day-picker-in öz export etdiyi utility, özümüz yenidən
yazmadıq) hər tam yazılan tarixi calendar-ın disabled-matcher-i ilə yoxlayır.
`DatePickerField`-ə həmçinin təmizləmə (`X`, `aria-label="Clear date"`) düyməsi əlavə
olundu — dəyər olduqda calendar-ikonunun solunda görünür, klik `onChange(null)` çağırır
(sahənin sağ padding-i indi sabit `pr-14`, iki düymə üçün yer saxlanılır).

Escape/Enter ayrıca kod tələb etmədi: Radix `Popover`-in öz dismissable-layer-i Escape-i
artıq bağlayır (DateField heç bir keydown-da `stopPropagation()` çağırmır), Enter isə
native `<input>`-un daxil olduğu formu submit edir (`FormDatePicker` üçün doğru davranış) —
hər ikisi headless Chrome-da təsdiqləndi, kod dəyişikliyi olmadı.

`playground/examples/date-field/date-field-demo.tsx` `minDate`/`maxDate` (2020–2030)
nümayiş etdirəcək şəkildə yeniləndi (statik sabitlər, golden snapshot-a təsir etmədi).
Headless Chrome-da yoxlanıldı: 2025-ci il tarixi `aria-invalid="false"`, 2040-cı il
`aria-invalid="true"` ✓; DatePicker-də clear düyməsi dəyəri təmizləyir ✓; icon-a klikləyib
popover açandan sonra Escape onu bağlayır ✓. `npm run verify` yaşıl (296 test, 5 gözlənilən
golden snapshot yeniləndi — `aria-invalid="false"` indi hər zaman render olunur və
`pr-8`→`pr-14` dəyişdi: `date-field-demo`, `date-picker-props-demo`,
`date-picker-form-props-demo`, `date-picker-with-presets-props-demo`, `form-fields-demo`).

Faza 4 (range qərarı, `FormDatePicker`-ə `minDate`/`maxDate` ötürülməsi/təmizlik) hələ
başlanmayıb — ayrıca təsdiqlə.

## Son qərar — #50 (2026-09-24)

**Faza 4 tamamlandı — DatePicker MUI-parity işi bağlandı.**

**Range qərarı (istifadəçi ilə təsdiqləndi):** `calendarProps.mode:'range'`/`'multiple'`
həmişəlik köhnə mətn-düymə (`DatePickerButton`) trigger ilə qalır — yekun qərar, əlavə iş
planlanmır. Səbəb: MUI-də də range ayrı komponentdir (`DateRangePicker`); bizim
`DatePicker` yalnız tək-tarix üçün tam parity hədəfləyir. Range dəstəyi gələcəkdə lazım
olsa, ayrıca yeni tapşırıq kimi başlanmalıdır (bu fayldakı iş kimi davam sayılmır).

**`FormDatePicker` təmizliyi** (`src/components/fragments/form-fields/form-fields.tsx`):
`placeholder`/`formatDate` prop-ları silindi — hər ikisi Faza 2-dən bəri ölü kod idi,
çünki `DatePicker` `mode:'single'`-da artıq mətn-label yox, typeable field göstərir
(`triggerLabel` field-mode-da istifadə olunmur). Heç bir playground nümunəsi bu iki
prop-u işlətmirdi (yoxlanıldı). Əvəzində `format?: string`, `minDate?: Date`,
`maxDate?: Date` əlavə olundu — birbaşa `DatePicker`-ə ötürülür. `disabled` prop-u
dəyişmədi. `npx tsc -b` təmiz keçdi (silinən prop-ların heç yerdə istifadə olunmadığını
təsdiqlədi), `npm run verify` yaşıl (296 test, golden snapshot dəyişikliyi tələb
olunmadı).

**Ümumi xülasə (Faza 1–4):** `DatePicker` indi (tək-tarix halında) MUI-nin öz
`DatePicker`-i ilə funksional parity-dədir — seqmentli yazıla bilən sahə (gün/ay/il, ox
düymələri, backspace, paste), calendar-ikon adornment, iki-tərəfli calendar sinxronu,
min/max + disabled-date validasiyası (aria-invalid), clear düyməsi, Escape ilə bağlanma.
Yeni fayllar: `src/components/atoms/forms/date-field/` (atom, upstream portu deyil,
coco əlavəsi). Dəyişən fayllar: `src/components/fragments/date-picker/*`,
`src/components/fragments/form-fields/form-fields.tsx`. Tam texniki detal
`docs/plan-history.md`-ə köçürülmədi — bu sənəddə #47–#50 qeydlərində və Claude Code-un
`clever-mapping-rivest.md` plan tarixçəsində qalır.

## Son qərar — #51 (2026-09-24)

**Faza 5** (istifadəçinin real brauzerdə DatePicker-i sınaqdan keçirdikdən sonra bildirdiyi
4 əlavə düzəliş) tamamlandı:

1. **Popover indi sahənin (input-un) sol kənarından açılır, ikondan yox.** Faza 2-də
   `PopoverTrigger` calendar-ikonunu əhatə etdiyi üçün Radix popover-i ikona görə
   mövqələndirirdi; `DatePickerField`-in bütün konteyner `div`-i `PopoverAnchor asChild`
   ilə saraldı (`date-picker-parts.tsx`) — popover indi anchor-a (bütöv sahə) görə açılır.
2. **Tarix seçilən kimi popover avtomatik bağlanır** — `date-picker.tsx`-də `open`/
   `onOpenChange` `useControllableState` ilə idarə olunur (caller-in öz `open`/`defaultOpen`/
   `onOpenChange`-i varsa hörmət edilir); `handleSingleSelect` həm sahənin yazma-ilə-tamamlanan
   `onChange`-i, həm `Calendar`-ın gün-klikinin `onSelect`-i kimi paylaşılır — hər iki yol tam
   tarix formalaşan kimi `setOpen(false)` çağırır.
3. **Ay/il seçimi üçün MUI-tipli grid naviqasiya** — əvvəlki cəhd
   (`captionLayout="dropdown"`, react-day-picker-in native `<select>`-i) istifadəçi tərəfindən
   açıq rədd edildi ("dropdown yox, günlər yerində aylar 3x3 kimi, illərdə eyni məntiq"), geri
   qaytarıldı. Yeni fayl **`src/components/fragments/date-picker/date-picker-calendar-nav.tsx`**
   — `DatePickerCalendar`: gün görünüşündə ay-başlığı (ikonsuz, sadə hover) klikləndikdə 12-ay
   grid-inə (3 sütun), oradan il başlığı klikləndikdə 12-illik səhifələnən il grid-inə keçir;
   il seçəndə ay grid-inə, ay seçəndə gün görünüşünə qayıdır (`Calendar`-a `month`/
   `onMonthChange` tam idarə olunan şəkildə ötürülür). `Calendar` atomu özü toxunulmadı —
   naviqasiya `DatePicker` səviyyəsində, atomun üstündə qurulub. `framer-motion`
   `AnimatePresence`/`motion.div` ilə görünüşlər arasında qısa fade keçidi (0.12s) əlavə
   olundu (istifadəçinin "seçimlər transition animasiyalı olsun" tələbi); grid-lər `p-2`/
   `gap-1`/`h-8` ilə əvvəlki `p-3`/`h-9`-dan daha kompakt edildi (istifadəçinin "dizaynı
   kompakt edək" tələbi). "İkonlar əvvəlki yaxşı idi" rəyi — ay/il başlığına caret/dropdown
   ikonu əlavə edilmədiyi (yalnız yüngül hover) təsdiqi kimi qəbul edildi, əlavə kod tələb
   etmədi.
4. **Gün seqmentinin maksimumu aydan/ildən asılıdır** — `use-date-field-state.ts`-ə
   `getDaysInMonth(monthBuffer, yearBuffer)` köməkçisi əlavə olundu; `commit()` gün+ay+il
   hamısı tam olanda günü faktiki ay uzunluğuna (`dayjs(...).daysInMonth()`) klemp edir (məs.
   `31.02.2024` → `29.02.2024`, leap year; `31.02.2023` → `28.02.2023`). `step()`
   (ArrowUp/Down) də bu dinamik maksimumu istifadə edir. **Diqqət:** `handleDigit`-in yazma-
   zamanı erkən-tamamlama yoxlaması **bilərəkdən** statik 31 saxlanıldı, dinamik max yox —
   sınaqda real bug tapıldı: yazma zamanı ay/il bufferləri köhnə (əvvəlki tam tarixdən qalma)
   ola bilər (məs. Home-la sıfırdan yenidən yazarkən), dinamik max həmin köhnə ay/ilə görə
   günü vaxtından əvvəl səhv klemp edirdi (`31.02.2024` sonra Home+`31022023` yazanda nəticə
   `03.10.2202` kimi qarışırdı). Yeganə doğru mənbə `commit()`-dəki retroaktiv klemp-dir
   (bütün 3 seqment TAM olanda işləyir, köhnə buferlərə söykənmir).

Headless Chrome-da bütün 4 maddə DOM-based yoxlama ilə təsdiqləndi (vizual screenshot deyil,
`className`-də dəqiq `bg-accent` token yoxlaması — ilk cəhddə screenshot-da "iki ay
işıqlanmış kimi" görünmə sadəcə CDP-nin sınaq skriptində siçanı klikdən sonra
hərəkət etdirməməsindən yaranan `:hover` artefaktı idi, real bug deyildi). `npm run verify`
yaşıl (296 test, golden snapshot dəyişikliyi tələb olunmadı — popover content default bağlı
render olunur, snapshot-lar bundan təsirlənmir).

Bu, DatePicker MUI-parity işinin bu sessiyadakı son fazasıdır.

**Əlavə (eyni gün):** istifadəçinin sonrakı tələbinə görə gün-görünüşünün xanaları da
kompaktlaşdırıldı — `DatePickerCalendar`-da `Calendar`-a `classNames={{weekday,day,day_button}}`
override-i ilə (`w-9`/`h-9` → `w-8`/`h-8`), `Calendar` atomunun özü toxunulmadı (digər
Calendar istifadəçiləri upstream ölçüsündə qalır — dəyişiklik yalnız `DatePicker`
kontekstinə aiddir). Animasiya işləri üçün istifadəçi https://www.rareui.com/-i referans
verdi, yaddaşa (`reference-animation-inspiration.md`) yazıldı. (rareui.com sayta bot-qoruması
görə nə `WebFetch`, nə headless Chrome ilə daxil olmaq mümkün olmadı — istifadəçi bu
mövzunu bağladı, "unut" dedi.)

**Əlavə (2026-09-25):** istifadəçi popover-un hündürlüyünün çox olduğunu bildirdi —
`DatePickerCalendar`-da gün-görünüşünün `Calendar`-ına `classNames={{month:'space-y-2',
week:'mt-1'}}` override-i əlavə olundu (əvvəlki `space-y-4`/`mt-2`-dən sıxlaşdırıldı,
`Calendar` atomunun özü yenə toxunulmadı). Ayrıca ay-dəyişmə ikonlarının rəngini
"vurğulu/brand" etmək cəhdi edildi (`text-brand-600`/`border-brand-500`), amma istifadəçi
bunun **dark theme-də ikonu demək olar qara/görünməz etdiyini** bildirdi (`--brand-600`
dark-da aşağı-lightness dəyərə düşür) — bu dəyişiklik tam geri qaytarıldı, ikonlar
əvvəlki neytral `opacity-50 hover:opacity-100` stilinə qayıtdı. Nəticə: yalnız hündürlük
sıxlaşdırması qaldı, rəng toxunulmadı. `npm run verify` yaşıl (296 test).
