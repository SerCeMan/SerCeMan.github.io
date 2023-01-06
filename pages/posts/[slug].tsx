import {format, parseISO} from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import {GetStaticPaths, GetStaticProps} from 'next';
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import path from 'path';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import Layout, {WEBSITE_HOST_URL} from '../../components/Layout';
import {MetaProps} from '../../types/layout';
import {PostType} from '../../types/post';
import {postFilePaths, POSTS_PATH} from '../../utils/mdxUtils';
import React from "react";
import "@fontsource/noto-serif";
import rehypeHighlight from "rehype-highlight";
import clojure from 'highlight.js/lib/languages/clojure'
import x86asm from 'highlight.js/lib/languages/x86asm'
import TweetEmbed from "../../components/TweetEmbed";
import TimeQuizChooser from "../../components/matteroftime/TimeQuizChooser";
import CheckResults from "../../components/matteroftime/CheckResults";
import CanvaEmbed from "../../components/CanvaEmbed";
import Quote from "../../components/Quote";


// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Head,
  Image,
  Link,
  TweetEmbed,
  Quote,
  // the matter of time only
  CanvaEmbed,
  CheckResults,
  TimeQuizChooser,
};

type PostPageProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: PostType;
};

const PostPage = ({source, frontMatter}: PostPageProps): JSX.Element => {
  const customMeta: MetaProps = {
    title: `${frontMatter.title} - Hunter Chang`,
    description: frontMatter.description,
    image: `${WEBSITE_HOST_URL}${frontMatter.image}`,
    date: frontMatter.date,
    type: 'article',
  };
  return (
    <Layout customMeta={customMeta}>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.4.0/styles/default.min.css"/>
      <article
        className="container mx-auto mt-12 px-10 py-8 shadow-md bg-white max-w-5xl flex flex-col">
        <p className="self-start text-sm text-gray-500">
          {format(parseISO(frontMatter.date), 'dd MMMM yyyy')}
        </p>
        <div
          className="asciiprose">
          <h1 className="text-gray-900">
            {frontMatter.title}
          </h1>
          <MDXRemote {...source} components={components}/>
        </div>
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        [rehypeHighlight, {
          languages: {
            clojure,
            // man,
            x86asm,
          }
        }],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
            },
          },
        ],
      ],
      format: 'mdx',
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({params: {slug}}));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;