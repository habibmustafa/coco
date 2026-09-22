import { Check, Copy } from 'lucide-react'
import { codeToHtml } from 'shiki'
import { useEffect, useState, type ComponentType } from 'react'

import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '../src'
import { supabaseCodeTheme } from './shiki-theme'

const demos = import.meta.glob<{ default: ComponentType }>('./examples/*.tsx', { eager: true })
const sources = import.meta.glob<string>('./examples/*.tsx', {
  query: '?raw',
  import: 'default',
  eager: true,
})

// The examples import from the library source; show the package name instead so
// the snippet reads the way a consumer would write it.
function presentSource(source: string) {
  return source.replace(/(['"])\.\.\/\.\.\/src\1/g, "'coco'").trim()
}

function useHighlighted(source: string) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    let active = true

    codeToHtml(source, { lang: 'tsx', theme: supabaseCodeTheme }).then((result) => {
      if (active) setHtml(result)
    })

    return () => {
      active = false
    }
  }, [source])

  return html
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <button
      type="button"
      aria-label="Copy code"
      onClick={() => {
        navigator.clipboard.writeText(value).then(() => setCopied(true))
      }}
      className="focus-ring absolute right-2 top-2 z-10 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-border bg-surface-100 text-foreground-lighter transition-colors hover:text-foreground"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  )
}

export function ComponentPreview({ name, label }: { name: string; label?: string }) {
  const key = `./examples/${name}.tsx`
  const Demo = demos[key]?.default
  const source = presentSource(sources[key] ?? '')
  const html = useHighlighted(source)

  if (!Demo) {
    return (
      <p className="text-sm text-destructive">
        Missing example: <code className="font-mono">{key}</code>
      </p>
    )
  }

  return (
    <div className="@container mt-4 mb-12">
      {label ? (
        <p className="mb-2 font-mono text-xs uppercase text-foreground-muted">{label}</p>
      ) : null}

      <Tabs defaultValue="preview">
        <TabsList className="gap-5">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsIndicator />
        </TabsList>

        <TabsContent value="preview">
          <div className="relative overflow-hidden rounded-md border bg-studio">
            <div className="z-0 pointer-events-none absolute h-full w-full bg-[radial-gradient(oklch(from_var(--foreground-default)_l_c_h_/_0.02)_1px,transparent_1px)] bg-size-[16px_16px] mask-[radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            <div className="z-10 relative">
              <div className="preview flex min-h-[256px] w-full flex-wrap items-center justify-center gap-3 p-10">
                <Demo />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code">
          <div className="relative w-full overflow-hidden rounded-md border bg-surface-75/75">
            <CopyButton value={source} />
            <div
              className="code-content max-h-[650px] overflow-x-auto px-4 py-4 font-mono text-sm [&_pre]:my-0 [&_pre]:bg-transparent!"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
