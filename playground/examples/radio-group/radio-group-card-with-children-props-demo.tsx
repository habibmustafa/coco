import { Monitor, Moon, Sun } from 'lucide-react'

import { RadioGroupCard } from '../../../src'

const singleThemes = [
  { name: 'Dark', value: 'dark', icon: Moon },
  { name: 'Light', value: 'light', icon: Sun },
  { name: 'System', value: 'system', icon: Monitor },
] as const

export default function RadioGroupCardWithChildrenPropsDemo() {
  return (
    <RadioGroupCard
      defaultValue="dark"
      className="flex flex-wrap gap-3"
      aria-label="Theme"
      options={singleThemes.map((theme) => {
        const Icon = theme.icon
        return {
          value: theme.value,
          label: theme.name,
          children: <Icon className="h-8 w-8 text-foreground-light" />,
        }
      })}
    />
  )
}
