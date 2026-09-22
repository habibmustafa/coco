// Based on supabase/supabase packages/ui (Apache-2.0). Modified: hybrid props API.
import type * as React from 'react'

import { AvatarFallback, AvatarImage, AvatarRoot } from './avatar-parts'

type RootProps = React.ComponentProps<typeof AvatarRoot>

type AvatarContentProps = Omit<RootProps, 'children'> & {
  src?: string
  alt?: string
  fallback?: React.ReactNode
  children?: never
}

type AvatarCompoundProps = RootProps & { src?: never; fallback?: never }

export type AvatarProps = AvatarContentProps | AvatarCompoundProps

export function AvatarHybrid(props: AvatarProps) {
  if (props.src === undefined && props.fallback === undefined) {
    return <AvatarRoot {...props} />
  }

  const { src, alt, fallback, ...rest } = props

  return (
    <AvatarRoot {...rest}>
      {src != null && <AvatarImage src={src} alt={alt} />}
      {fallback != null && <AvatarFallback>{fallback}</AvatarFallback>}
    </AvatarRoot>
  )
}
