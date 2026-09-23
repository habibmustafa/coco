/*
 * Upstream's demo formats the date with `date-fns`'s `format(date, 'PPP')`. We already carry
 * `dayjs` (added for MetricCard's sparkline tooltip) so this uses `dayjs().format('MMMM D, YYYY')`
 * instead of adding a second date-formatting library for one playground demo.
 */
import dayjs from 'dayjs'
import { useState } from 'react'

import {
  Calendar,
  DatePicker,
  DatePickerButton,
  DatePickerContent,
  DatePickerTrigger,
} from '../../../src'

export default function DatePickerDemo() {
  const [date, setDate] = useState<Date>()

  return (
    <DatePicker>
      <DatePickerTrigger asChild>
        <DatePickerButton variant="outline" className="w-[280px]">
          {date ? dayjs(date).format('MMMM D, YYYY') : <span>Pick a date</span>}
        </DatePickerButton>
      </DatePickerTrigger>
      <DatePickerContent>
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </DatePickerContent>
    </DatePicker>
  )
}
