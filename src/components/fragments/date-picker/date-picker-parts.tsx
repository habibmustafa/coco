import { CalendarIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '../../../lib/utils'
import { Button } from '../../atoms/actions/button'
import {
  PopoverContent as PopoverContentRoot,
  PopoverRoot,
  PopoverTrigger,
} from '../../atoms/overlay/popover'

export const DatePickerRoot = (props: ComponentProps<typeof PopoverRoot>) => {
  return <PopoverRoot {...props} />
}

export const DatePickerTrigger = ({
  asChild = true,
  ...props
}: ComponentProps<typeof PopoverTrigger>) => {
  return <PopoverTrigger asChild={asChild} {...props} />
}

const DatePickerIcon = <CalendarIcon className="h-4 w-4" />

export type DatePickerButtonProps = ComponentProps<typeof Button> & { isInvalid?: boolean }

export const DatePickerButton = ({
  className,
  variant = 'default',
  icon = DatePickerIcon,
  isInvalid = false,
  ...props
}: DatePickerButtonProps) => {
  return (
    <Button
      variant={variant}
      className={cn(
        'justify-start text-left font-normal px-3 py-4',
        {
          'bg-destructive-200! border-destructive-400 focus:border-destructive focus-visible:border-destructive focus-visible:outline-amber-700':
            isInvalid,
        },
        className
      )}
      icon={icon}
      {...props}
    />
  )
}

export const DatePickerContent = ({
  className,
  align = 'start',
  ...props
}: ComponentProps<typeof PopoverContentRoot>) => {
  return <PopoverContentRoot className={cn('w-auto p-0', className)} align={align} {...props} />
}
