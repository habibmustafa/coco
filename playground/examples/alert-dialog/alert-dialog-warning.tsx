import {
  AlertDialog,
  Button,
} from '../../../src'

export default function AlertDialogWarning() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="warning">Show Alert Dialog</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Update branch</AlertDialog.Title>
          <AlertDialog.Description>
            This branch has 3 modified edge functions that will be overwritten when updating with
            the latest functions from the production branch. This action cannot be undone.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action variant="warning">Update</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
