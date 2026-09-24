import { Terminal } from 'lucide-react'
import { Alert } from '../../../src'

export default function AlertDemo() {
  return (
    <Alert.Root>
      <Terminal size={16} />
      <Alert.Title>Heads up!</Alert.Title>
      <Alert.Description>You can also add components to your app using the CLI.</Alert.Description>
    </Alert.Root>
  )
}
