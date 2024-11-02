import Container from '../components/container';
import Layout from '../components/layout';
import { getAllPosts, getContent } from '../lib/api';
import Head from 'next/head';
import NavBar from '../components/nav-bar';
import menu from '../constants/menu';
import PostTitle from '../components/post-title';
import ProjectsView from '../components/projects';
import PostBody from '../components/post-body';
import HeroPost from '../components/hero-post';
import { BlogPost } from '../types/blogPost';
import { TITLE } from '../lib/constants';

type IndexProps = {
  allPosts: BlogPost[];
  blog: BlogPost;
};

export default function Index({ allPosts, blog }: IndexProps) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <NavBar items={menu} spacing />
      <Layout>
        <Head>
          <title>{TITLE} | Blog</title>
        </Head>
        <Container>
          <PostTitle>Blog</PostTitle>
          <PostBody className="mx-auto" content={blog.content} />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
              className="glow:bg-opacity-10 glow:bg-purple-800 glow:border-violet-900"
              technologies={heroPost.technologies}
            />
          )}
          {morePosts.length > 0 && (
            <ProjectsView
              className="glow:bg-opacity-10 glow:bg-purple-800 glow:border-violet-900"
              posts={morePosts}
            />
          )}
        </Container>
      </Layout>
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
    'technologies',
    'language',
  ]);

  const blog = getContent('blog', ['title', 'content']);

  return {
    props: { allPosts, blog } as IndexProps,
  };
}
