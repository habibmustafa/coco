/*
 * Adapted from Supabase (Apache License 2.0).
 * Source: github.com/supabase/supabase/blob/master/packages/ui-patterns/src/DataInputs/Input.tsx
 * Changes: `ui` package import replaced with our Form atom's InputGroup parts + our
 * copyToClipboard lib helper. Upstream exports this as `Input`/`Props` — renamed to
 * `DataInput`/`DataInputProps` here since the bare names would collide with our own
 * `Input` atom and `InputProps` type in the package's flat public API.
 */

import { Copy } from 'lucide-react'
import React, {
  forwardRef,
  useState,
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from 'react'

import { cn } from '../../../lib/utils'
import { copyToClipboard } from '../../../lib/copy-to-clipboard'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput as BaseInput,
} from '../../atoms/forms/form'

export interface DataInputProps extends Omit<ComponentProps<typeof BaseInput>, 'onCopy'> {
  copy?: boolean
  showCopyOnHover?: boolean
  onCopy?: () => void
  icon?: any
  reveal?: boolean
  actions?: React.ReactNode
  iconContainerClassName?: string
  containerClassName?: string
}

const DataInput = forwardRef<
  ElementRef<typeof BaseInput>,
  ComponentPropsWithoutRef<typeof BaseInput> & DataInputProps
>(
  (
    {
      copy,
      showCopyOnHover = false,
      icon,
      reveal = false,
      actions,
      onCopy,
      iconContainerClassName,
      containerClassName,
      size = 'small',
      ...props
    }: DataInputProps,
    ref
  ) => {
    const [copyLabel, setCopyLabel] = useState('Copy')
    const [hidden, setHidden] = useState(true)

    function _onCopy(value: any) {
      copyToClipboard(value, () => {
        /* clipboard successfully set */
        setCopyLabel('Copied')
        setTimeout(function () {
          setCopyLabel('Copy')
        }, 3000)
        onCopy?.()
      })
    }

    function onReveal() {
      setHidden(false)
    }

    return (
      <InputGroup className={containerClassName}>
        <BaseInput
          ref={ref}
          onFocus={(event: React.FocusEvent<HTMLInputElement>) => event.target.select()}
          {...props}
          size={size}
          onCopy={onCopy}
          type={reveal && hidden ? 'password' : props.type}
          disabled={props.disabled}
          className={props.className}
          data-1p-ignore // 1Password
          data-lpignore="true" // LastPass
          data-form-type="other" // Dashlane
          data-bwignore // Bitwarden
        />
        {icon && <InputGroupAddon align="inline-start">{icon}</InputGroupAddon>}
        {copy || actions ? (
          <InputGroupAddon
            align="inline-end"
            // Override defaults
            className="pr-1 has-[>button]:mr-0 has-[>kbd]:mr-0"
          >
            {copy && !(reveal && hidden) ? (
              <InputGroupButton
                size="tiny"
                variant="default"
                className={cn(
                  showCopyOnHover &&
                    'opacity-0 group-hover/input-group:opacity-100 group-focus-within/input-group:opacity-100 transition'
                )}
                icon={<Copy size={16} className="text-foreground-muted" />}
                onClick={() => _onCopy(props.value)}
              >
                {copyLabel}
              </InputGroupButton>
            ) : null}
            {reveal && hidden ? (
              <InputGroupButton size="tiny" variant="default" onClick={onReveal}>
                Reveal
              </InputGroupButton>
            ) : null}
            {actions && actions}
          </InputGroupAddon>
        ) : null}
      </InputGroup>
    )
  }
)
DataInput.displayName = 'DataInput'

export { DataInput }
