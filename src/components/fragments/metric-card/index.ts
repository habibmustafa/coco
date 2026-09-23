import { MetricCardHybrid } from './metric-card'
import {
  MetricCardContent,
  MetricCardDifferential,
  MetricCardHeader,
  MetricCardIcon,
  MetricCardLabel,
  MetricCardRoot,
  MetricCardSparkline,
  MetricCardValue,
} from './metric-card-parts'

export const MetricCard = Object.assign(MetricCardHybrid, {
  Root: MetricCardRoot,
  Header: MetricCardHeader,
  Icon: MetricCardIcon,
  Label: MetricCardLabel,
  Content: MetricCardContent,
  Value: MetricCardValue,
  Differential: MetricCardDifferential,
  Sparkline: MetricCardSparkline,
})

export {
  MetricCardRoot,
  MetricCardHeader,
  MetricCardIcon,
  MetricCardLabel,
  MetricCardContent,
  MetricCardValue,
  MetricCardDifferential,
  MetricCardSparkline,
  useMetricCard,
} from './metric-card-parts'
export type { MetricCardRootProps } from './metric-card-parts'
export type { MetricCardProps } from './metric-card'
