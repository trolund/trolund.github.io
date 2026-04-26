import FrontBanner from '../components/front-banner';
import { TITLE } from '@/lib/constants';
import FrontBackDrop from '@/components/home-backdrop';
import { ImmersivePage } from '@/components/site-chrome';

export const metadata = {
  title: `${TITLE} | Home`,
};

export default function Page() {
  return (
    <ImmersivePage mainClassName="overflow-y-hidden">
      <div className="relative">
        <FrontBanner />
        <FrontBackDrop />
      </div>
    </ImmersivePage>
  );
}
