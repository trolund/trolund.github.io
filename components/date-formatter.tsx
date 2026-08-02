import { parseISO, format } from 'date-fns';

type DateFormatterProps = {
  date: Date | string;
};

export default function DateFormatter({ date: dateString }: DateFormatterProps) {
  const date = dateString instanceof Date ? dateString : parseISO(dateString);
  const dateTime = dateString instanceof Date ? dateString.toISOString() : dateString;

  return <time dateTime={dateTime}>{format(date, 'LLLL	d, yyyy')}</time>;
}
