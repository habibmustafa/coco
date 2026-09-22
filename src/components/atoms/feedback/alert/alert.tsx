// Based on supabase/supabase packages/ui (Apache-2.0). Modified: hybrid props API.
import type * as React from 'react'

import { AlertDescription, AlertRoot, AlertTitle } from './alert-parts'

type RootProps = React.ComponentProps<typeof AlertRoot>

// The native `title` attribute collides with our content prop of the same name.
type AlertContentProps = Omit<RootProps, 'children' | 'title'> & {
  icon?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  children?: never
}

type AlertCompoundProps = RootProps & { title?: never; description?: never }

export type AlertProps = AlertContentProps | AlertCompoundProps

export function AlertHybrid(props: AlertProps) {
  if (props.title === undefined && props.description === undefined) {
    // Narrowed by the check above; TS can't discriminate a multi-field OR on its own.
    return <AlertRoot {...(props as AlertCompoundProps)} />
  }

  const { icon, title, description, ...rest } = props

  return (
    <AlertRoot {...rest}>
      {icon}
      {title != null && <AlertTitle>{title}</AlertTitle>}
      {description != null && <AlertDescription>{description}</AlertDescription>}
    </AlertRoot>
  )
}
