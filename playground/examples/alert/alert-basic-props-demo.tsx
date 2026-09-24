import { Terminal } from 'lucide-react'

import { Alert } from '../../../src'

export default function AlertBasicPropsDemo() {
  return (
    <Alert
      icon={<Terminal size={16} />}
      title="Heads up!"
      description="You can also add components to your app using the CLI."
    />
  )
}
