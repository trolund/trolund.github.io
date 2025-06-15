import { getAllPosts, getPostBySlug } from '@/lib/api';
import { notFound } from 'next/navigation';
import PostHeader from '@/components/post-header';
import PostBody from '@/components/post-body';
import Layout from '@/components/layout';
import NavBar from '@/components/nav-bar';
import Container from '@/components/container';
import { TITLE } from '@/lib/constants';
import menu from '@/constants/menu';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts(['slug']);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, ['title', 'ogImage']);
  if (!post) return {};
  return {
    title: `${TITLE} | ${post.title}`,
    openGraph: {
      images: [post.ogImage.url],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) notFound();
  
  const post = await getPostBySlug(slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'language',
    'technologies',
  ]);

  if (!post) notFound();

  return (
    <>
      <NavBar items={menu} spacing />
      <Layout>
        <Container>
          <article className="mb-32">
            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              language={post.language}
              technologies={post.technologies}
              slug={post.slug}
            />
            <PostBody content={post.content} />
          </article>
        </Container>
      </Layout>
    </>
  );
}
