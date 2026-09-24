import { AlertDialog, Button } from '../../../src'

export default function AlertDialogWarningPropsDemo() {
  return (
    <AlertDialog
      trigger={<Button variant="warning">Show Alert Dialog</Button>}
      title="Update branch"
      description="This branch has 3 modified edge functions that will be overwritten when updating with the latest functions from the production branch. This action cannot be undone."
      onConfirm={() => {}}
      confirmVariant="warning"
      confirmText="Update"
    />
  )
}
