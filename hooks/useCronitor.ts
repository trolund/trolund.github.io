'use client';

import type { CronitorRUMConfig } from '@cronitorio/cronitor-rum';
import * as Cronitor from '@cronitorio/cronitor-rum';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export function useCronitor(clientKey: string, config: CronitorRUMConfig = {}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    Cronitor.load(clientKey, config);
  }, [clientKey, config]);

  useEffect(() => {
    Cronitor.track('Pageview');
  }, [pathname, searchParams]);

  return Cronitor;
}
