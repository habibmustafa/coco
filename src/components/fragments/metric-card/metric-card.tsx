/*
 * Hybrid API layer (docs/hybrid-api-migration.md) for MetricCard — Strategy A, discriminator
 * `value`. Not present upstream (their MetricCard is compound-only); mirrors the Card atom's
 * own hybrid treatment (title/description/footer discriminators) since MetricCard is built on
 * Card. `value` is safe as a discriminator: MetricCardRoot forwards to a plain `<div>`, whose
 * native attributes never include `value`.
 */
import * as React from 'react'

import {
  MetricCardContent,
  MetricCardDifferential,
  MetricCardHeader,
  MetricCardIcon,
  MetricCardLabel,
  MetricCardRoot,
  MetricCardSparkline,
  MetricCardValue,
  type MetricCardRootProps,
} from './metric-card-parts'

type MetricCardPropsMode = Omit<MetricCardRootProps, 'children'> & {
  /** Label shown in the header, e.g. "Active Users". */
  label: React.ReactNode
  /** Info-glyph tooltip next to the label. */
  tooltip?: React.ReactNode
  /**
   * Renders the header's chevron as a link. Omit (while keeping `linkTooltip`) when the
   * card is already wrapped in a link — see MetricCardHeader's own doc comment.
   */
  href?: string
  linkTooltip?: string
  /** Icon rendered next to `label` (header) or before `value` (content). @default "content" */
  icon?: React.ReactNode
  iconPlacement?: 'header' | 'content'
  value: React.ReactNode
  differential?: React.ReactNode
  differentialVariant?: 'positive' | 'negative' | 'default'
  orientation?: 'horizontal' | 'vertical'
  /** Data for the trailing sparkline. Omit to skip it entirely. */
  sparklineData?: Array<{ value: number; [key: string]: any }>
  sparklineDataKey?: string
  children?: never
}

type MetricCardCompoundProps = MetricCardRootProps & { value?: never }

export type MetricCardProps = MetricCardPropsMode | MetricCardCompoundProps

export function MetricCardHybrid(props: MetricCardProps) {
  if (props.value === undefined) {
    return <MetricCardRoot {...props} />
  }

  const {
    label,
    tooltip,
    href,
    linkTooltip,
    icon,
    iconPlacement = 'content',
    value,
    differential,
    differentialVariant = 'default',
    orientation,
    sparklineData,
    sparklineDataKey,
    ...rootProps
  } = props

  return (
    <MetricCardRoot {...rootProps}>
      <MetricCardHeader href={href} linkTooltip={linkTooltip}>
        {icon && iconPlacement === 'header' && <MetricCardIcon>{icon}</MetricCardIcon>}
        <MetricCardLabel tooltip={tooltip}>{label}</MetricCardLabel>
      </MetricCardHeader>
      <MetricCardContent orientation={orientation}>
        {icon && iconPlacement === 'content' && <MetricCardIcon>{icon}</MetricCardIcon>}
        <MetricCardValue>{value}</MetricCardValue>
        {differential !== undefined && (
          <MetricCardDifferential variant={differentialVariant}>
            {differential}
          </MetricCardDifferential>
        )}
      </MetricCardContent>
      {sparklineData && <MetricCardSparkline data={sparklineData} dataKey={sparklineDataKey} />}
    </MetricCardRoot>
  )
}
