// Golden markup baseline (docs/hybrid-api-migration.md §8, §12 Turn 2).
//
// Renders every playground/examples/<component>/*.tsx and snapshots the normalized markup.
// These files are the fidelity contract during the hybrid API migration: once a
// component is split into -parts.tsx + hybrid file, its existing snapshot here
// must stay byte-identical — that's what proves the compound API rendered the
// same DOM before and after the refactor.
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentType } from "react";
import { describe, expect, test } from "vitest";
import { normalizeMarkup } from "./normalize";
import { ThemeProvider } from "../../src/providers";

// Playground examples normally render under main.tsx's <ThemeProvider>. Most don't need it,
// but a fragment can call useTheme() directly (CodeBlock does, matching upstream's own
// next-themes usage) — wrapping here keeps every example renderable in isolation.
function withTheme(Example: ComponentType) {
  return (
    <ThemeProvider>
      <Example />
    </ThemeProvider>
  );
}

const modules = import.meta.glob<{ default: ComponentType }>(
  "../../playground/examples/**/*.tsx",
  { eager: true },
);

// True overlay/portal examples get an additional open-state snapshot, per §8.1.
// Everything else (forms, static display, non-portal composites) only needs the
// closed/default-render snapshot below.
const CLICK_TO_OPEN = new Set([
  "dialog-demo",
  "dialog-props-demo",
  "sheet-demo",
  "sheet-props-demo",
  "drawer-demo",
  "drawer-props-demo",
  "popover-demo",
  "popover-props-demo",
  "dropdown-menu-demo",
  "dropdown-menu-props-demo",
]);
const HOVER_TO_OPEN = new Set([
  "tooltip-demo",
  "tooltip-props-demo",
  "hover-card-demo",
  "hover-card-props-demo",
]);
const OPEN_ROLE_SELECTOR = '[role="dialog"], [role="menu"], [role="tooltip"], [data-state="open"]';

function exampleName(path: string) {
  return path.split("/").pop()!.replace(/\.tsx$/, "");
}

describe("golden markup", () => {
  for (const [path, mod] of Object.entries(modules)) {
    const name = exampleName(path);
    const Example = mod.default;

    test(`${name} — default render`, async () => {
      render(withTheme(Example));
      const html = normalizeMarkup(document.body);
      await expect(html).toMatchFileSnapshot(`./${name}.html`);
    });

    if (CLICK_TO_OPEN.has(name) || HOVER_TO_OPEN.has(name)) {
      test(
        `${name} — open state`,
        async () => {
          const user = userEvent.setup();
          render(withTheme(Example));
          const trigger = document.body.querySelector("button");
          if (!trigger) throw new Error(`${name}: no trigger <button> found to open it`);

          if (CLICK_TO_OPEN.has(name)) {
            await user.click(trigger);
          } else {
            await user.hover(trigger);
          }

          await waitFor(
            () => {
              if (!document.body.querySelector(OPEN_ROLE_SELECTOR)) {
                throw new Error(`${name}: did not reach an open state`);
              }
            },
            { timeout: 3000, interval: 50 },
          );

          const html = normalizeMarkup(document.body);
          await expect(html).toMatchFileSnapshot(`./${name}.open.html`);
        },
        10000,
      );
    }
  }
});
