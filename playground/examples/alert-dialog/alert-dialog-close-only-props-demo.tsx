import { AlertDialog, Button } from '../../../src'

export default function AlertDialogCloseOnlyPropsDemo() {
  return (
    <AlertDialog
      trigger={<Button variant="outline">Show Alert Dialog</Button>}
      title="Application submitted"
      description="Thank you for your submission! Please check your email for a confirmation link to complete your application."
    />
  )
}
