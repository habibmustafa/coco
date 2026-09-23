import type * as React from 'react'

import { CardContent, CardDescription, CardFooter, CardHeader, CardRoot, CardTitle } from './card-parts'
import { cn } from '../../../../lib/utils'

type RootProps = React.ComponentProps<typeof CardRoot>

export interface CardClassNames {
  header?: string
  title?: string
  description?: string
  content?: string
  footer?: string
}

// The native `title` attribute collides with our content prop of the same name.
type CardContentModeProps = Omit<RootProps, 'title'> & {
  title?: React.ReactNode
  description?: React.ReactNode
  /** Element shown at the end of the header row, next to title/description. */
  headerAction?: React.ReactNode
  /** Body content, rendered inside CardContent. */
  children?: React.ReactNode
  footer?: React.ReactNode
  classNames?: CardClassNames
}

type CardCompoundProps = RootProps & {
  title?: never
  description?: never
  footer?: never
  headerAction?: never
}

export type CardProps = CardContentModeProps | CardCompoundProps

export function CardHybrid(props: CardProps) {
  const isContentMode =
    props.title !== undefined ||
    props.description !== undefined ||
    props.footer !== undefined ||
    props.headerAction !== undefined

  if (!isContentMode) {
    // Narrowed by the check above; TS can't discriminate a multi-field OR on its own.
    return <CardRoot {...(props as CardCompoundProps)} />
  }

  const { title, description, headerAction, footer, children, className, classNames, ...rest } = props
  const hasHeader = title != null || description != null || headerAction != null

  return (
    <CardRoot className={className} {...rest}>
      {hasHeader && (
        <CardHeader className={classNames?.header}>
          {headerAction != null ? (
            <div className="flex items-center justify-between gap-2">
              <div>
                {title != null && <CardTitle className={classNames?.title}>{title}</CardTitle>}
                {description != null && (
                  <CardDescription className={classNames?.description}>{description}</CardDescription>
                )}
              </div>
              {headerAction}
            </div>
          ) : (
            <>
              {title != null && <CardTitle className={classNames?.title}>{title}</CardTitle>}
              {description != null && (
                <CardDescription className={classNames?.description}>{description}</CardDescription>
              )}
            </>
          )}
        </CardHeader>
      )}
      {children != null && <CardContent className={classNames?.content}>{children}</CardContent>}
      {footer != null && <CardFooter className={cn('gap-2', classNames?.footer)}>{footer}</CardFooter>}
    </CardRoot>
  )
}
