import { Accordion } from '../../../src'

export default function AccordionPropsDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      items={[
        {
          value: 'pooling',
          trigger: 'What is connection pooling?',
          content:
            'A pooler keeps a set of connections open and hands them out, so short-lived clients do not pay the cost of a new connection each time.',
        },
        {
          value: 'rls',
          trigger: 'What is row level security?',
          content: 'Policies attached to a table decide which rows each role may read or write.',
        },
      ]}
    />
  )
}
