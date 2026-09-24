import { AlertDialog, Button } from '../../../src'

export default function AlertDialogDestructivePropsDemo() {
  return (
    <AlertDialog
      trigger={<Button variant="danger">Show Alert Dialog</Button>}
      title={<>Delete <code className="text-code-inline">hello-world</code></>}
      description="This action cannot be undone. Ensure that you have a backup in case you want to restore this edge function."
      onConfirm={() => {}}
      confirmVariant="danger"
      confirmText="Delete"
    />
  )
}
