import { Button, Input, Label, Sheet } from '../../../src'

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const

export default function SheetSidePropsDemo() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet
          key={side}
          side={side}
          trigger={<Button variant="outline">From {side}</Button>}
          title="Edit profile"
          description="Make changes to your profile here. Click save when you are done."
          confirmText="Save changes"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`sheet-side-name-${side}`} className="text-right">
              Name
            </Label>
            <Input
              id={`sheet-side-name-${side}`}
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`sheet-side-username-${side}`} className="text-right">
              Username
            </Label>
            <Input
              id={`sheet-side-username-${side}`}
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </Sheet>
      ))}
    </div>
  )
}
