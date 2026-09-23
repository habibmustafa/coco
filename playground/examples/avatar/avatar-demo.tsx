import { Avatar, AvatarFallback, AvatarImage } from '../../../src'

export default function AvatarDemo() {
  return (
    <>
      <Avatar>
        <AvatarImage src="/coco-mark.svg" alt="coco" />
        <AvatarFallback>CO</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://example.invalid/missing.png" alt="" />
        <AvatarFallback>HM</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </>
  )
}
