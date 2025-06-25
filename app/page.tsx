import NavBar from '../components/nav-bar';
import menu from '../constants/menu';
import FrontBanner from '../components/front-banner';
import { TITLE } from '@/lib/constants';
import FrontBackDrop from '@/components/home-backdrop';
import { ExampleScrollingCards } from '@/components/scroll-reveal-cards';

export const metadata = {
  title: `${TITLE} | Home`,
};

const cardsData = [
  'Card 1 content here',
  'Card 2 content here',
  'Card 3 content here',
  'Card 4 content here',
];

export default function Page() {
  return (
    <>
      <NavBar items={menu} noBackground={true} />
      <div className="overflow-x-hidden overflow-y-hidden">
        <FrontBanner />
        <FrontBackDrop />
      </div>
      <section className='py-10 md:py-16'>
          <ExampleScrollingCards />
      </section>
      <section className="bg-white">
        <div className="container mx-auto bg-white px-4 py-10">
          <h2 className="mb-6 text-2xl font-bold">Cards Section</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cardsData.map((content, index) => (
              <div key={index} className="rounded-lg bg-gray-200 p-4 shadow-md">
                {content}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
