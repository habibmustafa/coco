/*
 * Adapted from Supabase (Apache License 2.0).
 * Source: github.com/supabase/supabase/blob/master/packages/ui-patterns/src/SelectionListState/SelectionListState.tsx
 * Changes: `ui` package import replaced with our cn helper. Not part of the chosen fragment
 * set on its own — kept here as MultiSelect's internal loading/empty/error row, same as
 * upstream (it lives outside multi-select/ upstream too, but has no other consumer we ported).
 */

import { cn } from '../../../lib/utils'
import { GenericSelectionSkeletonLoader } from '../shimmering-loader'

interface SelectionListStateProps {
  className?: string
  emptyLabel?: string
  errorLabel?: string
  isEmpty?: boolean
  isError?: boolean
  isLoading?: boolean
  skeletonVariant?: 'command' | 'multi-select' | 'select'
}

export const SelectionListState = ({
  className,
  emptyLabel = 'No options available',
  errorLabel = 'Unable to load options',
  isEmpty = false,
  isError = false,
  isLoading = false,
  skeletonVariant = 'select',
}: SelectionListStateProps) => {
  let statusLabel: string | undefined
  if (isLoading) statusLabel = 'Loading options'
  else if (isError) statusLabel = errorLabel
  else if (isEmpty) statusLabel = emptyLabel

  return (
    <>
      {isLoading && (
        <GenericSelectionSkeletonLoader
          className={cn('w-full', className)}
          variant={skeletonVariant}
        />
      )}
      <div
        aria-live="polite"
        className={cn(
          'px-2 py-3 text-xs text-foreground-lighter',
          (isLoading || statusLabel === undefined) && 'sr-only',
          className
        )}
      >
        {statusLabel}
      </div>
    </>
  )
}
