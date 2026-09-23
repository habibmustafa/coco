/*
 * Adapted from Supabase (Apache License 2.0).
 * Source: github.com/supabase/supabase/blob/master/packages/ui-patterns/src/Admonition/Admonition.constants.ts
 * Changes: import path only (./Admonition.types -> ./admonition-types).
 */

import type { AdmonitionType } from './admonition-types'

export const TYPE_TO_VARIANT = {
  note: 'default',
  caution: 'warning',
  danger: 'destructive',
  deprecation: 'warning',
  default: 'default',
  warning: 'warning',
  destructive: 'destructive',
  success: 'default',
} as const satisfies Record<AdmonitionType, 'default' | 'warning' | 'destructive'>

export const TYPE_LABEL = {
  note: 'Note',
  caution: 'Caution',
  danger: 'Danger',
  deprecation: 'Deprecated',
  default: 'Note',
  warning: 'Warning',
  destructive: 'Danger',
  success: 'Success',
} as const satisfies Record<AdmonitionType, string>
