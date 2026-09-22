// Based on supabase/supabase packages/ui (Apache-2.0). Modified: hybrid props API.
//
// Chart has no compound "root" to make dual-purpose — ChartContainer already accepts
// arbitrary Recharts children (Bar/Line/Pie/...) and composing a chart is inherently
// open-ended, not a bounded item list. `Chart` is a new, additive, props-only convenience
// for the one composition this project has an upstream reference for (a grouped bar chart,
// per chart-bar-demo.tsx) — it does not replace ChartContainer, which stays the way to build
// any other chart type.
import type * as React from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from './chart'
import type { ChartConfig } from './chart'

export interface ChartSeries {
  key: string
  label?: React.ReactNode
  color?: string
}

export interface ChartProps {
  data: readonly Record<string, unknown>[]
  series: readonly ChartSeries[]
  /** Data key used for the x-axis category labels. */
  xKey: string
  className?: string
  /** @default true */
  showTooltip?: boolean
  /** @default false */
  showLegend?: boolean
  /** @default false */
  showGrid?: boolean
}

export function Chart({
  data,
  series,
  xKey,
  className,
  showTooltip = true,
  showLegend = false,
  showGrid = false,
}: ChartProps) {
  const config: ChartConfig = Object.fromEntries(
    series.map((item) => [item.key, { label: item.label ?? item.key, color: item.color }])
  )

  return (
    <ChartContainer config={config} className={className}>
      <BarChart accessibilityLayer data={data as Record<string, unknown>[]}>
        {showGrid && <CartesianGrid vertical={false} />}
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} />
        {showTooltip && <ChartTooltip content={<ChartTooltipContent />} />}
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((item) => (
          <Bar key={item.key} dataKey={item.key} fill={`var(--color-${item.key})`} radius={4} />
        ))}
      </BarChart>
    </ChartContainer>
  )
}
