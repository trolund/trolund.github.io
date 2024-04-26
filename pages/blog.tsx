import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Layout from '../components/layout'
import { getAllPosts, getContent } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME, TITLE } from '../lib/constants'
import Menu from '../components/Menu'
import menu from '../constants/menu'
import PostTitle from '../components/post-title'
import ProjectsView from '../components/projects'
import PostBody from '../components/post-body'

export default function Index({ allPosts, blog }) {
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
                    <PostBody className='mx-auto' content={blog.content} />
                    {/* {heroPost && (
                        <HeroPost
                            title={heroPost.title}
                            coverImage={heroPost.coverImage}
                            date={heroPost.date}
                            author={heroPost.author}
                            slug={heroPost.slug}
                            excerpt={heroPost.excerpt}
                        />
                    )} */}
                    {morePosts.length > 0 &&  <ProjectsView posts={morePosts} />}
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
        'tags',
        'technologies',
        'language'
    ])

    const blog = getContent("blog", ["title", "content"])

    return {
        props: { allPosts, blog },
    }
}
