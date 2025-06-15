'use client';

import { useCronitor } from '@/hooks/useCronitor';

export default function ClientInit() {
  useCronitor(process.env.NEXT_PUBLIC_CRONITORIO_CLIENT_KEY ?? '');
  return null;
}
