import { Container } from '../../../src'

export default function ContainerDemo() {
  return (
    <Container
      size="sm"
      padding={{ base: 'xs', md: 'lg' }}
      className="w-full rounded-md border border-dashed border-border py-4"
    >
      <div className="rounded-md border border-border bg-surface-100 p-3 text-xs text-foreground-light">
        size=&quot;sm&quot; · padding xs → lg at md
      </div>
      <Container
        size="sm"
        centered={false}
        className="mt-3 w-1/2 rounded-md border border-border bg-surface-100 p-3 text-xs text-foreground-lighter"
      >
        centered=false
      </Container>
    </Container>
  )
}
