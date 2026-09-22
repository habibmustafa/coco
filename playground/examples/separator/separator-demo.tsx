import { Separator } from '../../../src'

export default function SeparatorDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-sm">Above</span>
        <Separator />
        <span className="text-sm">Below</span>
      </div>
      <div className="flex h-8 items-center gap-3">
        <span className="text-sm">Left</span>
        <Separator orientation="vertical" />
        <span className="text-sm">Right</span>
      </div>
    </div>
  )
}
