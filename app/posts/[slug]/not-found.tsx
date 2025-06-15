'use client';

import { useSearchParams } from 'next/navigation';

export default function NotFoundPage() {
  const searchParams = useSearchParams();

  return <><p>🙈 Sorry, this post could not be found.</p>
    <p>Not found. Query: {searchParams.get('q')}</p></>;
}