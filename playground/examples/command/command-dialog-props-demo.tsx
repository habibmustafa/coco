'use client'

import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react'
import * as React from 'react'
import { Command } from '../../../src'

export default function CommandDialogPropsDemo() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'j' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{' '}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded-sm border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p>
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        placeholder="Type a command or search..."
        groups={[
          {
            key: 'suggestions',
            heading: 'Suggestions',
            items: [
              { key: 'calendar', label: 'Calendar', icon: <Calendar className="mr-2 h-4 w-4" /> },
              { key: 'emoji', label: 'Search Emoji', icon: <Smile className="mr-2 h-4 w-4" /> },
              { key: 'calculator', label: 'Calculator', icon: <Calculator className="mr-2 h-4 w-4" /> },
            ],
          },
          {
            key: 'settings',
            heading: 'Settings',
            items: [
              {
                key: 'profile',
                label: 'Profile',
                icon: <User className="mr-2 h-4 w-4" />,
                shortcut: '⌘P',
              },
              {
                key: 'billing',
                label: 'Billing',
                icon: <CreditCard className="mr-2 h-4 w-4" />,
                shortcut: '⌘B',
              },
              {
                key: 'settings',
                label: 'Settings',
                icon: <Settings className="mr-2 h-4 w-4" />,
                shortcut: '⌘S',
              },
            ],
          },
        ]}
      />
    </>
  )
}
