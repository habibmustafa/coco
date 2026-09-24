import { useMemo, useState } from 'react'

import {
  Card,
  Table,
} from '../../../src'

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

type ProductSort =
  | 'name:asc'
  | 'name:desc'
  | 'category:asc'
  | 'category:desc'
  | 'price:asc'
  | 'price:desc'
type ProductSortColumn = 'name' | 'category' | 'price'
type ProductSortOrder = 'asc' | 'desc'

export default function TableSort() {
  const [sort, setSort] = useState<ProductSort>('name:asc')

  const handleSortChange = (column: ProductSortColumn) => {
    const [currentCol, currentOrder] = sort.split(':') as [ProductSortColumn, ProductSortOrder]
    if (currentCol === column) {
      // Cycle through: asc -> desc -> no sort (default)
      if (currentOrder === 'asc') {
        setSort(`${column}:desc` as ProductSort)
      } else {
        // Reset to default sort (name:asc)
        setSort('name:asc')
      }
    } else {
      // New column, start with asc
      setSort(`${column}:asc` as ProductSort)
    }
  }

  const ariaSort = (column: ProductSortColumn) => {
    const [currentCol, currentOrder] = sort.split(':') as [ProductSortColumn, ProductSortOrder]
    if (currentCol !== column) return undefined
    return currentOrder === 'asc' ? 'ascending' : 'descending'
  }

  const sortedProducts = useMemo(() => {
    const [sortCol, sortOrder] = sort.split(':') as [ProductSortColumn, ProductSortOrder]
    const orderMultiplier = sortOrder === 'asc' ? 1 : -1

    return [...products].sort((a, b) => {
      if (sortCol === 'name') {
        return a.name.localeCompare(b.name) * orderMultiplier
      }
      if (sortCol === 'category') {
        return a.category.localeCompare(b.category) * orderMultiplier
      }
      if (sortCol === 'price') {
        return (a.price - b.price) * orderMultiplier
      }
      return 0
    })
  }, [sort])

  return (
    <Card.Root className="w-full">
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head aria-sort={ariaSort('name')}>
              <Table.HeadSort column="name" currentSort={sort} onSortChange={handleSortChange}>
                Product
              </Table.HeadSort>
            </Table.Head>
            <Table.Head aria-sort={ariaSort('category')}>
              <Table.HeadSort column="category" currentSort={sort} onSortChange={handleSortChange}>
                Category
              </Table.HeadSort>
            </Table.Head>
            <Table.Head className="hidden md:table-cell">Description</Table.Head>
            <Table.Head className="text-right" aria-sort={ariaSort('price')}>
              <Table.HeadSort
                className="justify-end"
                column="price"
                currentSort={sort}
                onSortChange={handleSortChange}
              >
                Price
              </Table.HeadSort>
            </Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {sortedProducts.map((product) => (
            <Table.Row key={product.name}>
              <Table.Cell className="text-foreground">{product.name}</Table.Cell>
              <Table.Cell className="text-foreground-lighter">{product.category}</Table.Cell>
              <Table.Cell className="hidden md:table-cell text-foreground-muted">
                {product.description}
              </Table.Cell>
              <Table.Cell className="text-right">${product.price.toFixed(2)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card.Root>
  )
}
