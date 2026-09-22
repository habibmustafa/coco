import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from '../../src'

export default function CardDemo() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Project settings</CardTitle>
        <CardDescription>Sections are separated by borders, not shadows.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Input placeholder="Project name" />
        <Input placeholder="Region" />
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="primary">Save</Button>
        <Button variant="text">Cancel</Button>
      </CardFooter>
    </Card>
  )
}
