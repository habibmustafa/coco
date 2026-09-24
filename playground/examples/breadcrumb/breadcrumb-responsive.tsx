'use client'

import * as React from 'react'
import { Breadcrumb, Button, Drawer, DropdownMenu } from '../../../src'

function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false)

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener('change', onChange)
    setValue(result.matches)

    return () => result.removeEventListener('change', onChange)
  }, [query])

  return value
}

const items = [
  { href: '#', label: 'Home' },
  { href: '#', label: 'Documentation' },
  { href: '#', label: 'Build Your Application' },
  { href: '#', label: 'Data Fetching' },
  { label: 'Caching and Revalidating' },
]

const ITEMS_TO_DISPLAY = 3

export default function BreadcrumbResponsiveDemo() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild>
            <a href={items[0].href ?? '/'}>{items[0].label}</a>
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        {items.length > ITEMS_TO_DISPLAY ? (
          <>
            <Breadcrumb.Item>
              {isDesktop ? (
                <DropdownMenu.Root open={open} onOpenChange={setOpen}>
                  <DropdownMenu.Trigger className="flex items-center gap-1" aria-label="Toggle menu">
                    <Breadcrumb.Ellipsis className="size-4" />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content align="start">
                    {items.slice(1, -2).map((item, index) => (
                      <DropdownMenu.Item key={index} asChild>
                        <a href={item.href ? item.href : '#'}>{item.label}</a>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              ) : (
                <Drawer open={open} onOpenChange={setOpen}>
                  <Drawer.Trigger aria-label="Toggle Menu">
                    <Breadcrumb.Ellipsis className="h-4 w-4" />
                  </Drawer.Trigger>
                  <Drawer.Content>
                    <Drawer.Header className="text-left">
                      <Drawer.Title>Navigate to</Drawer.Title>
                      <Drawer.Description>Select a page to navigate to.</Drawer.Description>
                    </Drawer.Header>
                    <div className="grid gap-1 px-4">
                      {items.slice(1, -2).map((item, index) => (
                        <a
                          key={index}
                          href={item.href ? item.href : '#'}
                          className="py-1 text-sm"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <Drawer.Footer className="pt-4">
                      <Drawer.Close asChild>
                        <Button variant="outline">Close</Button>
                      </Drawer.Close>
                    </Drawer.Footer>
                  </Drawer.Content>
                </Drawer>
              )}
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
          </>
        ) : null}
        {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 ? <Breadcrumb.Separator /> : null}
            <Breadcrumb.Item>
              {item.href ? (
                <Breadcrumb.Link asChild className="max-w-20 truncate md:max-w-none">
                  <a href={item.href}>{item.label}</a>
                </Breadcrumb.Link>
              ) : (
                <Breadcrumb.Page className="max-w-20 truncate md:max-w-none">
                  {item.label}
                </Breadcrumb.Page>
              )}
            </Breadcrumb.Item>
          </React.Fragment>
        ))}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
