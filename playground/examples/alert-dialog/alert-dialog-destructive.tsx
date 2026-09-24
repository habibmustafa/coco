import {
  AlertDialog,
  Button,
} from '../../../src'

export default function AlertDialogDestructive() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="danger">Show Alert Dialog</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            Delete <code className="text-code-inline">hello-world</code>
          </AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. Ensure that you have a backup in case you want to
            restore this edge function.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action variant="danger">Delete</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
