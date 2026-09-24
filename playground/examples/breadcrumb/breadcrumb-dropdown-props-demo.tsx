import { Slash } from 'lucide-react'

import { Breadcrumb } from '../../../src'

export default function BreadcrumbDropdownPropsDemo() {
  return (
    <Breadcrumb
      separator={<Slash />}
      items={[
        { label: 'Home', href: '/' },
        {
          label: 'Components',
          menuItems: [{ label: 'Documentation' }, { label: 'Themes' }, { label: 'GitHub' }],
        },
        { label: 'Breadcrumb' },
      ]}
    />
  )
}
