import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'

import { AlertDialog, Button } from '../src'

describe('AlertDialog props mode', () => {
  test('keeps the dialog open and blocks cancel while confirmation is pending', async () => {
    const user = userEvent.setup()
    let resolveConfirm!: () => void
    const onConfirm = vi.fn(() => new Promise<void>((resolve) => { resolveConfirm = resolve }))

    render(
      <AlertDialog
        trigger={<Button>Open</Button>}
        title="Confirm action"
        onConfirm={onConfirm}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.click(screen.getByRole('button', { name: 'Confirm' }))

    expect(onConfirm).toHaveBeenCalledOnce()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Cancel' }).hasAttribute('disabled')).toBe(true))
    expect(screen.queryByRole('alertdialog')).not.toBeNull()

    resolveConfirm()
    await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull())
  })

  test('keeps the dialog open after a rejected confirmation', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn(async () => { throw new Error('Request failed') })

    render(
      <AlertDialog
        trigger={<Button>Open</Button>}
        title="Confirm action"
        onConfirm={onConfirm}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.click(screen.getByRole('button', { name: 'Confirm' }))

    await waitFor(() => expect(onConfirm).toHaveBeenCalledOnce())
    expect(screen.queryByRole('alertdialog')).not.toBeNull()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Cancel' }).hasAttribute('disabled')).toBe(false))
  })
})
