/*
 * Adapted from Supabase (Apache License 2.0).
 * Source: github.com/supabase/supabase/blob/master/packages/ui-patterns/src/ErrorDisplay/ErrorDisplay.tsx
 * Changes: `ui` package import replaced with our Card atom + cn helper; WarningIcon now comes
 * from our already-ported Admonition fragment instead of a sibling `../Admonition` import.
 * The "Contact support" link's default `/support/new` base path is upstream's own
 * Supabase-dashboard route (unchanged) — it is a non-functional default outside that app,
 * same as upstream's own fallback when `supportFormParams` is omitted.
 */

'use client'

import { HelpCircle } from 'lucide-react'
import { forwardRef, useEffect, useRef } from 'react'

import { CardHeader, CardRoot } from '../../atoms/layout/card'
import { cn } from '../../../lib/utils'
import { WarningIcon } from '../admonition'
import type { ErrorDisplayProps, SupportFormParams } from './error-display-types'

export type { SupportFormParams } from './error-display-types'

function buildSupportUrl(params?: SupportFormParams) {
  if (!params) return '/support/new'
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
  if (entries.length === 0) return '/support/new'
  return `/support/new?${new URLSearchParams(entries as [string, string][]).toString()}`
}

export const ErrorDisplay = forwardRef<HTMLDivElement, ErrorDisplayProps>(
  (
    {
      title,
      errorMessage,
      supportFormParams,
      supportLabel = 'Contact support',
      children,
      className,
      icon,
      onRender,
      onSupportClick,
      ...props
    },
    ref
  ) => {
    const hasFired = useRef(false)
    useEffect(() => {
      if (hasFired.current) return
      hasFired.current = true
      onRender?.()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const supportUrl = buildSupportUrl(supportFormParams)

    return (
      <CardRoot
        ref={ref}
        className={cn('rounded-lg border border-default', className)}
        role="alert"
        aria-labelledby="error-display-title"
        {...props}
      >
        <CardHeader className="flex-row items-center gap-2.5 space-y-0 p-3">
          <div className="bg-warning p-1 text-background rounded-md">
            {icon ?? <WarningIcon className="w-3 h-3" />}
          </div>
          <h3 id="error-display-title" className="text-sm text-foreground mt-0">
            {title}
          </h3>
        </CardHeader>

        <div className="px-4 py-3 bg-warning-200 border-y border-warning-500">
          <pre className="text-xs font-mono text-warning-600 whitespace-pre-wrap wrap-break-word overflow-auto max-h-32">
            {errorMessage}
          </pre>
        </div>

        {children && <div>{children}</div>}

        <div className="px-3 py-2 border-t border-default flex items-center gap-2">
          <div className="shrink-0">
            <HelpCircle className="h-4 w-4 text-foreground-muted" />
          </div>
          <span className="text-sm text-foreground-light">Need help?</span>
          <a
            href={supportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground shrink-0 underline hover:text-foreground-light transition-colors"
            onClick={onSupportClick}
          >
            {supportLabel}
          </a>
        </div>
      </CardRoot>
    )
  }
)

ErrorDisplay.displayName = 'ErrorDisplay'
