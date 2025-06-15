import Card from '@/components/card';
import Button from '@/components/button';
import Link from 'next/link';
import { TbError404 } from 'react-icons/tb';
import Splitter from '@/components/splitter';

export default function NotFoundPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white p-5">
      <Card className="justify-between p-5 text-center text-content-text">
        <TbError404 size={90} className="ml-auto mr-auto" />
        <h1 className="mb-2 text-3xl font-bold">Page Not Found</h1>
        <Splitter />
        <div className="p-5">
          🙈 Oops! The page you were looking for doesn’t exist or has been moved.
        </div>
        <Link href="/">
          <Button>Back to homepage</Button>
        </Link>
      </Card>
    </div>
  );
}
