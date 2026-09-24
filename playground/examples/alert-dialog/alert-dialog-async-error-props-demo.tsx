import { useState } from 'react'
import { Admonition, AlertDialog, Button } from '../../../src'

const resetTemplate = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  throw new Error('Template reset failed')
}

export default function AlertDialogAsyncErrorPropsDemo() {
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
    <AlertDialog
      trigger={<Button variant="outline">Show Alert Dialog</Button>}
      title="Reset email template?"
      description="This will replace the current email template with the default version. Any unsaved changes will be lost."
      onConfirm={handleResetTemplate}
      confirmVariant="warning"
      confirmText="Reset template"
    >
      {error && <Admonition type="destructive" title="Failed to reset template" description={error} />}
    </AlertDialog>
  )
}
