<p align="center"><img src="https://raw.githubusercontent.com/habibmustafa/coco/main/public/ui-mark.svg" alt="ui" width="64" height="64" /></p>

# ui

React komponent kitabxanası. React 19, TypeScript,
Tailwind CSS v4 və Radix üzərində qurulub.

```sh
npm i @habibmustafa/ui
```

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
npm run build:lib  # dist/index.js, index.cjs, styles.css və index.d.ts
```

## İstifadə

Paket React 19 tələb edir (peer dependency):

```tsx
import { Button, ThemeProvider } from '@habibmustafa/ui'
import '@habibmustafa/ui/styles.css'

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

- [Layihə qaydaları](CONTRIBUTING.md)
- [Hibrid API](docs/hybrid-api-migration.md)
- [Loqo və brend qaydaları](docs/brand.md)
- [Üçüncü tərəf mənbə və lisenziya qeydləri](THIRD-PARTY-NOTICES.md)
