import { BlogFields, getPostBySlug, getPostSlugs } from '../lib/api';
import fs from 'fs';
import keyword_extractor from 'keyword-extractor';
import { join } from 'path';

const indexPath = join(process.cwd(), 'index.json');

// key is the slug
export type Index = { [key: string]: { keywords: string[]; name: string } };
export type SearchResult = { slug: string; name: string };

let index: Index;

function getData() {
  const fields: BlogFields = ['title', 'slug', 'excerpt', 'tags', 'content'];

  // get slugs
  const slugs = getPostSlugs();

  // get content of posts
  const posts = slugs.map((slug) => getPostBySlug(slug, fields));
  return posts;
}

function loadIndex() {
  let raw: string = '';
  try {
    raw = fs.readFileSync(indexPath, 'utf8');
  } catch (err) {
    console.log(err);
  }

  return raw.length > 2 ? JSON.parse(raw) : {};
}

export function buildIndex() {
  const postsData = getData();
  const index = loadIndex();

  for (const post of postsData) {
    const key = post.slug;

    // post is already indexed? Continue if post is already indexed.
    if (key in index) {
      continue;
    }

    const data = post.content ?? '' + ' ' + post.title ?? '' + ' ' + post.excerpt ?? '';

    const keywords = keyword_extractor.extract(data, {
      language: post.language === 'da' ? 'danish' : 'english',
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    });

    // write keywords to index. combine tags with keywords from content
    index[key] = { keywords: [...keywords, ...post.tags ?? []], name: post.title };
  }

  writeIndex(index);
}

function writeIndex(data: Index) {
  fs.writeFile(indexPath, JSON.stringify(data), function writeJSON(err) {
    if (err) return console.log(err);
  });
}

export function search(term: string): SearchResult[] {
  // load if index is not in memory.
  if (index === null) {
    loadIndex();
  }

  const results: SearchResult[] = Object.entries(index)
    .filter(([_, value]) => value.keywords.includes(term))
    .map(([key, value]) => ({ slug: key, name: value.name }) as SearchResult);

  return results;
}
