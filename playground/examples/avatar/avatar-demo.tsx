import { Avatar } from '../../../src'

export default function AvatarDemo() {
  return (
    <>
      <Avatar.Root>
        <Avatar.Image src="/coco-mark.svg" alt="coco" />
        <Avatar.Fallback>CO</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Image src="https://example.invalid/missing.png" alt="" />
        <Avatar.Fallback>HM</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root className="h-12 w-12">
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar.Root>
    </>
  )
}
