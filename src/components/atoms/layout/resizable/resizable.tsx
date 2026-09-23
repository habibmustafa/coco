/*
 * Hybrid API layer (docs/hybrid-api-migration.md) for Resizable — Strategy A, discriminator
 * `panels`. Not present upstream. Each entry becomes a `ResizablePanel` wrapping `content`,
 * with a `ResizableHandle` automatically inserted between consecutive panels.
 */
import * as React from 'react'

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './resizable-parts'

type RootProps = React.ComponentProps<typeof ResizablePanelGroup>

export interface ResizablePanelSpec {
  content: React.ReactNode
  id?: string
  defaultSize?: number | string
  minSize?: number | string
  maxSize?: number | string
  collapsible?: boolean
  collapsedSize?: number | string
}

type ResizablePropsMode = Omit<RootProps, 'children'> & {
  panels: readonly ResizablePanelSpec[]
  /** Shows the drag-handle grip icon on every inserted ResizableHandle. @default true */
  withHandle?: boolean
  children?: never
}

type ResizableCompoundProps = RootProps & { panels?: never }

export type ResizableProps = ResizablePropsMode | ResizableCompoundProps

export function ResizableHybrid(props: ResizableProps) {
  if (props.panels === undefined) {
    return <ResizablePanelGroup {...props} />
  }

  const { panels, withHandle = true, ...rootProps } = props

  return (
    <ResizablePanelGroup {...rootProps}>
      {panels.map((panel, index) => (
        <React.Fragment key={panel.id ?? index}>
          <ResizablePanel
            id={panel.id}
            defaultSize={panel.defaultSize}
            minSize={panel.minSize}
            maxSize={panel.maxSize}
            collapsible={panel.collapsible}
            collapsedSize={panel.collapsedSize}
          >
            {panel.content}
          </ResizablePanel>
          {index < panels.length - 1 && <ResizableHandle withHandle={withHandle} />}
        </React.Fragment>
      ))}
    </ResizablePanelGroup>
  )
}
