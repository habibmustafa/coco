import { Stack } from '../../../src'

const row = 'px-3 py-2 text-xs text-foreground-light'

export default function StackDemo() {
  return (
    <Stack divider gap="none" className="w-full max-w-xs rounded-md border border-border">
      <div className={row}>Backlog</div>
      <div className={row}>In progress</div>
      <div className={row}>Review</div>
      <div className={row}>Done</div>
    </Stack>
  )
}
