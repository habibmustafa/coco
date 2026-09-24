import { Box } from '../../../src'

export default function BoxDemo() {
  return (
    <Box
      as="section"
      p="md"
      className="w-full max-w-md rounded-md border border-border bg-surface-100"
    >
      <Box as="h3" className="font-mono text-xs uppercase text-foreground-lighter">
        Box
      </Box>
      <Box mt="sm" className="text-sm text-foreground-muted">
        Spacing comes from the token scale:{' '}
        <Box as="code" className="font-mono text-foreground-light">
          p=&quot;md&quot;
        </Box>{' '}
        is padding 4.
      </Box>
      <Box as="ul" mt="sm" className="flex flex-col gap-1 text-sm text-foreground-light">
        <Box as="li">Renders any element via as</Box>
        <Box as="li">Token spacing: p, px, py, m, mx, my…</Box>
        <Box as="li">Passes through className and native props</Box>
      </Box>
    </Box>
  )
}
