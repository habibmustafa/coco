import { Flex, FlexItem } from '../../../src'

const chip = 'rounded-md border border-border bg-surface-100 px-3 py-2 text-xs text-foreground-light'

export default function FlexDemo() {
  return (
    <Flex direction="column" gap="lg" className="w-full max-w-md">
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap="sm"
        justify="between"
        className="rounded-md border border-border p-3"
      >
        <span className={chip}>base: column</span>
        <span className={chip}>sm: row</span>
        <span className={chip}>gap=&quot;sm&quot;</span>
      </Flex>

      <Flex gap="sm" wrap>
        <span className={chip}>wrap</span>
        <span className={chip}>gap=&quot;sm&quot;</span>
        <span className={chip}>token gaps</span>
      </Flex>

      <Flex gap="none" className="rounded-md border border-border p-1">
        <FlexItem
          grow={1}
          className="rounded-md bg-surface-100 p-2 text-center text-xs text-foreground-light"
        >
          grow
        </FlexItem>
        <FlexItem
          basis="1/3"
          className="rounded-md bg-surface-100 p-2 text-center text-xs text-foreground-light"
        >
          basis 1/3
        </FlexItem>
      </Flex>
    </Flex>
  )
}
