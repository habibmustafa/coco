import { Row } from '../../../src'

export default function RowDemo() {
  return (
    <Row maxColumns={3} minWidth={160} gap={16} className="max-w-xl">
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="flex h-24 items-center justify-center rounded-md border bg-surface-100 text-sm text-foreground-light"
        >
          Item {i + 1}
        </div>
      ))}
    </Row>
  )
}
