import Head from 'next/head';
import NavBar from '../components/nav-bar';
import menu from '../constants/menu';
import { TITLE } from '../lib/constants';
import FrontBanner from '../components/front-banner';
import NightParticleCanvas from '../components/canvas/NightParticleCanvas';
import { useTheme } from '../hooks/ThemeContext';
import NoiseParticleCanvas from '../components/canvas/NoiseParticleCanvas';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { usePrefersReducedTransparency } from '../hooks/usePrefersReducedTransparency';

export default function Index() {
  const { isDark } = useTheme();
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
        {!prefersReducedMotion && (isDark ? <NightParticleCanvas /> : <NoiseParticleCanvas />)}
      </div>
    </>
  );
}
