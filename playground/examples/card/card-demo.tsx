import {
  Button,
  Card,
  Input,
} from '../../../src'

export default function CardDemo() {
  return (
    <Card.Root className="w-full">
      <Card.Header>
        <Card.Title>Project settings</Card.Title>
        <Card.Description>Sections are separated by borders, not shadows.</Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col gap-3">
        <Input placeholder="Project name" />
        <Input placeholder="Region" />
      </Card.Content>
      <Card.Footer className="gap-2">
        <Button variant="primary">Save</Button>
        <Button variant="text">Cancel</Button>
      </Card.Footer>
    </Card.Root>
  )
}
