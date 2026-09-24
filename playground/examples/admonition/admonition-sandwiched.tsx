import { Admonition, Card } from '../../../src'

export default function AdmonitionDemo() {
  return (
    <Card.Root>
      <Card.Header className="border-b-0">
        <Card.Title>Card with Admonition</Card.Title>
      </Card.Header>
      <Admonition
        type="warning"
        layout="horizontal"
        title="Sandwiched Admonition"
        description="This Admonition is sandwiched between other content in a Card component. Note how the top border and all radii are reset."
        className="mb-0 rounded-none border-x-0"
      />
      <Card.Content>
        <p className="text-foreground-light text-sm">
          This is the subsequent content of this Card.
        </p>
      </Card.Content>
      <Card.Content>
        <p className="text-foreground-light text-sm">
          It might be disabled due some condition that the Admonition above explains.
        </p>
      </Card.Content>
    </Card.Root>
  )
}
