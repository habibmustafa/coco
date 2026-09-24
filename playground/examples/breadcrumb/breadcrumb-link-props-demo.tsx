import { Breadcrumb } from '../../../src'

export default function BreadcrumbLinkPropsDemo() {
  return (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: 'Components', href: '/components' },
        { label: 'Breadcrumb' },
      ]}
    />
  )
}
