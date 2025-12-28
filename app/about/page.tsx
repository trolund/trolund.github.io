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
import Timeline, { TimelineDivider, TimelineItem } from '@/components/timeline';
import AboutHero from '@/components/about-hero';

export const metadata = {
  title: `${TITLE} | About`,
};

type EducationCourse = {
  code: string;
  title: string;
  ects: string;
  term: string;
};

const bengCourses: EducationCourse[] = [
  {
    code: '02180',
    title: 'Introduktion til kunstig intelligens',
    ects: '5.0',
    term: 's20',
  },
  {
    code: '02262',
    title: 'Applikation til optimering af medier og undervisning',
    ects: '20.0',
    term: 's20',
  },
  {
    code: 'PRA62',
    title: 'IT Minds ApS',
    ects: '30.0',
    term: 'v19',
  },
  {
    code: '02346',
    title: 'Distribuerede og parallelle systemer',
    ects: '5.0',
    term: 's19',
  },
  {
    code: '62413',
    title: 'Avanceret objektorienteret programmering med C# og .NET',
    ects: '5.0',
    term: 's19',
  },
  {
    code: '62417',
    title: 'Mobil applikationsudvikling med Swift',
    ects: '5.0',
    term: 's19',
  },
  {
    code: '62596',
    title: 'Distribuerede systemer',
    ects: '5.0',
    term: 's19',
  },
  {
    code: '62562',
    title: 'Større backends - drift, videreudvikling og integration',
    ects: '5.0',
    term: 's19',
  },
  {
    code: '01920',
    title: 'Basismat 2 - Videregående matematik for diplomingeniører',
    ects: '5.0',
    term: 'v18',
  },
  {
    code: '02148',
    title: 'Introduktion til koordinering af fordelte applikationer',
    ects: '5.0',
    term: 'v18',
  },
  {
    code: '02450',
    title: 'Introduktion til machine learning og data mining',
    ects: '5.0',
    term: 'v18',
  },
  {
    code: '62527',
    title: 'Big data',
    ects: '5.0',
    term: 'v18',
  },
  {
    code: '62999',
    title: 'Innovation pilot',
    ects: '10.0',
    term: 'v18',
  },
  {
    code: '62409',
    title: 'C# programmering for Java programmører',
    ects: '5.0',
    term: 's18',
  },
  {
    code: '62410',
    title: 'CDIO-projekt',
    ects: '10.0',
    term: 's18',
  },
  {
    code: '62577',
    title: 'Datakommunikation',
    ects: '5.0',
    term: 's18',
  },
  {
    code: '02323',
    title: 'Introduktion til statistik',
    ects: '5.0',
    term: 'v17',
  },
  {
    code: '02332',
    title: 'Compilerteknik',
    ects: '5.0',
    term: 'v17',
  },
  {
    code: '02368',
    title: 'Objektorienteret analyse og design',
    ects: '5.0',
    term: 'v17',
  },
  {
    code: '62550',
    title: 'Brugerinteraktion og udvikling på mobile enheder',
    ects: '10.0',
    term: 'v17',
  },
  {
    code: '62588',
    title: 'Operativsystemer',
    ects: '5.0',
    term: 'v17',
  },
  {
    code: '02324',
    title: 'Videregående programmering',
    ects: '10.0',
    term: 's17',
  },
  {
    code: '02326',
    title: 'Algoritmer og datastrukturer',
    ects: '5.0',
    term: 's17',
  },
  {
    code: '02327',
    title: 'Indledende databaser og databaseprogrammering',
    ects: '5.0',
    term: 's17',
  },
  {
    code: '01901',
    title: 'Basismat - Indledende matematik for diplomingeniører',
    ects: '5.0',
    term: 'v16',
  },
  {
    code: '01004',
    title: 'Diskret matematik',
    ects: '5.0',
    term: 'v16',
  },
  {
    code: '02312',
    title: 'Indledende programmering',
    ects: '10.0',
    term: 'v16',
  },
  {
    code: '02313',
    title: 'Udviklingsmetoder til IT-systemer',
    ects: '5.0',
    term: 'v16',
  },
  {
    code: '02315',
    title: 'Versionsstyring og testmetoder',
    ects: '5.0',
    term: 'v16',
  },
];

