import { Avatar } from '../../../src'

export default function AvatarPropsDemo() {
  return (
    <>
      <Avatar src="/coco-mark.svg" alt="coco" fallback="CO" />
      <Avatar src="https://example.invalid/missing.png" alt="" fallback="HM" />
      <Avatar className="h-12 w-12" fallback="XL" />
    </>
  )
}
