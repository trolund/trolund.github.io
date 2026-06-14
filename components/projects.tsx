import { BlogPost } from '../types/blogPost';
import ProjectItem from './project-item';
import ProjectsControls from './projects-controls';
import {
  INITIAL_VISIBLE_PROJECTS,
  PROJECTS_EMPTY_STATE_ID,
  PROJECTS_GRID_ID,
} from './projects-constants';

interface ProjectsViewProps {
  posts: BlogPost[];
}

const getSearchContent = (post: BlogPost): string => {
  return [post.title, post.excerpt, ...(post.technologies ?? [])]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
};

export default function ProjectsView({ posts }: ProjectsViewProps) {
  const searchIndex = posts.map((post) => getSearchContent(post));

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-8">
        <ProjectsControls searchIndex={searchIndex} />
        <div id={PROJECTS_GRID_ID} className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <div
              key={post.slug}
              data-project-card={true}
              hidden={index >= INITIAL_VISIBLE_PROJECTS}
            >
              <ProjectItem
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                slug={post.slug}
                excerpt={post.excerpt}
                technologies={post.technologies}
                content={''}
                language={post.language}
                priority={index < 3}
              />
            </div>
          ))}
          <div id={PROJECTS_EMPTY_STATE_ID} className="col-span-full text-center" hidden={true}>
            <p className="text-gray-500 dark:text-gray-400">No projects match that search.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
