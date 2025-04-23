import { getAllPosts, getAllProjects } from '../lib/api';
import Head from 'next/head';
import NavBar from '../components/nav-bar';
import menu from '../constants/menu';
import { TITLE } from '../lib/constants';
import FrontBanner from '../components/front-banner';
import GameOfLife from '../components/game-of-life';

export default function Index() {
  return (
    <>
      <NavBar items={menu} />
      <Head>
        <title>{TITLE}</title>
      </Head>
      <GameOfLife />
      <FrontBanner />
    </>
  );
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
  ]);

  const projects = getAllProjects([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags',
    'technologies',
  ]);

  return {
    props: { allPosts, projects },
  };
}
