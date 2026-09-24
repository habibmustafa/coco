import { Breadcrumb } from '../../../src'

export default function BreadcrumbResponsivePropsDemo() {
  return (
    <Breadcrumb
      maxItems={4}
      overflow="responsive"
      items={[
        { label: 'Home', href: '#' },
        { label: 'Documentation', href: '#' },
        { label: 'Build Your Application', href: '#' },
        { label: 'Data Fetching', href: '#' },
        { label: 'Caching and Revalidating' },
      ]}
    />
  )
}
