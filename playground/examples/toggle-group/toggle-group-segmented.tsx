'use client'

import * as React from 'react'

import { ToggleGroup } from '../../../src'

const TONES = ['text', 'outline', 'primary'] as const

export default function ToggleGroupSegmented() {
  const [view, setView] = React.useState('data')

  return (
    <div className="flex flex-col gap-4">
      {TONES.map((tone) => (
        <div key={tone} className="flex items-center gap-4">
          <span className="w-16 shrink-0 text-xs text-foreground-lighter">{tone}</span>
          <ToggleGroup.Root
            type="single"
            variant="segmented"
            tone={tone}
            value={view}
            onValueChange={setView}
            allowDeselect={false}
            aria-label={`Table view (${tone})`}
          >
            <ToggleGroup.Item value="data">Data</ToggleGroup.Item>
            <ToggleGroup.Item value="definition">Definition</ToggleGroup.Item>
          </ToggleGroup.Root>
        </div>
      ))}
    </div>
  )
}
