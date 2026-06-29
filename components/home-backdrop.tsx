'use client';

import { FC } from 'react';
import NightParticleCanvas from '../components/canvas/NightParticleCanvas';
import NoiseParticleCanvas from '../components/canvas/NoiseParticleCanvas';
import { useTheme } from 'next-themes';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useMounted } from '@/hooks/useMounted';

const FrontBackDrop: FC = () => {
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const mounted = useMounted();
  if (!mounted) return null;
  return (
    !prefersReducedMotion &&
    (resolvedTheme === 'dark' ? <NightParticleCanvas /> : <NoiseParticleCanvas />)
  );
};

export default FrontBackDrop;
