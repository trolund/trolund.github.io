import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import menu from '../constants/menu'
import Menu from '../components/Menu'
import PostTitle from '../components/post-title'
import ProfileCard from '../components/profile-card/profile-card'
import { getContent } from '../lib/api'
import Car2 from '../components/Car2/Car2'

export default function HireMe({ page }) {

    return (
        <>
            <Menu items={menu} disableScroll spacing />
            <Layout>
                <Head>
                    <title>Hire me</title>
                </Head>
                <Container>
                    <PostTitle>Not yet.....</PostTitle>
                    <Car2 style={{ width: "300px" }} moveBody moveWheels clouds />
                    <p>Page is under construction....</p>
                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const page = getContent("about", ["title", "content"])

    return {
        props: { page },
    }
}

