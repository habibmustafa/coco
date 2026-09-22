import { Input, Label } from '../../src'

export default function LabelDemo() {
  return (
    <div className="flex w-full flex-col gap-2">
      <Label htmlFor="project-name">Project name</Label>
      <Input id="project-name" placeholder="my-project" />
    </div>
  )
}
