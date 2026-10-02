import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'

import { DateField } from '../src/components/atoms/forms/date-field'

const field = () => screen.getByRole('textbox') as HTMLInputElement

function type(input: HTMLInputElement, digits: string) {
  for (const digit of digits) fireEvent.keyDown(input, { key: digit })
}

test('empty and unfocused carries the hint as a placeholder, not as a value', () => {
  render(<DateField />)
  // nothing typed → no real value; the muted native placeholder carries the hint
  expect(field().value).toBe('')
  expect(field().placeholder).toBe('DD.MM.YYYY')
})

test('focus reveals the format hint, typing pads the partial segment with zeros', () => {
  render(<DateField />)
  const input = field()

  fireEvent.focus(input)
  // focused and still empty → the letters become the value, so the caret can sit in a segment
  expect(input.value).toBe('DD.MM.YYYY')

  type(input, '1')
  // half-typed day renders as 01, not 1D — explicit requirement
  expect(input.value).toBe('01.MM.YYYY')

  type(input, '4')
  expect(input.value).toBe('14.MM.YYYY')
})

test('a complete date commits once and rejects further digits', () => {
  const onChange = vi.fn()
  render(<DateField onChange={onChange} />)
  const input = field()

  fireEvent.focus(input)
  type(input, '14031990')
  expect(input.value).toBe('14.03.1990')
  expect(onChange).toHaveBeenLastCalledWith(new Date(1990, 2, 14))

  // typing past the last segment used to keep shifting digits into the year
  const callsWhenComplete = onChange.mock.calls.length
  type(input, '7')
  expect(input.value).toBe('14.03.1990')
  expect(onChange).toHaveBeenCalledTimes(callsWhenComplete)
})

test('the day is clamped to the real length of the typed month', () => {
  const onChange = vi.fn()
  render(<DateField onChange={onChange} />)
  const input = field()

  fireEvent.focus(input)
  type(input, '31022021') // February 2021 has 28 days
  expect(onChange).toHaveBeenLastCalledWith(new Date(2021, 1, 28))
  expect(input.value).toBe('28.02.2021')
})

test('retyping over a committed date does not mix in the old digits', () => {
  render(<DateField defaultValue={new Date(2020, 9, 3)} />)
  const input = field()
  expect(input.value).toBe('03.10.2020')

  fireEvent.focus(input)
  fireEvent.keyDown(input, { key: 'Home' })
  type(input, '14031990')
  expect(input.value).toBe('14.03.1990')
})

test('arrow up/down steps the focused segment', () => {
  render(<DateField defaultValue={new Date(2020, 9, 3)} />)
  const input = field()

  fireEvent.focus(input)
  fireEvent.keyDown(input, { key: 'Home' })
  fireEvent.keyDown(input, { key: 'ArrowUp' })
  expect(input.value).toBe('04.10.2020')

  fireEvent.keyDown(input, { key: 'ArrowRight' })
  fireEvent.keyDown(input, { key: 'ArrowDown' })
  expect(input.value).toBe('04.09.2020')
})

test('backspace clears the focused segment back to its placeholder', () => {
  const onChange = vi.fn()
  render(<DateField defaultValue={new Date(2020, 9, 3)} onChange={onChange} />)
  const input = field()

  fireEvent.focus(input)
  fireEvent.keyDown(input, { key: 'End' })
  fireEvent.keyDown(input, { key: 'Backspace' })
  expect(input.value).toBe('03.10.YYYY')
  // an incomplete date is no date
  expect(onChange).toHaveBeenLastCalledWith(null)
})

test('paste fills every segment', () => {
  const onChange = vi.fn()
  render(<DateField onChange={onChange} />)
  const input = field()

  fireEvent.paste(input, { clipboardData: { getData: () => '14.03.1990' } })
  expect(input.value).toBe('14.03.1990')
  expect(onChange).toHaveBeenLastCalledWith(new Date(1990, 2, 14))
})

test('a complete date outside min/max is marked invalid but still typeable', () => {
  render(<DateField minDate={new Date(2020, 0, 1)} />)
  const input = field()

  fireEvent.focus(input)
  type(input, '1403')
  // partial dates are never flagged
  expect(input.getAttribute('aria-invalid')).toBe('false')

  type(input, '1990')
  expect(input.value).toBe('14.03.1990')
  expect(input.getAttribute('aria-invalid')).toBe('true')
})

test('a custom format reorders the segments and the placeholder', () => {
  render(<DateField format="YYYY-MM-DD" />)
  const input = field()

  fireEvent.focus(input)
  expect(input.placeholder).toBe('YYYY-MM-DD')
  type(input, '19900314')
  expect(input.value).toBe('1990-03-14')
})

test('readOnly and disabled ignore keystrokes', () => {
  const onChange = vi.fn()
  const { unmount } = render(<DateField readOnly onChange={onChange} />)
  type(field(), '14031990')
  expect(field().value).toBe('')
  unmount()

  render(<DateField disabled onChange={onChange} />)
  type(field(), '14031990')
  expect(field().value).toBe('')
  expect(onChange).not.toHaveBeenCalled()
})
