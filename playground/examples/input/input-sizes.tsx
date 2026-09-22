import { Input } from '../../../src'

export default function InputSizes() {
  return (
    <div className="flex w-full flex-col gap-3">
      <Input size="tiny" placeholder="tiny" />
      <Input size="small" placeholder="small" />
      <Input size="medium" placeholder="medium" />
      <Input size="large" placeholder="large" />
      <Input size="xlarge" placeholder="xlarge" />
    </div>
  )
}
