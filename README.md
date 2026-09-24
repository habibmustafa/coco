<p align="center"><img src="public/coco-mark.svg" alt="coco" width="64" height="64" /></p>

# coco

coco üçün React komponent kitabxanası. React 19, TypeScript,
Tailwind CSS v4 və Radix üzərində qurulub. Paket özəldir, npm-də yayımlanmayıb.

37 atom və 20 fragment komponent (26-sı hibrid — həm compound, həm props-driven API), 92 işlək
nümunə playground-da göstərilir.

## Lokal işə salma

```sh
npm install
npm run dev
```

Playground: http://localhost:3000.

```sh
npm run verify     # build, tip, lint, class və canlı token yoxlaması
npm run build:lib  # dist/coco.js, coco.cjs, styles.css və index.d.ts
```

## İstifadə

Paket lokal dependency kimi qoşulduqdan sonra:

```tsx
import { Button, ThemeProvider } from 'coco'
import 'coco/styles.css'

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Button>Başla</Button>
    </ThemeProvider>
  )
}
```

`ThemeProvider` açıq, tünd və sistem temasını dəstəkləyir. Öz tema idarəetməniz varsa,
`html` elementində həm `.light`/`.dark` class-ını, həm də uyğun `data-theme` atributunu
təyin edin: tokenlər class-a, `dark:` utility-ləri isə atributa əsaslanır.

## Sənədlər

- [Cari plan və qərarlar](docs/plan.md)
- [Tarixi qərar jurnalı](docs/plan-history.md)
- [Agent üçün brifinq](docs/codex-prompt.md)
- [Loqo və brend qaydaları](docs/brand.md)
- [Üçüncü tərəf mənbə və lisenziya qeydləri](src/styles/vendor/theme/NOTICE.md)
