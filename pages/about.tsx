import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import menu from '../constants/menu'
import Menu from '../components/Menu'
import PostTitle from '../components/post-title';
import ProfileCard from '../components/profile-card/profile-card'
import { getContent } from '../lib/api'
import PostBody from '../components/post-body'
import Text from '../components/text/text'
import CSSProperties from 'react';
import Card from '../components/Card/Card'
import styles from "../pages/css/about.module.css"
import Experience from '../components/experience/experience'
import SubPostTitle from '../components/sub-post-title'

export default function About({ page }) {

    const textStyles: CSSProperties.CSSProperties= { transform: "translateY(-50%)", top: "50%", position: "absolute", width: "100%" }

    const animatedTextStyles: CSSProperties.CSSProperties = { textAlign: "center", verticalAlign: "baseline", fontSize: "3rem", background: "var(--gradient)", WebkitBackgroundClip: "text", backgroundClip: "text", fontWeight: 700, ...textStyles, minHeight: "150px" }
    
    return (
        <>
            <Menu items={menu} disableScroll spacing />
            <Layout>
                <Head>
                    <title>About</title>
                </Head>
                <Container>
                    <PostTitle>About me</PostTitle>
                    <ProfileCard />
                    <PostBody className='mx-auto' content={page.about.content} />
                </Container>

                <Container className={styles.skillsList}>
                    <SubPostTitle>Experience</SubPostTitle>
                    <Experience mdcontent={page.experience.content} />                    
                </Container>

                <Container className={styles.skillsList}>
                    <SubPostTitle>Education</SubPostTitle>
                    <Experience mdcontent={page.education.content} />  
                </Container>

                {/* <TimeLine title="TimeLine" paragraph="Timeline of jobs and education">
                    <Event title="HF - 2016" paragraph="Falkonergårdens Gymnasium" placement={0} year={2012} icon={<MdSchool size={32} />} />
                    <Event title="Diplomingenør" paragraph="Danmarks Tekniske Universitet, Softwareteknologi" placement={0.1} year={2016} icon={<MdSchool size={32} />} />
                    <Event title="Fuldtid hos IT Minds" paragraph="Praktik som en del af Diplomingenøruddanelsen" year={2019} placement={0.12} icon={<MdWork size={32} />} />
                    <Event title="Erhverskandidat" paragraph="Danmarks Tekniske Universitet, Computer science" year={2020} placement={0.22} icon={<MdSchool size={32} />} />
                    <Event title="Deltids job hos IT Minds" paragraph="Udvikler, 25 timer/uge sideløbende med Erhverskandidat" year={2020} placement={0.22} icon={<MdWork size={32} />} />
                    <Event title="Deltids job hos Logos Design" paragraph="Udviklingsingiør, 25 timer/uge sideløbende med Erhverskandidat" year={2020} placement={0.33} icon={<MdWork size={32} />} />
                </TimeLine> */}
                <Container>
                    <SubPostTitle>Skills</SubPostTitle>
                    <div>
                        <div style={{ marginTop: "30px", marginBottom: "30px", }} className="lg:grid md:grid grid-cols-3 grid-rows-3 gap-3 md:grid-flow-row">
                      
                                <div className="box row-span-2 text-center card-low lg:m-0 md:m-0 m-3" style={{ backgroundColor: "var(--footer)", backgroundPositionX: "center", backgroundPositionY: "center", backgroundImage: "url(assets/ERD.svg)", backgroundRepeat: "no-repeat", backgroundSize: "40rem", minHeight: "150px", fontWeight: 700, fontSize: "300%", color: "var(--dark-text)", filter: "invert(var(--is-dark))" }}>
                                    <h1 style={textStyles}>Data modelling</h1>
                                </div>
                                <div className="col-start-2 col-span-2 text-center card-low lg:m-0 md:m-0 m-3">
                                    <div style={{ minHeight: "150px"}}>
                                        <Text
                                            initDelay={15}
                                            color='transparent'
                                            containerStyles={{...animatedTextStyles, minHeight: "50px"}}
                                            input={['Web', 'Back-end', 'Front-end', 'Mobile-app development']}
                                            onlyWhenVisible
                                            infinity
                                            wordBreakTime={5}
                                            writeSpeed={300}
                                            underscoreStyles={{ color: "grey" }} />
                                    </div>
                                </div>
                                <div className="box col-start-2 col-span-1 text-center card-low lg:m-0 md:m-0 m-3">
                                    <div style={{ minHeight: "150px"}}>
                                        <Text
                                            initDelay={15}
                                            color='transparent'
                                            containerStyles={{...animatedTextStyles, minHeight: "50px"}}
                                            input={['C#', 'Java', 'TypeScript', '.NET', 'SQL', 'Next.js', 'React.js', 'F#']}
                                            onlyWhenVisible
                                            infinity
                                            wordBreakTime={5}
                                            writeSpeed={300}
                                            underscoreStyles={{ color: "grey" }}
                                            />
                                        </div>
                                </div>
               
                                <div className={`${styles.ux} text-center card-low lg:m-0 md:m-0 m-3`}>
                                    <h1 style={textStyles}>UX design</h1>
                                </div>
        
                                <div className="box col-start-1 col-span-2 text-center card-low lg:m-0 md:m-0 m-3" style={{ backgroundColor: "var(--footer)", backgroundPositionX: "center", backgroundPositionY: "center", backgroundImage: "url(assets/webservices.png)", backgroundRepeat: "no-repeat", backgroundSize: "140%", minHeight: "150px", fontWeight: 200, fontSize: "300%", color: "var(--dark-text)", textShadow: "rgb(255, 255, 255) 2px 0px 0px, rgb(255, 255, 255) 1.75517px 0.958851px 0px, rgb(255, 255, 255) 1.0806px 1.68294px 0px, rgb(255, 255, 255) 0.141474px 1.99499px 0px, rgb(255, 255, 255) -0.832294px 1.81859px 0px, rgb(255, 255, 255) -1.60229px 1.19694px 0px, rgb(255, 255, 255) -1.97998px 0.28224px 0px, rgb(255, 255, 255) -1.87291px -0.701566px 0px, rgb(255, 255, 255) -1.30729px -1.5136px 0px, rgb(255, 255, 255) -0.421592px -1.95506px 0px, rgb(255, 255, 255) 0.567324px -1.91785px 0px, rgb(255, 255, 255) 1.41734px -1.41108px 0px, rgb(255, 255, 255) 1.92034px -0.558831px 0px", filter: "invert(var(--is-dark))" }}>
                                    <h1 style={textStyles}>Web Services</h1>
                                </div>
                     
                                <div className="box text-center card-low lg:m-0 md:m-0 m-3" style={{ backgroundColor: "var(--bg-color)", textShadow: "2px 2px var(--dark-text)", backgroundPositionX: "center", backgroundPositionY: "center", backgroundImage: "url(assets/legos.png)", backgroundRepeat: "no-repeat", backgroundSize: "50%", minHeight: "150px", fontWeight: 700, fontSize: "300%", color: "white" }}>
                                    <h1 style={textStyles}>Design Patterns</h1>
                                </div>
                        </div>
                    </div>
                </Container>

                <Container>
                    <SubPostTitle>Certifications</SubPostTitle>
                    <div className="flex flex-row md:flex-wrap">
                        <Card className={`w-2/5 p-5 flex flex-col ${styles.ds}`} style={{minHeight: "15rem"}} href="https://app.diplomasafe.com/en-US/diploma/db16b9c7a5637f7b39a3fdc1e0460851a1198a015">
                            <div style={{ marginTop: "auto" }}>
                                <h3>ISO 21500 and ISO 21502</h3>
                                <h2>Project Management</h2>
                            </div>
                        </Card>
                    </div>
                    
                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const about = getContent("about", ["title", "content"])
    const experience = getContent("experience", ["title", "content"])
    const education = getContent("education", ["title", "content"])

    return {
        props: { page: { about, experience, education }},
    }
}

