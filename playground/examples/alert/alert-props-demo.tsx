import { AlertTriangle, Info } from 'lucide-react'

import { Alert } from '../../../src'

export default function AlertPropsDemo() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Alert icon={<Info />} title="Heads up" description="The default variant sits on the muted surface." />
      <Alert
        variant="warning"
        icon={<AlertTriangle />}
        title="Approaching your quota"
        description="You have used 90% of the free tier."
      />
      <Alert
        variant="destructive"
        icon={<AlertTriangle />}
        title="Deployment failed"
        description="Check the logs for the failing migration."
      />
    </div>
  )
}
