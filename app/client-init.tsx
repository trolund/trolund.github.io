'use client';

import { useEffect } from 'react';
import { useCronitor } from '@/hooks/useCronitor';

export default function ClientInit() {
  useCronitor(process.env.NEXT_PUBLIC_CRONITORIO_CLIENT_KEY ?? '');

  useEffect(() => {
    if (!('popover' in HTMLElement.prototype)) {
      import('@oddbird/popover-polyfill/fn').then(({ apply }) => apply());
    }
  }, []);

  return null;
}
