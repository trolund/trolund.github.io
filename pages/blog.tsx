import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Layout from '../components/layout'
import { getAllPosts } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME, TITLE } from '../lib/constants'
import One from '../components/One'
import Menu from '../components/Menu'
import menu from '../constants/menu'
import PostTitle from '../components/post-title'

export default function Index({ allPosts }) {
    const heroPost = allPosts[0]
    const morePosts = allPosts.slice(1)
    return (
        <>
            <Menu items={menu} disableScroll spacing />
            <Layout>
                <Head>
                    <title>{TITLE}</title>
                </Head>
                <Container>
                    <PostTitle>Blog</PostTitle>
                    {heroPost && (
                        <HeroPost
                            title={heroPost.title}
                            coverImage={heroPost.coverImage}
                            date={heroPost.date}
                            author={heroPost.author}
                            slug={heroPost.slug}
                            excerpt={heroPost.excerpt}
                        />
                    )}
                    {morePosts.length > 0 && <MoreStories posts={morePosts} />}
                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const allPosts = getAllPosts([
        'title',
        'date',
        'slug',
        'author',
        'coverImage',
        'excerpt',
    ])

    return {
        props: { allPosts },
    }
}
