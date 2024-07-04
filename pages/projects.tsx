import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import menu from '../constants/menu'
import Menu from '../components/Menu'
import PostTitle from '../components/post-title'
import { getAllProjects, getContent } from '../lib/api'
import { BlogPost } from '../types/blogPost'
import ProjectsView from '../components/projects'
import PostBody from '../components/post-body'
import { Glow, GlowCapture } from '@codaworks/react-glow'

interface IndexProps {
    projects: BlogPost[];
    project: BlogPost;
}

export default function Projects({ projects, project }: IndexProps) {
    return (
        <>
            <Menu items={menu} disableScroll spacing />
            <Layout>
                <Head>
                    <title>Projects</title>
                </Head>
                <Container>
                    <PostTitle>Projects</PostTitle>
                    <PostBody className='mx-auto' content={project.content} />
                    <GlowCapture>
                        <Glow color='purple'>
                            <ProjectsView className='glow:bg-opacity-10 glow:bg-purple-800 glow:border-violet-900' posts={projects} />
                        </Glow>
                    </GlowCapture>
                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const projects = getAllProjects([
        'title',
        'date',
        'slug',
        'author',
        'coverImage',
        'excerpt',
        'tags',
        'technologies',
        'language'])

    const project = getContent("project", ["title", "content"])

    return {
        props: { projects, project },
    }
}