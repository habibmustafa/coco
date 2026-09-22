<p align="center"><img src="public/coco-mark.svg" alt="coco" width="64" height="64" /></p>

# coco

Supabase dizayn sistemi əsasında React komponent kitabxanası. React 19, TypeScript,
Tailwind CSS v4 və Radix üzərində qurulub. Paket özəldir, npm-də yayımlanmayıb.

33 atom komponent və 42 işlək nümunə playground-da göstərilir.

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

- [Plan və iş jurnalı](docs/plan.md)
- [Agent üçün brifinq](docs/codex-prompt.md)
- [Loqo və brend qaydaları](docs/brand.md)
- [Supabase mənbə və lisenziya qeydləri](src/styles/vendor/supabase/NOTICE.md)

Komponentlər və vendor üslubları Supabase mənbələrindən götürülüb; mənbə istinadları
müvafiq faylların başlığında saxlanılır.
