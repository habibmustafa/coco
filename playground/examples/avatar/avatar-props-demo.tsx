import { Avatar } from '../../../src'

export default function AvatarPropsDemo() {
  return (
    <>
      <Avatar src="/ui-mark.svg" alt="ui" fallback="UI" />
      <Avatar src="https://example.invalid/missing.png" alt="" fallback="HM" />
      <Avatar className="h-12 w-12" fallback="XL" />
    </>
  )
}
