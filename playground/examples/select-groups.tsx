import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '../../src'

export default function SelectGroups() {
  return (
    <Select defaultValue="postgres">
      <SelectTrigger className="max-w-xs">
        <SelectValue placeholder="Pick a database" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Relational</SelectLabel>
          <SelectItem value="postgres">Postgres</SelectItem>
          <SelectItem value="mysql">MySQL</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Other</SelectLabel>
          <SelectItem value="redis">Redis</SelectItem>
          <SelectItem value="mongo" disabled>
            MongoDB
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
