import {
  AlertDialog,
  Button,
} from '../../../src'

export default function AlertDialogCloseOnly() {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <Button variant="outline">Show Alert Dialog</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Application submitted</AlertDialog.Title>
          <AlertDialog.Description>
            Thank you for your submission! Please check your email for a confirmation link to
            complete your application.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Close</AlertDialog.Cancel>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
