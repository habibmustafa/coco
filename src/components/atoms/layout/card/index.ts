import { CardHybrid } from './card'
import { CardContent, CardDescription, CardFooter, CardHeader, CardRoot, CardTitle } from './card-parts'

export const Card = Object.assign(CardHybrid, {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
})

export { CardRoot, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card-parts'
export type { CardProps, CardClassNames } from './card'
