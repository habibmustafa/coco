import { AlertTriangle, Info } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '../../src'

export default function AlertVariants() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Alert>
        <Info />
        <AlertTitle>Heads up</AlertTitle>
        <AlertDescription>The default variant sits on the muted surface.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle />
        <AlertTitle>Approaching your quota</AlertTitle>
        <AlertDescription>You have used 90% of the free tier.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertTriangle />
        <AlertTitle>Deployment failed</AlertTitle>
        <AlertDescription>Check the logs for the failing migration.</AlertDescription>
      </Alert>
    </div>
  )
}
