import { Progress } from '../../src'

export default function ProgressDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Progress value={15} />
      <Progress value={50} />
      <Progress value={90} />
    </div>
  )
}
