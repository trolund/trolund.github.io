import { useCallback, useState } from 'react';
import { BlogPost } from '../types/blogPost';
import ProjectItem from './project-item';
import { MdSearch } from 'react-icons/md';

interface ProjectsViewProps {
  posts: BlogPost[];
  className?: string;
}

export default function ProjectsView({ posts, className }: ProjectsViewProps) {
  const [searchTerm, setSearchTerm] = useState<string>();

  const filteredPosts = useCallback(() => {
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm?.toLowerCase() || '') ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm?.toLowerCase() || '')) ||
        (post.technologies &&
          post.technologies.some((tech) =>
            tech.toLowerCase().includes(searchTerm?.toLowerCase() || ''),
          )),
    );
  }, [searchTerm, posts]);

  return (
    <section>
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="relative w-full p-2">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-gray-500 dark:text-gray-400">
            <MdSearch className="h-5 w-5" />
          </div>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="search"
            placeholder="Search"
            className="block w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
        <div className="md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredPosts().map((post) => (
            <ProjectItem
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              slug={post.slug}
              excerpt={post.excerpt}
              technologies={post.technologies}
              content={''}
              language={post.language}
              className={className}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
