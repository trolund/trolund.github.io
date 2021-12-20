import Container from '../components/container'
import Layout from '../components/layout'
import Head from 'next/head'
import TimeLine from '../components/TimeLine'
import Event from '../components/TimeLine/Event'
import { MdSchool, MdWork } from 'react-icons/md'
import menu from '../constants/menu'
import Menu from '../components/Menu'
import ProjectItem from '../components/ProjectItem/ProjectItem'
import PostTitle from '../components/post-title'
import { getAllProjects } from '../lib/api'
import { BlogPost } from '../types/blogPost'
import ProjectsView from '../components/projects'

interface IndexProps {
    projects: BlogPost[];
}

export default function Projects({ projects }: IndexProps) {
    return (
        <>
            <Menu items={menu} disableScroll spacing />
            <Layout>
                <Head>
                    <title>Projects</title>
                </Head>
                <Container>
                    <PostTitle>Projects</PostTitle>
                    <ProjectsView posts={projects} />
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
        'technologies'])

    return {
        props: { projects },
    }
}