import { ChevronDown, Slash } from 'lucide-react'
import { Breadcrumb, DropdownMenu } from '../../../src'

export default function BreadcrumbDropdownDemo() {
  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild>
            <a href="/">Home</a>
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <Slash />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
              Components
              <ChevronDown />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="start">
              <DropdownMenu.Item>Documentation</DropdownMenu.Item>
              <DropdownMenu.Item>Themes</DropdownMenu.Item>
              <DropdownMenu.Item>GitHub</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
          <Slash />
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
          <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
