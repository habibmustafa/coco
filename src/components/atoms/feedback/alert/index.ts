import { AlertHybrid } from './alert'
import { AlertDescription, AlertRoot, AlertTitle } from './alert-parts'

export const Alert = Object.assign(AlertHybrid, {
  Root: AlertRoot,
  Title: AlertTitle,
  Description: AlertDescription,
})

export { AlertRoot, AlertDescription, AlertTitle, alertVariants } from './alert-parts'
export type { AlertProps } from './alert'
