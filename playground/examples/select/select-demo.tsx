import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '../../../src'

export default function SelectDemo() {
  return (
    <SelectRoot defaultValue="postgres">
      <SelectTrigger className="max-w-xs">
        <SelectValue placeholder="Pick a database" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="postgres">Postgres</SelectItem>
        <SelectItem value="mysql">MySQL</SelectItem>
        <SelectItem value="redis">Redis</SelectItem>
        <SelectItem value="mongo" disabled>
          MongoDB
        </SelectItem>
      </SelectContent>
    </SelectRoot>
  )
}
