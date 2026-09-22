import { Switch } from '../../src'

export default function SwitchStates() {
  return (
    <>
      <Switch />
      <Switch defaultChecked />
      <Switch disabled />
      <Switch disabled defaultChecked />
    </>
  )
}
