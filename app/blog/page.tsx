import Container from '@/components/container';
import Layout from '@/components/layout';
import { getAllPosts, getContent } from '@/lib/api';
import NavBar from '@/components/nav-bar';
import menuItems from '@/constants/menu';
import PostTitle from '@/components/post-title';
import ProjectsView from '@/components/projects';
import PostBody from '@/components/post-body';
import HeroPost from '@/components/hero-post';
import SubPostTitle from '@/components/sub-post-title';
import { TITLE } from '@/lib/constants';

export const metadata = {
  title: `${TITLE} | Blog`,
};

export default async function BlogPage() {
  const allPosts = await getAllPosts([
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

  const blog = await getContent('blog', ['title', 'content']);

  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <NavBar items={menuItems} spacing />
      <Layout>
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
          <span className="p-10"></span>
          <SubPostTitle>Older posts</SubPostTitle>
          {morePosts.length > 0 && <ProjectsView posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}
