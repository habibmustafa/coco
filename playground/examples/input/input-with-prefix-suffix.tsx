import { Search } from 'lucide-react'

import { Input } from '../../../src'

export default function InputWithPrefixSuffix() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Input prefix={<Search className="h-4 w-4" />} placeholder="Search..." />
      {/* `type="text"` + `inputMode="decimal"` — `type="number"` keeps its native
          spin-button/focus chrome across browsers even with `appearance-none`, the
          usual reason to avoid it for a custom-styled numeric-looking field. */}
      <Input prefix="$" suffix="USD" type="text" inputMode="decimal" placeholder="0.00" />
    </div>
  )
}
