import { Button } from '../../src'

export default function ButtonStates() {
  return (
    <>
      <Button loading>Saving</Button>
      <Button variant="primary" loading>
        Deploying
      </Button>
      <Button disabled>Disabled</Button>
      <Button disabled focusableWhenDisabled>
        Disabled, focusable
      </Button>
      <Button asChild variant="link">
        <a href="https://supabase.com/design-system">asChild link</a>
      </Button>
    </>
  )
}
