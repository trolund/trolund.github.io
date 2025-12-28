import NavBar from '../components/nav-bar';
import menuItems from '../constants/menu';
import FrontBanner from '../components/front-banner';
import { TITLE } from '@/lib/constants';
import FrontBackDrop from '@/components/home-backdrop';

export const metadata = {
  title: `${TITLE} | Home`,
};

export default function Page() {
  return (
    <>
      <NavBar items={menuItems} />
      <main className="vt-page overflow-x-hidden overflow-y-hidden">
        <FrontBanner />
        <FrontBackDrop />
      </main>
    </>
  );
}
