import { AspectRatio } from '../../src'

export default function AspectRatioDemo() {
  return (
    <div className="w-full max-w-sm">
      <AspectRatio ratio={16 / 9}>
        <div className="flex h-full w-full items-center justify-center rounded-md border bg-surface-200 text-sm text-foreground-light">
          16 / 9
        </div>
      </AspectRatio>
    </div>
  )
}
