/*
 * Hybrid API layer (docs/hybrid-api-migration.md) for MultiSelector — Strategy A,
 * discriminator `options`. Not present upstream; mirrors the Select atom's own `options`
 * flat-list pattern (SelectOption: value/label/disabled).
 */
import type * as React from 'react'

import {
  MultiSelectorContent,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorRoot,
  MultiSelectorTrigger,
  type MultiSelectorRootProps,
  type MultiSelectorTriggerProps,
} from './multi-select-parts'

export interface MultiSelectorOption {
  value: string
  label?: React.ReactNode
  disabled?: boolean
}

type MultiSelectorOptionsModeProps = Omit<MultiSelectorRootProps, 'children'> &
  Pick<
    MultiSelectorTriggerProps,
    'label' | 'persistLabel' | 'badgeLimit' | 'wrapBadges' | 'deletableBadge' | 'showIcon' | 'renderValue'
  > & {
    options: readonly MultiSelectorOption[]
    /** @default 9999 (no wrap) */
    creatable?: boolean
    emptyLabel?: string
    error?: boolean
    errorLabel?: string
    loading?: boolean
    triggerClassName?: string
    children?: never
  }

type MultiSelectorCompoundProps = MultiSelectorRootProps & { options?: never }

export type MultiSelectorProps = MultiSelectorOptionsModeProps | MultiSelectorCompoundProps

export function MultiSelectorHybrid(props: MultiSelectorProps) {
  if (props.options === undefined) {
    return <MultiSelectorRoot {...props} />
  }

  const {
    options,
    label,
    persistLabel,
    badgeLimit,
    wrapBadges,
    deletableBadge,
    showIcon,
    renderValue,
    creatable,
    emptyLabel,
    error,
    errorLabel,
    loading,
    triggerClassName,
    ...rootProps
  } = props

  return (
    <MultiSelectorRoot {...rootProps}>
      <MultiSelectorTrigger
        className={triggerClassName}
        label={label}
        persistLabel={persistLabel}
        badgeLimit={badgeLimit}
        wrapBadges={wrapBadges}
        deletableBadge={deletableBadge}
        showIcon={showIcon}
        renderValue={renderValue}
      />
      <MultiSelectorContent>
        <MultiSelectorList
          creatable={creatable}
          emptyLabel={emptyLabel}
          error={error}
          errorLabel={errorLabel}
          loading={loading}
        >
          {options.map((option) => (
            <MultiSelectorItem key={option.value} value={option.value} disabled={option.disabled}>
              {option.label ?? option.value}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelectorRoot>
  )
}
