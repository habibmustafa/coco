import { Accordion } from '../../../src'

export default function AccordionDemo() {
  return (
    <Accordion.Root type="single" collapsible className="w-full">
      <Accordion.Item value="pooling">
        <Accordion.Trigger>What is connection pooling?</Accordion.Trigger>
        <Accordion.Content>
          A pooler keeps a set of connections open and hands them out, so short-lived clients do
          not pay the cost of a new connection each time.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="rls">
        <Accordion.Trigger>What is row level security?</Accordion.Trigger>
        <Accordion.Content>
          Policies attached to a table decide which rows each role may read or write.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  )
}
