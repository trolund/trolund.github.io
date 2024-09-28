import { getAllPosts, getAllProjects } from '../lib/api'
import Head from 'next/head'
import One from '../components/front-banner'
import Menu from '../components/Menu'
import menu from '../constants/menu'
import { BlogPost } from '../types/blogPost'
import { TITLE } from '../lib/constants'

interface IndexProps {
  allPosts: BlogPost[];
  projects: BlogPost[];
}

export default function Index({ allPosts, projects }: IndexProps) {
  return (
    <>
      <Menu items={menu} disableScroll spacing />
        <Head>
          <title>{TITLE}</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link>
        </Head>
        <One />
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
    'tags'
  ])

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
    props: { allPosts, projects },
  }
}
