'use client'
import { Button, Input, Label, Sheet } from '../../../src'

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const

type SheetSide = (typeof SHEET_SIDES)[number]

export default function SheetSide() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet.Root key={side}>
          <Sheet.Trigger asChild>
            <Button variant="outline">From {side}</Button>
          </Sheet.Trigger>
          <Sheet.Content side={side}>
            <Sheet.Header>
              <Sheet.Title>Edit profile</Sheet.Title>
              <Sheet.Description>
                Make changes to your profile here. Click save when you are done.
              </Sheet.Description>
            </Sheet.Header>
            <Sheet.Section className="grid gap-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </Sheet.Section>
            <Sheet.Footer>
              <Sheet.Close asChild>
                <Button type="submit" variant="secondary">
                  Save changes
                </Button>
              </Sheet.Close>
            </Sheet.Footer>
          </Sheet.Content>
        </Sheet.Root>
      ))}
    </div>
  )
}
