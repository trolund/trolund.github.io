import { parseISO, format } from 'date-fns'

type DateFormatterProps = {
  date: string | any
}

export default function DateFormatter({ date: dateString }: DateFormatterProps) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}
