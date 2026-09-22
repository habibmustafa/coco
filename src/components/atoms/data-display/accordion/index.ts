import { AccordionHybrid } from './accordion'
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from './accordion-parts'

export const Accordion = Object.assign(AccordionHybrid, {
  Root: AccordionRoot,
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
})

export { AccordionRoot, AccordionContent, AccordionItem, AccordionTrigger } from './accordion-parts'
export type { AccordionProps, AccordionItemData, AccordionClassNames } from './accordion'
