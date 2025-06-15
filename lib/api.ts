import { promises as fs } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { BlogPost } from '../types/blogPost';

const postsDirectory = join(process.cwd(), '_posts');
const contentDirectory = join(process.cwd(), '_content');

export type BlogFields = (keyof BlogPost)[];

export async function getPostSlugs() {
  return await fs.readdir(postsDirectory);
}

export async function getContentFile(name: string): Promise<string> {
  const filePath = join(postsDirectory, `${name}.md`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  return fileContents;
}

export async function getContent(name: string, fields: BlogFields = []) {
  const realSlug = name.replace(/\.md$/, '');
  const fullPath = join(contentDirectory, `${realSlug}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: { [key: string]: any } = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items as BlogPost;
}

export async function getPostBySlug(slug: string, fields: BlogFields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: { [key: string]: any } = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }
    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items as BlogPost;
}

export async function getAllPosts(fields: BlogFields = []) {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => await getPostBySlug(slug, [...fields, 'tags', 'isDraft'])),
  );

  const sortedPosts = posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  // filter out drafts
  if (fields.includes('tags')) {
    return sortedPosts.filter((i) => i.tags?.includes('post') && !i.isDraft);
  }

  return sortedPosts;
}

export async function getAllProjects(fields: BlogFields = []) {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => await getPostBySlug(slug, [...fields, 'tags', 'isDraft'])),
  );

  const sortedPosts = posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

  // filter out drafts
  if (fields.includes('tags')) {
    return sortedPosts.filter((i) => i.tags?.includes('project') && !i.isDraft);
  }

  return sortedPosts;
}
