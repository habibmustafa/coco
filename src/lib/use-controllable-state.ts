// Shared by every hybrid atom's props-driven component (docs/hybrid-api-migration.md §4.2).
import { useCallback, useLayoutEffect, useRef, useState } from 'react'

export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}) {
  const [internal, setInternal] = useState<T>(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internal

  const onChangeRef = useRef(onChange)
  useLayoutEffect(() => {
    onChangeRef.current = onChange
  })

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next)
      onChangeRef.current?.(next)
    },
    [isControlled]
  )

  return [current, setValue] as const
}