const mscCourses: EducationCourse[] = [
  {
    code: 'E01',
    title: 'Design og implementering af en WebAssembly Compiler Back-End',
    ects: '32.5',
    term: 'v23',
  },
  {
    code: '02247',
    title: 'Oversætterkonstruktion',
    ects: '5.0',
    term: 's23',
  },
  {
    code: '02268',
    title: 'Procesorienterede og event-drevne softwaresystemer',
    ects: '5.0',
    term: 's23',
  },
  {
    code: '02155',
    title: 'Computerarkitektur',
    ects: '5.0',
    term: 'v22',
  },
  {
    code: '02223',
    title: 'Modelbaseret systems engineering',
    ects: '7.5',
    term: 'v22',
  },
  {
    code: '02229',
    title: 'Systemoptimering',
    ects: '7.5',
    term: 'v22',
  },
  {
    code: '02266',
    title: 'User experience engineering',
    ects: '5.0',
    term: 'v22',
  },
  {
    code: '02193',
    title: 'Etisk hacking',
    ects: '5.0',
    term: 's22',
  },
  {
    code: '02233',
    title: 'Netværkssikkerhed',
    ects: '5.0',
    term: 's22',
  },
  {
    code: '02239',
    title: 'Datasikkerhed',
    ects: '7.5',
    term: 's21',
  },
  {
    code: '02383',
    title: 'Programmering i C++',
    ects: '5.0',
    term: 's21',
  },
  {
    code: '42430',
    title: 'Projektledelse',
    ects: '5.0',
    term: 's21',
  },
  {
    code: '02221',
    title: 'Grundlæggende distribuerede systemer',
    ects: '5.0',
    term: 's21',
  },
  {
    code: '02257',
    title: 'Anvendt funktionsprogrammering',
    ects: '5.0',
    term: 's21',
  },
  {
    code: '02291',
    title: 'Systemintegration',
    ects: '5.0',
    term: 's21',
  },
  {
    code: '02157',
    title: 'Funktionsprogrammering',
    ects: '5.0',
    term: 'v20',
  },
  {
    code: '02267',
    title: 'Softwareudvikling af webtjenester',
    ects: '5.0',
    term: 'v20',
  },
];

const formatTerm = (term: string) => {
  const match = term.match(/^([sv])(\d{2})$/i);
  if (!match) return term;
  const season = match[1].toLowerCase() === 's' ? 'Spring' : 'Autumn';
  const year = Number(match[2]);
  const fullYear = year < 50 ? 2000 + year : 1900 + year;
  return `${season} ${fullYear}`;
};

