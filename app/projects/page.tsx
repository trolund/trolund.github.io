import Container from '@/components/container';
import Layout from '@/components/layout';
import NavBar from '@/components/nav-bar';
import PostBody from '@/components/post-body';
import PostTitle from '@/components/post-title';
import ProjectsView from '@/components/projects';
import menu from '@/constants/menu';
import { getAllProjects, getContent } from '@/lib/api';
import { TITLE } from '@/lib/constants';

export const metadata = {
  title: `${TITLE} | Projects`,
};

export default async function ProjectsPage() {
  const projects = await getAllProjects([
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

  const project = await getContent('project', ['title', 'content']);

  return (
    <>
      <NavBar items={menu} spacing />
      <Layout>
        <Container>
          <PostTitle>Projects</PostTitle>
          <PostBody className="mx-auto" content={project.content} />
          <ProjectsView posts={projects} />
        </Container>
      </Layout>
    </>
  );
}
