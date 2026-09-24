import { Breadcrumb } from '../../../src'

export default function BreadcrumbEllipsisPropsDemo() {
  return (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/' },
        { label: null, ellipsis: true },
        { label: 'Components', href: '/docs/components' },
        { label: 'Breadcrumb' },
      ]}
    />
  )
}
