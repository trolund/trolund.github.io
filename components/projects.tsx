import ProjectItem from './project-item/project-item'

interface ProjectsViewProps {
  posts: any[];
  className?: string;
}

export default function ProjectsView({ posts, className }: ProjectsViewProps) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {posts.map((post) => (
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
    </section>
  )
}
