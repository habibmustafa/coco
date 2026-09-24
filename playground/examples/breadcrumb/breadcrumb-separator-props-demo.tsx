import { Slash } from 'lucide-react'

import { Breadcrumb } from '../../../src'

export default function BreadcrumbSeparatorPropsDemo() {
  return (
    <Breadcrumb
      separator={<Slash />}
      items={[
        { label: 'Home', href: '/' },
        { label: 'Components', href: '/components' },
        { label: 'Breadcrumb' },
      ]}
    />
  )
}
