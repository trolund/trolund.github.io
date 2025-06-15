'use client';

import { FC } from 'react';
import NightParticleCanvas from '../components/canvas/NightParticleCanvas';
import NoiseParticleCanvas from '../components/canvas/NoiseParticleCanvas';
import { useTheme } from 'next-themes';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const FrontBackDrop: FC = () => {
  const { resolvedTheme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    !prefersReducedMotion &&
    (resolvedTheme === 'dark' ? <NightParticleCanvas /> : <NoiseParticleCanvas />)
  );
};

export default FrontBackDrop;
