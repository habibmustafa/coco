import { AlertTriangle, Info } from 'lucide-react'

import { Alert } from '../../../src'

export default function AlertVariants() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Alert.Root>
        <Info />
        <Alert.Title>Heads up</Alert.Title>
        <Alert.Description>The default variant sits on the muted surface.</Alert.Description>
      </Alert.Root>
      <Alert.Root variant="warning">
        <AlertTriangle />
        <Alert.Title>Approaching your quota</Alert.Title>
        <Alert.Description>You have used 90% of the free tier.</Alert.Description>
      </Alert.Root>
      <Alert.Root variant="destructive">
        <AlertTriangle />
        <Alert.Title>Deployment failed</Alert.Title>
        <Alert.Description>Check the logs for the failing migration.</Alert.Description>
      </Alert.Root>
    </div>
  )
}
