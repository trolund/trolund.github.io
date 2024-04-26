import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { BlogPost } from '../types/blogPost'

const postsDirectory = join(process.cwd(), '_posts')
const contentDirectory = join(process.cwd(), '_content')

export type BlogFields = (keyof BlogPost)[]

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getContentFile(name: string) {
  const path = join(postsDirectory, `${name}.md`)
  return fs.readdirSync(path)
}

export function getContent(name: string, fields: BlogFields = []) {
  const realSlug = name.replace(/\.md$/, '')
  const fullPath = join(contentDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })
  

  return items as BlogPost
}

export function getPostBySlug(slug, fields: BlogFields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items as BlogPost
}

export function getAllPosts(fields: BlogFields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, [...fields, 'tags', 'isDraft']))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

    // filter out drafts
    if(fields.includes('tags')){
      return posts.filter(i => i.tags.includes("post") && !i.isDraft)
    }
    
  return posts
}

export function getAllProjects(fields: BlogFields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, [...fields, 'tags', 'isDraft']))    
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

    // filter out drafts
    if(fields.includes('tags')){
      return posts.filter(i => i.tags.includes("project") && !i.isDraft)
    }

  return posts
}