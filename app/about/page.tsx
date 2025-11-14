import Container from '@/components/container';
import Layout from '@/components/layout';
import NavBar from '@/components/nav-bar';
import PostTitle from '@/components/post-title';
import SubPostTitle from '@/components/sub-post-title';
import menuItems from '@/constants/menu';
import { TITLE } from '@/lib/constants';
import { getContent } from '@/lib/api';
import Head from 'next/head';
import CertificationItem from '@/components/certification-item';
import Timeline, { TimelineItem } from '@/components/timeline';
import AboutHero from '@/components/about-hero';

export const metadata = {
  title: `${TITLE} | About`,
};

const timelineItems: TimelineItem[] = [
  {
    category: 'experience',
    title: 'Software Engineer',
    subtitle: 'Copenhagen Optimization',
    period: 'Jul. 2025 – Present',
    description: 'In-house full-stack engineer creating products that help airports operate more efficiently.',
    logo: {
      light: '/assets/logos/copopt-logomark-RGB-POS.png',
      dark: '/assets/logos/copopt-logomark-RGB-NEG.png',
      width: 50,
      height: 50,
      borderRadius: 10,
    },
  },
  {
    category: 'experience',
    title: 'Software Engineer',
    subtitle: 'cVation',
    period: 'Mar. 2024 – Jun. 2025',
    description: 'Consulted on Azure cloud projects with an emphasis on modern web stacks using .NET and TypeScript.',
    logo: {
      light: '/assets/logos/cvation_logo_processed.jpeg',
      dark: '/assets/logos/cvation_white.png',
      width: 50,
      height: 50,
      borderRadius: 10,
    },
  },
  {
    category: 'experience',
    title: 'Development Engineer',
    subtitle: 'Logos Payment Solutions',
    period: 'Nov. 2020 – Jul. 2022',
    description: 'Part-time full-stack developer delivering payment systems alongside my Industry Master studies.',
    logo: {
      light: '/assets/logos/logos_processed.jpeg',
      width: 50,
      height: 50,
      borderRadius: 100,
    },
  },
  {
    category: 'experience',
    title: 'Software Developer',
    subtitle: 'IT Minds',
    period: 'Aug. 2020 – Nov. 2020',
    description: 'Consultant focused on .NET and React engagements while studying.',
    logo: {
      light: '/assets/logos/itminds_processed.jpg',
      width: 50,
      height: 50,
      borderRadius: 100,
    },
  },
  {
    category: 'experience',
    title: 'Software Developer (Internship)',
    subtitle: 'IT Minds',
    period: 'Aug. 2019 – Feb. 2020',
    description: 'Developed and tested internal products and supported customer deliveries.',
    logo: {
      light: '/assets/logos/itminds_processed.jpg',
      width: 50,
      height: 50,
      borderRadius: 100,
    },
  },
  {
    category: 'experience',
    title: 'Software Developer',
    subtitle: 'Technical University of Denmark',
    period: 'Jul. 2019 – Oct. 2019',
    description: 'Contributed software to an EU project targeting reductions in fertilizer usage.',
    logo: {
      light: '/assets/logos/dtu.png',
      width: 50,
      height: 70,
    },
  },
  {
    category: 'education',
    title: 'MSc Eng. – Computer Science and Engineering',
    subtitle: 'Technical University of Denmark (DTU)',
    period: 'Graduated 2024',
    description: 'Focused on theoretical computer science while finalizing an Industry Master of Science in Engineering.',
    logo: {
      light: '/assets/logos/dtu.png',
      width: 50,
      height: 70,
    },
  },
  {
    category: 'education',
    title: 'B.Eng – Software Technology',
    subtitle: 'Technical University of Denmark (DTU)',
    period: 'Graduated 2020',
    description: 'Specialized in applied software engineering and practical product development.',
    logo: {
      light: '/assets/logos/dtu.png',
      width: 50,
      height: 70,
    },
  },
];

export default async function AboutPage() {
  const about = await getContent('about', ['title', 'content']);

  return (
    <>
      <NavBar items={menuItems} spacing />
      <Layout>
        <Head>
          <title>{`${TITLE} | About`}</title>
        </Head>
        <div className="mb-10 flex flex-col gap-10">
          <Container>
            <PostTitle>About me</PostTitle>
            <AboutHero content={about.content} />
          </Container>
          <Container>
            <SubPostTitle>Experience &amp; Education Timeline</SubPostTitle>
            <Timeline items={timelineItems} />
          </Container>
          <Container>
            <SubPostTitle>Certifications & Diplomas</SubPostTitle>
            <div className="flex flex-row flex-wrap justify-center gap-5">
              <CertificationItem
                image="/assets/dansk-standard.jpeg"
                title="Project Management"
                subTitle="ISO 21500 and ISO 21502"
                href="https://app.diplomasafe.com/en-US/diploma/db16b9c7a5637f7b39a3fdc1e0460851a1198a015"
              />
              <CertificationItem
                image="/assets/logos/dtu.png"
                title="Computer science and engineering"
                subTitle="Master of Science in Engineering"
                href="https://app.diplomasafe.com/en-US/diploma/de152fbe5546056362f0766592ebe39741c592fc5/master-of-science-in-engineering"
              />
            </div>
          </Container>
        </div>
      </Layout>
    </>
  );
}
