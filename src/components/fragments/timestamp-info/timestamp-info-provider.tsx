/*
 * Adapted from Supabase (Apache License 2.0).
 * Source: github.com/supabase/supabase/blob/master/packages/ui-patterns/src/TimestampInfo/TimestampInfoProvider.tsx
 * Changes: none besides the file rename (TimestampInfoProvider.tsx -> timestamp-info-provider.tsx).
 */

'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'

interface TimestampInfoContextValue {
  /** IANA timezone applied to TimestampInfo when no `timezone` prop is set. */
  timezone?: string
}

const TimestampInfoContext = createContext<TimestampInfoContextValue>({})

export const TimestampInfoProvider = ({
  timezone,
  children,
}: {
  timezone?: string
  children: ReactNode
}) => {
  const value = useMemo(() => ({ timezone }), [timezone])
  return <TimestampInfoContext.Provider value={value}>{children}</TimestampInfoContext.Provider>
}

export const useTimestampInfoContext = () => useContext(TimestampInfoContext)
