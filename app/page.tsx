import NavBar from '../components/nav-bar';
import menuItems from '../constants/menu';
import FrontBanner from '../components/front-banner';
import { TITLE } from '@/lib/constants';
import FrontBackDrop from '@/components/home-backdrop';
import ContactReactor from '@/components/contact-reactor';
import ContactWaves from '@/components/contact-waves';
import ContactMesh from '@/components/contact-mesh';
import ContactSpring from '@/components/contact-spring';
import ContactGravity from '@/components/contact-gravity';
import ContactCloth from '@/components/contact-cloth';
import ContactCharge from '@/components/contact-charge';
import ContactLattice from '@/components/contact-lattice';

export const metadata = {
  title: `${TITLE} | Home`,
};

export default function Page() {
  return (
    <>
      <NavBar items={menuItems} />
      <main className="vt-page overflow-x-hidden">
        <FrontBanner />
        <FrontBackDrop />
        <ContactReactor />
        <ContactWaves />
        <ContactMesh />
        <ContactSpring />
        <ContactGravity />
        <ContactCloth />
        <ContactCharge />
        <ContactLattice />
      </main>
    </>
  );
}
