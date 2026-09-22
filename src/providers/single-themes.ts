/*
 * Adapted from Supabase (Apache License 2.0).
 * Source: github.com/supabase/supabase/blob/master/packages/ui/src/components/ThemeProvider/singleThemes.ts
 */

export interface SingleTheme {
  name: string
  value: string
}

export const singleThemes: SingleTheme[] = [
  { name: 'System', value: 'system' },
  { name: 'Dark', value: 'dark' },
  { name: 'Light', value: 'light' },
]
