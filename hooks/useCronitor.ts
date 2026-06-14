'use client';

import type { CronitorRUMConfig } from '@cronitorio/cronitor-rum';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

let cronitorModulePromise: Promise<typeof import('@cronitorio/cronitor-rum')> | null = null;

const loadCronitor = async () => {
  if (!cronitorModulePromise) {
    cronitorModulePromise = import('@cronitorio/cronitor-rum');
  }

  return cronitorModulePromise;
};

export async function trackCronitorEvent(event: string, payload?: { message?: string }) {
  const Cronitor = await loadCronitor();
  Cronitor.track(event, payload);
}

export function useCronitor(clientKey: string, config: CronitorRUMConfig = {}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!clientKey) return;

    void loadCronitor().then((Cronitor) => {
      Cronitor.load(clientKey, config);
    });
  }, [clientKey, config]);

  useEffect(() => {
    if (!clientKey) return;

    void trackCronitorEvent('Pageview');
  }, [clientKey, pathname, searchParams]);
}
