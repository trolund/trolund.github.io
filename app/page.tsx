import NavBar from '../components/nav-bar';
import menu from '../constants/menu';
import FrontBanner from '../components/front-banner';
import { TITLE } from '@/lib/constants';
import FrontBackDrop from '@/components/home-backdrop';

export const metadata = {
  title: `${TITLE} | Home`,
};

export default function Page() {
  return (
    <>
      <NavBar items={menu} noBackground={true} />
      <div className="overflow-x-hidden overflow-y-hidden">
        <FrontBanner />
        <FrontBackDrop />
      </div>
    </>
  );
}
