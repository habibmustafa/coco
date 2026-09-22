import { Button, Dialog, Input, Label } from '../../../src'

export default function DialogPropsDemo() {
  return (
    <>
      <Dialog
        trigger={<Button variant="danger">Delete project</Button>}
        title="Delete project?"
        description="This action cannot be undone."
        confirmText="Delete"
        confirmType="danger"
        onConfirm={() => new Promise((resolve) => setTimeout(resolve, 800))}
      />

      <Dialog
        trigger={<Button variant="outline">Update email</Button>}
        title="Update email"
        description="We'll send a confirmation link to the new address."
        onConfirm={() => new Promise((resolve) => setTimeout(resolve, 1200))}
      >
        {({ pending }) => (
          <div className="flex flex-col gap-2">
            <Label htmlFor="dialog-props-render-fn-email">New email</Label>
            <Input
              id="dialog-props-render-fn-email"
              type="email"
              placeholder="you@example.com"
              disabled={pending}
            />
          </div>
        )}
      </Dialog>
    </>
  )
}