const renderEducationTable = (courses: EducationCourse[]) => (
  <div className="overflow-x-auto">
    <table className="min-w-full text-left text-xs text-content-text">
      <thead className="text-[0.6rem] uppercase tracking-[0.28em] text-content-text opacity-60">
        <tr>
          <th scope="col" className="py-2 pr-4 font-semibold">
            Code
          </th>
          <th scope="col" className="py-2 pr-4 font-semibold">
            Course
          </th>
          <th scope="col" className="py-2 pr-4 text-right font-semibold">
            ECTS
          </th>
          <th scope="col" className="py-2 text-right font-semibold">
            Term
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border-color">
        {courses.map((course) => (
          <tr key={`${course.code}-${course.title}`}>
            <td className="py-2 pr-4 font-semibold">{course.code}</td>
            <td className="py-2 pr-4 text-sm">{course.title}</td>
            <td className="py-2 pr-4 text-right tabular-nums">{course.ects}</td>
            <td className="py-2 text-right tabular-nums">{formatTerm(course.term)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const renderDiplomaLink = () => (
  <div className="mt-4">
    <a
      href="#certifications"
      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-content-text opacity-70 transition-opacity duration-200 hover:opacity-100"
    >
      <span>View diploma</span>
      <span aria-hidden="true">→</span>
    </a>
  </div>
);

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
            <Timeline>
              <TimelineItem
                category="experience"
                title="Software Engineer"
                subtitle="Copenhagen Optimization"
                period="Jul. 2025 – Present"
                description="In-house full-stack engineer creating products that help airports operate more efficiently."
                logo={{
                  light: '/assets/logos/copopt-logomark-RGB-POS.png',
                  dark: '/assets/logos/copopt-logomark-RGB-NEG.png',
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}
              />
              <TimelineItem
                category="experience"
                title="Software Engineer"
                subtitle="cVation"
                period="Mar. 2024 – Jun. 2025"
                description="Consulted on Azure cloud projects with an emphasis on modern web stacks using .NET and TypeScript."
                logo={{
                  light: '/assets/logos/cvation_logo_processed.jpeg',
                  dark: '/assets/logos/cvation_white.png',
                  width: 50,
                  height: 50,
                  borderRadius: 10,
                }}
              />
              <TimelineItem
                category="experience"
                title="Development Engineer"
                subtitle="Logos Payment Solutions"
                period="Nov. 2020 – Jul. 2022"
                description="Part-time full-stack developer delivering payment systems alongside my Industry Master studies."
                logo={{
                  light: '/assets/logos/logos_processed.jpeg',
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                }}
              />
              <TimelineItem
                category="experience"
                title="Software Developer"
                subtitle="IT Minds"
                period="Aug. 2020 – Nov. 2020"
                description="Consultant focused on .NET and React engagements while studying."
                logo={{
                  light: '/assets/logos/itminds_processed.jpg',
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                }}
              />
              <TimelineItem
                category="experience"
                title="Software Developer (Internship)"
                subtitle="IT Minds"
                period="Aug. 2019 – Feb. 2020"
                description="Developed and tested internal products and supported customer deliveries."
                logo={{
                  light: '/assets/logos/itminds_processed.jpg',
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                }}
              />
              <TimelineItem
                category="experience"
                title="Software Developer"
                subtitle="Technical University of Denmark"
                period="Jul. 2019 – Oct. 2019"
                description="Contributed software to an EU project targeting reductions in fertilizer usage."
                logo={{
                  light: '/assets/logos/dtu.png',
                  width: 50,
                  height: 70,
                }}
              />
              <TimelineDivider label="Education" />
              <TimelineItem
                category="education"
                title="MSc Eng. – Computer Science and Engineering"
                subtitle="Technical University of Denmark (DTU)"
                period="Graduated February 2024"
                description="Focused on theoretical computer science while finalizing an Industry Master of Science in Engineering."
                logo={{
                  light: '/assets/logos/dtu.png',
                  width: 50,
                  height: 70,
                }}
                detailsTable={
                  <>
                    {renderEducationTable(mscCourses)}
                    {renderDiplomaLink()}
                  </>
                }
              />
              <TimelineItem
                category="education"
                title="B.Eng – Software Technology"
                subtitle="Technical University of Denmark (DTU)"
                period="Graduated July 2020"
                description="Specialized in applied software engineering and practical product development."
                logo={{
                  light: '/assets/logos/dtu.png',
                  width: 50,
                  height: 70,
                }}
                detailsTable={renderEducationTable(bengCourses)}
              />
            </Timeline>
          </Container>
          <Container>
            <SubPostTitle id="certifications">Certifications & Diplomas</SubPostTitle>
            <div className="flex flex-row flex-wrap justify-center gap-5">
              <CertificationItem
                image="/assets/dansk-standard.jpeg"
                title="Project Management"
                subTitle="ISO 21500 and ISO 21502"
                label="Certification"
                href="https://app.diplomasafe.com/en-US/diploma/db16b9c7a5637f7b39a3fdc1e0460851a1198a015"
              />
              <CertificationItem
                image="/assets/logos/dtu.png"
                title="Computer science and engineering"
                subTitle="Master of Science in Engineering"
                label="Diploma"
                href="https://app.diplomasafe.com/en-US/diploma/de152fbe5546056362f0766592ebe39741c592fc5/master-of-science-in-engineering"
              />
            </div>
          </Container>
        </div>
      </Layout>
    </>
  );
}
