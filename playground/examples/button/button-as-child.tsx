import { Button } from '../../../src'

export default function ButtonAsChild() {
  return (
    <Button variant="primary" asChild>
      <a href="/login">Sign in</a>
    </Button>
  )
}
