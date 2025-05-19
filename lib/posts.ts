import fs from 'fs';
import matter from 'gray-matter';
import {join} from 'path';
import {POSTS_PATH} from '../utils/mdxUtils';
import {WEBSITE_HOST_URL} from "./paths";

export function getPostSlugs(): string[] {
  return fs.readdirSync(POSTS_PATH);
}

export type MdxPost = {
  kind: "mdx";
  title: string;
  date: string;
  content?: string;
  description: string;
  image?: string;
  slug: string;
}

export type ExternalPost = {
  kind: "external";
  date: string;
  title: string;
  description: string;
  image?: string;
  canonicalLink: string,
}

export function getCanonicalURL(post: Post): string {
  const kind = post.kind;
  let url: string;
  if (kind === "mdx") {
    url = `${WEBSITE_HOST_URL}/posts/${post.slug}`;
  } else if (post.kind === "external") {
    url = post.canonicalLink
  } else {
    throw Error("unexpected post kind: " + kind)
  }
  return validateURL(url);
}

export function getCanonicalImageURL(post: Post): string | null {
  const kind = post.kind;
  if (kind === "mdx") {
    if (!post.image) {
      return null
    }
    return validateURL(`${WEBSITE_HOST_URL}${post.image}`);
  } else if (post.kind === "external") {
    return null
  } else {
    throw Error("unexpected post kind: " + kind)
  }
}

function validateURL(url: string) {
  try {
    new URL(url);
  } catch (e) {
    throw Error("Invalid URL: '" + url + "', reason: " + e.message)
  }
  return url;
}

export type Post = MdxPost | ExternalPost

function getMdxPostBySlug(slug: string, includeContent: boolean): MdxPost {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = join(POSTS_PATH, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {data, content} = matter(fileContents);
  return {
    title: data['title'],
    date: data['date'],
    content: includeContent ? content : null,
    description: data['description'],
    image: data['image'],
    slug: realSlug,
    kind: "mdx"
  }
}

function getMdxPosts(includeContent: boolean): MdxPost[] {
  const slugs = getPostSlugs();
  return slugs
    .map((slug) => getMdxPostBySlug(slug, includeContent))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

function getExternalPosts(): ExternalPost[] {
  return [{
    kind: "external",
    title: "Enabling real-time collaboration with RSocket",
    date: "2021-05-27",
    description: "This post describes how we empowered our millions of users at Canva " +
      "to collaborate at scale by introducing services that support bidirectional " +
      "streaming using RSocket.",
    canonicalLink: "https://canvatechblog.com/enabling-real-time-collaboration-with-rsocket-92416fe52650",
  }]
}

export function getAllPosts(includeContent = false): Post[] {
  const mdxPosts = getMdxPosts(includeContent) as Post[];
  const externalPosts = getExternalPosts();
  return mdxPosts.concat(externalPosts)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
