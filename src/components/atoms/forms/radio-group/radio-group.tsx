// Based on supabase/supabase packages/ui (Apache-2.0). Modified: hybrid props API.
import type * as React from 'react'

import { RadioGroupItem, RadioGroupLargeItem, RadioGroupRoot } from './radio-group-parts'
import { Label } from '../label'
import { cn } from '../../../../lib/utils'

export interface RadioOption {
  value: string
  label: React.ReactNode
  id?: string
  disabled?: boolean
  /** @default "default" */
  variant?: 'default' | 'large'
  /** Only used when `variant: "large"`. */
  image?: React.ReactNode
  /** Only used when `variant: "large"`. @default true */
  showIndicator?: boolean
}

export interface RadioGroupClassNames {
  item?: string
  itemRow?: string
  label?: string
}

type RootProps = React.ComponentProps<typeof RadioGroupRoot>

type RadioGroupOptionsProps = Omit<RootProps, 'children'> & {
  options: readonly RadioOption[]
  classNames?: RadioGroupClassNames
  children?: never
}

type RadioGroupCompoundProps = RootProps & { options?: never }

export type RadioGroupProps = RadioGroupOptionsProps | RadioGroupCompoundProps

export function RadioGroupHybrid(props: RadioGroupProps) {
  if (props.options === undefined) {
    return <RadioGroupRoot {...props} />
  }

  const { options, classNames, ...rootProps } = props

  return (
    <RadioGroupRoot {...rootProps}>
      {options.map((option) => {
        const id = option.id ?? `${rootProps.name ?? 'radio-group'}-${option.value}`

        if (option.variant === 'large') {
          return (
            <RadioGroupLargeItem
              key={option.value}
              value={option.value}
              id={id}
              disabled={option.disabled}
              image={option.image}
              showIndicator={option.showIndicator}
              label={typeof option.label === 'string' ? option.label : String(option.label)}
              className={classNames?.item}
            />
          )
        }

        return (
          <div key={option.value} className={cn('flex items-center gap-2', classNames?.itemRow)}>
            <RadioGroupItem
              value={option.value}
              id={id}
              disabled={option.disabled}
              className={classNames?.item}
            />
            <Label htmlFor={id} className={classNames?.label}>
              {option.label}
            </Label>
          </div>
        )
      })}
    </RadioGroupRoot>
  )
}
