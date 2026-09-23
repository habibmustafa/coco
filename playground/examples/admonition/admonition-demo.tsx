import { Admonition, Button } from '../../../src'

export default function AdmonitionDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Admonition
        type="default"
        layout="horizontal"
        title="OAuth Server is disabled"
        description="Enable OAuth Server to make your project act as an identity provider for third-party applications."
        actions={<Button>OAuth Server Settings</Button>}
      />
      <Admonition
        type="warning"
        title="This is a warning"
        description="This is a warning description."
      />
      <Admonition
        type="destructive"
        title="This is a destructive admonition"
        description="This is a destructive admonition description."
      />
      <Admonition
        type="success"
        title="Connection confirmed"
        description="You can now close this tab."
      />
      <Admonition
        type="default"
        description="Changes to these settings can take a few minutes to appear across all projects."
      />
    </div>
  )
}
