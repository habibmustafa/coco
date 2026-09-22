import { Avatar } from '../../../src'

export default function AvatarPropsDemo() {
  return (
    <>
      <Avatar src="https://github.com/supabase.png" alt="Supabase" fallback="SB" />
      <Avatar src="https://example.invalid/missing.png" alt="" fallback="HM" />
      <Avatar className="h-12 w-12" fallback="XL" />
    </>
  )
}
