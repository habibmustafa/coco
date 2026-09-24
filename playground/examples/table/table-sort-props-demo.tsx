import { useMemo, useState } from 'react'

import { Card, Table } from '../../../src'

const products = [
  {
    name: 'Wireless Mouse',
    category: 'Electronics',
    price: 29.99,
    description: 'Ergonomic wireless mouse with long battery life',
  },
  {
    name: 'Keyboard',
    category: 'Electronics',
    price: 79.99,
    description: 'Mechanical keyboard with RGB lighting',
  },
  {
    name: 'Monitor Stand',
    category: 'Furniture',
    price: 35.5,
    description: 'Wooden monitor stand with cable management',
  },
  {
    name: 'Webcam',
    category: 'Electronics',
    price: 99.99,
    description: '4K webcam with auto-focus',
  },
  {
    name: 'Desk Chair',
    category: 'Furniture',
    price: 199.99,
    description: 'Ergonomic office chair with lumbar support',
  },
  {
    name: 'USB-C Hub',
    category: 'Electronics',
    price: 49.99,
    description: 'Multi-port USB-C hub with HDMI output',
  },
]

type SortColumn = 'name' | 'category' | 'price'

export default function TableSortPropsDemo() {
  const [sort, setSort] = useState('name:asc')

  const handleSortChange = (column: string) => {
    const [currentCol, currentOrder] = sort.split(':')
    setSort(
      currentCol === column
        ? currentOrder === 'asc'
          ? `${column}:desc`
          : 'name:asc'
        : `${column}:asc`
    )
  }

  const sortedProducts = useMemo(() => {
    const [sortCol, sortOrder] = sort.split(':') as [SortColumn, 'asc' | 'desc']
    const orderMultiplier = sortOrder === 'asc' ? 1 : -1

    return [...products].sort((a, b) => {
      if (sortCol === 'name') return a.name.localeCompare(b.name) * orderMultiplier
      if (sortCol === 'category') return a.category.localeCompare(b.category) * orderMultiplier
      if (sortCol === 'price') return (a.price - b.price) * orderMultiplier
      return 0
    })
  }, [sort])

  return (
    <Card.Root className="w-full">
      <Table
        rowKey={(row) => row.name}
        data={sortedProducts}
        sort={sort}
        onSortChange={handleSortChange}
        columns={[
          {
            key: 'name',
            header: 'Product',
            sortable: true,
            cellClassName: 'text-foreground',
            render: (row) => row.name,
          },
          {
            key: 'category',
            header: 'Category',
            sortable: true,
            cellClassName: 'text-foreground-lighter',
            render: (row) => row.category,
          },
          {
            key: 'description',
            header: 'Description',
            headerClassName: 'hidden md:table-cell',
            cellClassName: 'hidden md:table-cell text-foreground-muted',
            render: (row) => row.description,
          },
          {
            key: 'price',
            header: 'Price',
            align: 'right',
            sortable: true,
            render: (row) => `$${row.price.toFixed(2)}`,
          },
        ]}
      />
    </Card.Root>
  )
}
