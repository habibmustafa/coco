import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { Button } from '../src/components/atoms/actions/button'
import { DropdownMenu, type MenuItem } from '../src/components/atoms/overlay/dropdown-menu'

const trigger = <Button>Open</Button>

function open() {
  // Radix opens on pointerdown, not click
  fireEvent.pointerDown(screen.getByRole('button', { name: 'Open' }), {
    button: 0,
    ctrlKey: false,
    pointerType: 'mouse',
  })
  return screen.findByRole('menu')
}

test('items render their type-specific role and fire their handler', async () => {
  const onSelect = vi.fn()
  render(
    <DropdownMenu
      trigger={trigger}
      items={[
        { type: 'label', key: 'l', label: 'Account' },
        { key: 'profile', label: 'Profile', shortcut: '⇧⌘P', onSelect },
        { type: 'separator', key: 's' },
        { key: 'locked', label: 'Locked', disabled: true, onSelect },
      ]}
    />
  )
  await open()

  expect(screen.getByText('Account')).toBeTruthy()
  expect(screen.getByText('⇧⌘P')).toBeTruthy()
  expect(screen.getByRole('separator')).toBeTruthy()

  const locked = screen.getByRole('menuitem', { name: 'Locked' })
  expect(locked.getAttribute('data-disabled')).not.toBeNull()

  fireEvent.click(locked)
  expect(onSelect).not.toHaveBeenCalled()

  fireEvent.click(screen.getByRole('menuitem', { name: /Profile/ }))
  expect(onSelect).toHaveBeenCalledTimes(1)
})

test('checkbox items are controlled by the consumer', async () => {
  function Host() {
    const [checked, setChecked] = useState(false)
    return (
      <DropdownMenu
        trigger={trigger}
        items={[
          { type: 'checkbox', key: 'bar', label: 'Status bar', checked, onCheckedChange: setChecked },
        ]}
      />
    )
  }
  render(<Host />)
  await open()

  const item = screen.getByRole('menuitemcheckbox', { name: 'Status bar' })
  expect(item.getAttribute('aria-checked')).toBe('false')

  fireEvent.click(item)
  // selecting closes the menu, so reopen to read the new state
  await open()
  expect(screen.getByRole('menuitemcheckbox', { name: 'Status bar' }).getAttribute('aria-checked')).toBe(
    'true'
  )
})

test('a radio group keeps exactly one item checked', async () => {
  function Host() {
    const [value, setValue] = useState('top')
    return (
      <DropdownMenu
        trigger={trigger}
        items={[
          {
            type: 'radio-group',
            key: 'position',
            value,
            onValueChange: setValue,
            items: [
              { value: 'top', label: 'Top' },
              { value: 'bottom', label: 'Bottom' },
            ],
          },
        ]}
      />
    )
  }
  render(<Host />)
  await open()

  const checkedNames = () =>
    screen
      .getAllByRole('menuitemradio')
      .filter((item) => item.getAttribute('aria-checked') === 'true')
      .map((item) => item.textContent?.trim())

  expect(checkedNames()).toEqual(['Top'])

  fireEvent.click(screen.getByRole('menuitemradio', { name: 'Bottom' }))
  await open()
  expect(checkedNames()).toEqual(['Bottom'])
})

test('groups and submenus nest their children', async () => {
  const items: MenuItem[] = [
    {
      type: 'group',
      key: 'g',
      label: 'Team',
      items: [{ key: 'invite', label: 'Invite' }],
    },
    {
      type: 'submenu',
      key: 'more',
      label: 'More',
      items: [{ key: 'email', label: 'Email' }],
    },
  ]
  render(<DropdownMenu trigger={trigger} items={items} />)
  await open()

  expect(screen.getByRole('group')).toBeTruthy()
  expect(screen.getByRole('menuitem', { name: 'Invite' })).toBeTruthy()

  const sub = screen.getByRole('menuitem', { name: 'More' })
  expect(sub.getAttribute('aria-haspopup')).toBe('menu')
  // submenu content is lazy — it isn't in the DOM until the parent item opens it
  expect(screen.queryByRole('menuitem', { name: 'Email' })).toBeNull()
})

test('compound mode renders children verbatim', async () => {
  render(
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button>Open</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Hand-written</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
  await open()
  expect(screen.getByRole('menuitem', { name: 'Hand-written' })).toBeTruthy()
})
