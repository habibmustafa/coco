import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger } from '../../src'

export default function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Set limit</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="limit">Row limit</Label>
          <Input id="limit" defaultValue="1000" />
        </div>
      </PopoverContent>
    </Popover>
  )
}
