import type { ReactNode } from 'react'

export function Preview({
  label,
  children,
  align = 'center',
}: {
  label: string
  children: ReactNode
  align?: 'center' | 'start'
}) {
  return (
    <div className="mt-4 mb-12">
      <p className="mb-2 font-mono text-xs uppercase text-foreground-muted">{label}</p>
      <div
        className={`flex min-h-24 flex-wrap items-center gap-3 rounded-md border bg-studio p-6 ${
          align === 'center' ? 'justify-center' : 'justify-start'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export function Swatch({ token, className }: { token: string; className: string }) {
  return (
    <div className="flex w-32 flex-col gap-1.5">
      <div className={`h-12 rounded-md border ${className}`} />
      <span className="truncate font-mono text-[11px] text-foreground-light">{token}</span>
    </div>
  )
}
