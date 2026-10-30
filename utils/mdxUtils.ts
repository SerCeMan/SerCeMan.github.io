import fs from 'fs';
import path from 'path';

const POSTS_PATH = path.join(process.cwd(), 'posts');

export function getPostFilePaths(): string[] {
  return fs.readdirSync(POSTS_PATH).filter((filePath) => /\.mdx$/.test(filePath));
}

export function getPostSource(slug: string): string {
  const realSlug = slug.replace(/\.mdx$/, '');
  // An import lets Next.js track edits and refresh pages using this content.
  return require(`../posts/${realSlug}.mdx`).default;
}
