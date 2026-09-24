import {
  Card,
  Table,
} from '../../../src'

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit card',
    description: 'Website design services',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
    description: 'Monthly subscription fee',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank transfer',
    description: 'Consulting hours',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit card',
    description: 'Software license renewal',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
    description: 'Custom development work',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank transfer',
    description: 'Hosting and maintenance',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit card',
    description: 'Training session package',
  },
]

export default function TableDemo() {
  return (
    <Card.Root className="w-full">
      <Table.Root>
        <Table.Caption className="border-0">A list of your recent invoices</Table.Caption>
        <Table.Header>
          <Table.Row>
            <Table.Head>Invoice</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Method</Table.Head>
            <Table.Head className="hidden md:table-cell">Description</Table.Head>
            <Table.Head className="text-right">Amount</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {invoices.map((invoice) => (
            <Table.Row key={invoice.invoice}>
              <Table.Cell className="text-foreground font-mono">{invoice.invoice}</Table.Cell>
              <Table.Cell className="text-foreground-lighter">{invoice.paymentStatus}</Table.Cell>
              <Table.Cell className="text-foreground-lighter">{invoice.paymentMethod}</Table.Cell>
              <Table.Cell className="hidden md:table-cell text-foreground-muted">
                {invoice.description}
              </Table.Cell>
              <Table.Cell className="text-right">{invoice.totalAmount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={4}>Total</Table.Cell>
            <Table.Cell className="text-right">$2,250.00</Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </Card.Root>
  )
}
