import { Copy } from 'lucide-react'

import { Button, FloatingPlate } from '../../../src'

export default function FloatingPlateDemo() {
  return (
    <div className="relative rounded-md border bg-[repeating-linear-gradient(45deg,var(--surface-200),var(--surface-200)_10px,transparent_10px,transparent_20px)] p-10">
      <FloatingPlate className="absolute right-2 top-2">
        <Button icon={<Copy />} aria-label="Copy" />
      </FloatingPlate>
    </div>
  )
}
