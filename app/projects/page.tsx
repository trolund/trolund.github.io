import Container from '@/components/container';
import PostTitle from '@/components/post-title';
import ProjectsView from '@/components/projects';
import StaticMarkdown from '@/components/static-markdown';
import { getAllProjects, getContent } from '@/lib/api';
import { TITLE } from '@/lib/constants';
import { ContainedPage } from '@/components/site-chrome';

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
    <ContainedPage>
      <Container>
        <PostTitle>Projects</PostTitle>
        <StaticMarkdown className="mx-auto" content={project.content} />
        <ProjectsView posts={projects} />
      </Container>
    </ContainedPage>
  );
}
