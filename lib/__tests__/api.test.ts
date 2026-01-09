import { describe, expect, test } from '@jest/globals';

import { getAllPosts, getAllProjects } from '../api';

describe('content loader', () => {
  test('returns published blog posts sorted by date', async () => {
    const posts = await getAllPosts(['slug', 'tags', 'isDraft', 'date']);

    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((post) => post.tags?.includes('post'))).toBe(true);
    expect(posts.some((post) => post.isDraft)).toBe(false);

    const timestamps = posts.map((post) => new Date(post.date).getTime());
    const sorted = [...timestamps].sort((a, b) => b - a);

    expect(timestamps).toEqual(sorted);
  });

  test('returns projects sorted by date with the project tag', async () => {
    const projects = await getAllProjects(['slug', 'tags', 'isDraft', 'date']);

    expect(projects.length).toBeGreaterThan(0);
    expect(projects.every((project) => project.tags?.includes('project'))).toBe(true);
    expect(projects.some((project) => project.isDraft)).toBe(false);

    const timestamps = projects.map((project) => new Date(project.date).getTime());
    const sorted = [...timestamps].sort((a, b) => b - a);

    expect(timestamps).toEqual(sorted);
  });
});
