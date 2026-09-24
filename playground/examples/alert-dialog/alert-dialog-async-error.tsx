import { useState } from 'react'

import {
  Admonition,
  AlertDialog,
  Button,
} from '../../../src'

const resetTemplate = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  throw new Error('Template reset failed')
}

export default function AlertDialogAsyncError() {
  const [error, setError] = useState<string | null>(null)

  const handleResetTemplate = async () => {
    setError(null)

    try {
      await resetTemplate()
    } catch (error) {
      setError('Check the template configuration and try again.')
      throw error
    }
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="outline">Show Alert Dialog</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Reset email template?</AlertDialog.Title>
          <AlertDialog.Description>
            This will replace the current email template with the default version. Any unsaved
            changes will be lost.
          </AlertDialog.Description>
        </AlertDialog.Header>
        {error && (
          <AlertDialog.Body>
            <Admonition type="destructive" title="Failed to reset template" description={error} />
          </AlertDialog.Body>
        )}
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action variant="warning" onClick={handleResetTemplate}>
            Reset template
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
