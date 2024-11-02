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
import Experience from '../components/experience';
import SubPostTitle from '../components/sub-post-title';
import Education from '../components/education';
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
          <title>{TITLE} | About</title>
        </Head>
        <Container>
          <PostTitle>About me</PostTitle>
          <ProfileCard />
          <PostBody className="mx-auto" content={page.about.content} />
        </Container>

        <Container className={styles.skillsList}>
          <SubPostTitle>Experience</SubPostTitle>
          <Experience mdcontent={page.experience.content} />
        </Container>

        <Container className={styles.skillsList}>
          <SubPostTitle>Education</SubPostTitle>
          <Education mdcontent={page.education.content} />
        </Container>
        {/* <Container>
          <SubPostTitle>Skills</SubPostTitle>
          <div>
            <div
              style={{ marginTop: "30px", marginBottom: "30px" }}
              className="gap-3 grid-cols-3 grid-rows-3 md:grid md:grid-flow-row lg:grid"
            >
              <div
                className="box card-low lg:m-0 md:m-0 m-3 glow:bg-opacity-10 glow:bg-purple-800 glow:border-violet-900 row-span-2 text-center"
                style={{
                  backgroundColor: "var(--footer)",
                  backgroundPositionX: "center",
                  backgroundPositionY: "center",
                  backgroundImage: "url(assets/ERD.svg)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "40rem",
                  minHeight: "150px",
                  fontWeight: 700,
                  fontSize: "300%",
                  color: "var(--dark-text)",
                }}
              >
                <h1
                  className="glow:text-glow/50"
                  style={{ ...textStyles, color: "var(--content-text)" }}
                >
                  Data modelling
                </h1>
              </div>
              <div className="card-low lg:m-0 md:m-0 m-3 glow:bg-opacity-10 glow:bg-purple-800 glow:border-violet-900 col-span-2 col-start-2 text-center">
                <div style={{ minHeight: "150px" }}>
                  <Text
                    initDelay={15}
                    color="transparent"
                    containerStyles={{
                      ...animatedTextStyles,
                      minHeight: "50px",
                    }}
                    input={[
                      "Web",
                      "Back-end",
                      "Front-end",
                      "Mobile-app development",
                    ]}
                    onlyWhenVisible
                    infinity
                    wordBreakTime={5}
                    writeSpeed={300}
                    underscoreStyles={{ color: "grey" }}
                  />
                </div>
              </div>
              <div className="box card-low lg:m-0 md:m-0 m-3 glow:bg-opacity-10 glow:bg-purple-800 glow:border-violet-900 col-span-1 col-start-2 text-center">
                <div style={{ minHeight: "150px" }}>
                  <Text
                    initDelay={15}
                    color="transparent"
                    containerStyles={{
                      ...animatedTextStyles,
                      minHeight: "50px",
                    }}
                    input={[
                      "C#",
                      "Java",
                      "TypeScript",
                      ".NET",
                      "SQL",
                      "Next.js",
                      "React.js",
                      "F#",
                    ]}
                    onlyWhenVisible
                    infinity
                    wordBreakTime={5}
                    writeSpeed={300}
                    underscoreStyles={{ color: "grey" }}
                  />
                </div>
              </div>
              <div
                className={`${styles.ux} card-low lg:m-0 md:m-0 m-3 glow:bg-opacity-10 glow:bg-purple-800 text-center`}
              >
                <h1 style={textStyles}>UX design</h1>
              </div>
              <div
                className="box card-low lg:m-0 md:m-0 m-3 glow:bg-opacity-10 glow:bg-purple-800 glow:border-violet-900 col-span-2 col-start-1 text-center"
                style={{
                  backgroundColor: "var(--footer)",
                  backgroundPositionX: "center",
                  backgroundPositionY: "center",
                  backgroundImage: "url(assets/webservices.png)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "140%",
                  minHeight: "150px",
                  fontWeight: 200,
                  fontSize: "300%",
                  color: "var(--dark-text)",
                }}
              >
                <h1 style={{ ...textStyles, color: "var(--content-text)" }}>
                  Web Services
                </h1>
              </div>
              <div
                className="box card-low lg:m-0 md:m-0 m-3 glow:bg-opacity-10 glow:bg-purple-800 glow:border-violet-900 text-center"
                style={{
                  backgroundColor: "var(--bg-color)",
                  textShadow: "2px 2px var(--dark-text)",
                  backgroundPositionX: "center",
                  backgroundPositionY: "center",
                  backgroundImage: "url(assets/legos.png)",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "50%",
                  minHeight: "150px",
                  fontWeight: 700,
                  fontSize: "300%",
                  color: "white",
                }}
              >
                <h1 style={textStyles}>Design Patterns</h1>
              </div>
            </div>
          </div>
        </Container> */}
        <Container>
          <SubPostTitle>Certifications</SubPostTitle>
          <div className="flex flex-row flex-wrap">
            <CertificationItem
              image="/assets/dansk-standard.jpeg"
              imgCss={{ width: '110px' }}
              title="Project Management"
              subtitel="ISO 21500 and ISO 21502"
              href="https://app.diplomasafe.com/en-US/diploma/db16b9c7a5637f7b39a3fdc1e0460851a1198a015"
            />
            <CertificationItem
              image="/assets/logos/dtu.png"
              title="Master of Science in Engineering"
              subtitel="Computer science and engineering"
              href="https://app.diplomasafe.com/en-US/diploma/de152fbe5546056362f0766592ebe39741c592fc5/master-of-science-in-engineering"
            />
          </div>
        </Container>
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
