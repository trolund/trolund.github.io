import Container from '../components/container';
import Layout from '../components/layout';
import Head from 'next/head';
import menu from '../constants/menu';
import NavBar from '../components/nav-bar';
import PostTitle from '../components/post-title';
import ProfileCard from '../components/profile-card';
import { getContent } from '../lib/api';
import PostBody from '../components/post-body';
import styles from '../pages/css/about.module.css';
import SubPostTitle from '../components/sub-post-title';
import CertificationItem from '../components/certification-item';
import { TITLE } from '../lib/constants';

type AboutProps = {
  page: {
    about: {
      title: string;
      content: string;
    };
    experience: {
      title: string;
      content: string;
    };
    education: {
      title: string;
      content: string;
    };
  };
};

export default function About({ page }: AboutProps) {
  return (
    <>
      <NavBar items={menu} spacing />
      <Layout>
        <Head>
          <title>{`${TITLE} | About`}</title>
        </Head>
        <div className="mb-10 flex flex-col gap-10">
          <Container>
            <PostTitle>About me</PostTitle>
            <ProfileCard />
            <PostBody className="mx-auto" content={page.about.content} />
          </Container>
          <Container className={styles.skillsList}>
            <SubPostTitle>Experience</SubPostTitle>
            <PostBody className="mx-auto" content={page.experience.content} />
          </Container>
          <Container className={styles.skillsList}>
            <SubPostTitle>Education</SubPostTitle>
            <PostBody className="mx-auto" content={page.education.content} />
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

export async function getStaticProps() {
  const about = getContent('about', ['title', 'content']);
  const experience = getContent('experience', ['title', 'content']);
  const education = getContent('education', ['title', 'content']);

  return {
    props: { page: { about, experience, education } } as AboutProps,
  };
}
