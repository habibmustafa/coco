import { InputOTPHybrid } from './input-otp'
import { InputOTPGroup, InputOTPRoot, InputOTPSeparator, InputOTPSlot } from './input-otp-parts'

export const InputOTP = Object.assign(InputOTPHybrid, {
  Root: InputOTPRoot,
  Group: InputOTPGroup,
  Slot: InputOTPSlot,
  Separator: InputOTPSeparator,
})

export {
  InputOTPRoot,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  REGEXP_ONLY_DIGITS_AND_CHARS,
} from './input-otp-parts'
export type { InputOTPProps } from './input-otp'
