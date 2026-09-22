import { Calculator, Calendar, CreditCard, Settings, Smile, User } from 'lucide-react'

import { Command } from '../../../src'

export default function CommandPropsDemo() {
  return (
    <Command
      className="rounded-lg border shadow-md"
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
  )
}
