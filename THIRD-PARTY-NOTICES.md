# Third-party notices

`ui` is an original component library. Parts of it were derived from the open-source
projects below, whose licenses require that their copyright notices be retained. This file
satisfies that requirement; it makes no claim about the ownership of `ui` itself.

Runtime dependencies installed from npm (Radix, lucide, dayjs, framer-motion, …) are not
listed here — they are not bundled into this package and ship with their own licenses.

---

## Radix UI — MIT

Copyright (c) 2022 WorkOS

Behavioural primitives (dialog, popover, menu, …) that most components build on, plus the
`@radix-ui/colors` hue scales that `src/styles/vendor/theme/colors.css` inlines.

<https://github.com/radix-ui/primitives> · <https://github.com/radix-ui/colors>

## shadcn/ui — MIT

Copyright (c) 2023 shadcn

The component layer's starting point. shadcn/ui is distributed as source intended to be
copied into a consuming project, which is how it is used here.

<https://github.com/shadcn-ui/ui>

## Supabase design system — Apache License 2.0

Copyright (c) Supabase, Inc.

Token system, semantic color derivation and component styling were ported from Supabase's
design system (`packages/ui`, `packages/config/css`), which itself restyles shadcn/ui.
Visual design and interaction patterns are not covered by copyright; this notice covers the
source that was adapted.

<https://github.com/supabase/supabase> · <https://supabase.com/design-system>

A copy of the Apache License 2.0 is available at
<https://www.apache.org/licenses/LICENSE-2.0>.

---

## MIT License

Applies to the MIT-licensed projects above.

```
Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
```
