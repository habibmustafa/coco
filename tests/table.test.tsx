import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { Button } from '../src/components/atoms/actions/button'
import { Table } from '../src/components/atoms/data-display/table'

type Row = { id: string; name: string; size: number }

const rows: Row[] = [
  { id: 'a', name: 'alpha', size: 3 },
  { id: 'b', name: 'beta', size: 1 },
]

const columns = [
  { key: 'name', header: 'Name', sortable: true, render: (row: Row) => row.name },
  { key: 'size', header: 'Size', align: 'right' as const, render: (row: Row) => row.size },
]

test('only sortable headers expose aria-sort, and the active one reflects the sort string', () => {
  render(<Table columns={columns} data={rows} rowKey={(row) => row.id} sort="name:desc" />)

  expect(screen.getByRole('columnheader', { name: /Name/ }).getAttribute('aria-sort')).toBe(
    'descending'
  )
  expect(screen.getByRole('columnheader', { name: 'Size' }).getAttribute('aria-sort')).toBeNull()
})

test('a sortable header reports the clicked column key', () => {
  const onSortChange = vi.fn()
  render(
    <Table columns={columns} data={rows} rowKey={(row) => row.id} onSortChange={onSortChange} />
  )

  // no sort yet → the header is still announced as sortable
  expect(screen.getByRole('columnheader', { name: /Name/ }).getAttribute('aria-sort')).toBe('none')

  fireEvent.click(screen.getByRole('button', { name: /Name/ }))
  expect(onSortChange).toHaveBeenCalledWith('name')
})

test('sorting round-trips through consumer state', () => {
  function Host() {
    const [sort, setSort] = useState<string | undefined>()
    return (
      <Table
        columns={columns}
        data={rows}
        rowKey={(row) => row.id}
        sort={sort}
        onSortChange={(column) => setSort(sort === `${column}:asc` ? `${column}:desc` : `${column}:asc`)}
      />
    )
  }
  render(<Host />)

  const header = () => screen.getByRole('columnheader', { name: /Name/ })
  fireEvent.click(screen.getByRole('button', { name: /Name/ }))
  expect(header().getAttribute('aria-sort')).toBe('ascending')
  fireEvent.click(screen.getByRole('button', { name: /Name/ }))
  expect(header().getAttribute('aria-sort')).toBe('descending')
})

test('onRowClick fires for a click anywhere in the row', () => {
  const onRowClick = vi.fn()
  render(
    <Table columns={columns} data={rows} rowKey={(row) => row.id} onRowClick={onRowClick} />
  )

  // a real click always lands on a cell, never on the <tr> itself
  fireEvent.click(screen.getByText('alpha'))
  expect(onRowClick).toHaveBeenCalledTimes(1)
  expect(onRowClick.mock.calls[0][0]).toEqual(rows[0])
})

test('onRowClick ignores clicks on interactive children', () => {
  const onRowClick = vi.fn()
  const onAction = vi.fn()
  render(
    <Table
      columns={[
        ...columns,
        {
          key: 'action',
          header: 'Action',
          render: () => <Button onClick={onAction}>Edit</Button>,
        },
      ]}
      data={rows}
      rowKey={(row) => row.id}
      onRowClick={onRowClick}
    />
  )

  fireEvent.click(screen.getAllByRole('button', { name: 'Edit' })[0])
  expect(onAction).toHaveBeenCalledTimes(1)
  expect(onRowClick).not.toHaveBeenCalled()
})

test('rows are keyboard-activatable only when onRowClick is set', () => {
  const onRowClick = vi.fn()
  const { unmount } = render(
    <Table columns={columns} data={rows} rowKey={(row) => row.id} onRowClick={onRowClick} />
  )

  const row = screen.getByText('beta').closest('tr')!
  expect(row.getAttribute('tabindex')).toBe('0')
  fireEvent.keyDown(row, { key: 'Enter' })
  fireEvent.keyDown(row, { key: ' ' })
  expect(onRowClick).toHaveBeenCalledTimes(2)
  unmount()

  render(<Table columns={columns} data={rows} rowKey={(row) => row.id} />)
  expect(screen.getByText('beta').closest('tr')!.getAttribute('tabindex')).toBeNull()
})
