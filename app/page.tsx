import NavBar from '../components/nav-bar';
import menu from '../constants/menu';
import FrontBanner from '../components/front-banner';
import { TITLE } from '@/lib/constants';
import FrontBackDrop from '@/components/home-backdrop';
import ScrollRevealCards from '@/components/scroll-reveal-cards';

export const metadata = {
  title: `${TITLE} | Home`,
};

const cardsData = [
  "Card 1 content here",
  "Card 2 content here",
  "Card 3 content here",
  "Card 4 content here",
];

export default function Page() {
  return (
    <>
      <NavBar items={menu} noBackground={true} />
      <div className="overflow-x-hidden overflow-y-hidden">
        <FrontBanner />
        <FrontBackDrop />
      </div>
      <section>
        <div style={{ background: "#f0f0f0", minHeight: "150vh", padding: 20 }}>
          <h1>Scroll to reveal cards</h1>
          <ScrollRevealCards cards={cardsData} />
        </div>
      </section>
    </>
  );
}
