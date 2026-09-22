import { AvatarHybrid } from './avatar'
import { AvatarFallback, AvatarImage, AvatarRoot } from './avatar-parts'

export const Avatar = Object.assign(AvatarHybrid, {
  Root: AvatarRoot,
  Image: AvatarImage,
  Fallback: AvatarFallback,
})

export { AvatarRoot, AvatarFallback, AvatarImage } from './avatar-parts'
export type { AvatarProps } from './avatar'
