import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../src'

export default function SelectSizes() {
  return (
    <div className="flex w-full flex-col gap-3">
      {(['tiny', 'small', 'medium', 'large', 'xlarge'] as const).map((size) => (
        <Select key={size}>
          <SelectTrigger size={size} className="max-w-xs">
            <SelectValue placeholder={size} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      ))}
    </div>
  )
}
