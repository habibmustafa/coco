import { Card, Table, TableCell, TableRow } from '../../../src'

interface Invoice {
  invoice: string
  paymentStatus: string
  totalAmount: string
  paymentMethod: string
  description: string
}

const invoices: Invoice[] = [
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

export default function TablePropsDemo() {
  return (
    <Card className="w-full">
      <Table
        caption="A list of your recent invoices"
        classNames={{ caption: 'border-0' }}
        rowKey={(row: Invoice) => row.invoice}
        data={invoices}
        columns={[
          {
            key: 'invoice',
            header: 'Invoice',
            cellClassName: 'text-foreground font-mono',
            render: (row: Invoice) => row.invoice,
          },
          {
            key: 'status',
            header: 'Status',
            cellClassName: 'text-foreground-lighter',
            render: (row: Invoice) => row.paymentStatus,
          },
          {
            key: 'method',
            header: 'Method',
            cellClassName: 'text-foreground-lighter',
            render: (row: Invoice) => row.paymentMethod,
          },
          {
            key: 'description',
            header: 'Description',
            headerClassName: 'hidden md:table-cell',
            cellClassName: 'hidden md:table-cell text-foreground-muted',
            render: (row: Invoice) => row.description,
          },
          { key: 'amount', header: 'Amount', align: 'right', render: (row: Invoice) => row.totalAmount },
        ]}
        footer={
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">$2,250.00</TableCell>
          </TableRow>
        }
      />
    </Card>
  )
}
