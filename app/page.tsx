'use client';

import Head from 'next/head';
import NavBar from '../components/nav-bar';
import menu from '../constants/menu';
import { TITLE } from '../lib/constants';
import FrontBanner from '../components/front-banner';
import NightParticleCanvas from '../components/canvas/NightParticleCanvas';
import NoiseParticleCanvas from '../components/canvas/NoiseParticleCanvas';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { usePrefersReducedTransparency } from '../hooks/usePrefersReducedTransparency';
import { useTheme } from 'next-themes';

export default function Page() {
  const { theme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const reduceTransparency = usePrefersReducedTransparency();
  return (
    <>
      <NavBar items={menu} noBackground={!reduceTransparency} />
      <Head>
        <title>{TITLE}</title>
      </Head>
      <div className="overflow-x-hidden overflow-y-hidden">
        <FrontBanner />
        {!prefersReducedMotion && (theme === "dark" ? <NightParticleCanvas /> : <NoiseParticleCanvas />)}
      </div>
    </>
  );
}
