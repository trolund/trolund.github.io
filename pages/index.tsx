import Head from 'next/head';
import NavBar from '../components/nav-bar';
import menu from '../constants/menu';
import { TITLE } from '../lib/constants';
import FrontBanner from '../components/front-banner';
import NightParticleCanvas from '../components/canvas/NightParticleCanvas';
import { useTheme } from '../hooks/ThemeContext';
import VectorFieldParticleCanvas from '../components/canvas/VectorFieldParticleCanvas';

export default function Index() {
  const { isDark } = useTheme();

  return (
    <>
      <NavBar items={menu} noBackground />
      <Head>
        <title>{TITLE}</title>
      </Head>
      <div className="overflow-x-hidden overflow-y-hidden">
        <FrontBanner />
        {isDark ? <NightParticleCanvas /> : <VectorFieldParticleCanvas />}
      </div>
    </>
  );
}
