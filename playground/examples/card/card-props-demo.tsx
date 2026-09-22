import { Button, Card, Input } from '../../../src'

export default function CardPropsDemo() {
  return (
    <Card
      className="w-full"
      title="Project settings"
      description="Sections are separated by borders, not shadows."
      classNames={{ content: 'flex flex-col gap-3' }}
      footer={
        <>
          <Button variant="primary">Save</Button>
          <Button variant="text">Cancel</Button>
        </>
      }
    >
      <Input placeholder="Project name" />
      <Input placeholder="Region" />
    </Card>
  )
}
