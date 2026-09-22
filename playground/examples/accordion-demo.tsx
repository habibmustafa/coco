import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../src'

export default function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="pooling">
        <AccordionTrigger>What is connection pooling?</AccordionTrigger>
        <AccordionContent>
          A pooler keeps a set of connections open and hands them out, so short-lived clients do
          not pay the cost of a new connection each time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="rls">
        <AccordionTrigger>What is row level security?</AccordionTrigger>
        <AccordionContent>
          Policies attached to a table decide which rows each role may read or write.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
