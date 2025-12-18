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
import Layout from '../../components/Layout';
import {MetaProps} from '../../types/layout';
import {POSTS_PATH, postUrlPaths} from '../../utils/mdxUtils';
import React, { JSX } from "react";
import "@fontsource/noto-serif";
import rehypeHighlight from "rehype-highlight";
import clojure from 'highlight.js/lib/languages/clojure'
import x86asm from 'highlight.js/lib/languages/x86asm'
import java from 'highlight.js/lib/languages/java'
import cpp from 'highlight.js/lib/languages/cpp'
import c from 'highlight.js/lib/languages/c'
import kotlin from 'highlight.js/lib/languages/kotlin'
import bash from 'highlight.js/lib/languages/bash'
import "highlight.js/styles/idea.css"
import TweetEmbed from "../../components/TweetEmbed";
import TimeQuizChooser from "../../components/matteroftime/TimeQuizChooser";
import CheckResults from "../../components/matteroftime/CheckResults";
import CanvaEmbed from "../../components/CanvaEmbed";
import Quote from "../../components/Quote";
import {Post} from "../../lib/posts";
import {WEBSITE_HOST_URL} from "../../lib/paths";
import {SubscribeForm} from "../../components/subscriptions/SubscribeForm";
import {AUTHOR_NAME} from "../../utils/author";
import ImageWithCaption from "../../components/ImgWithCaption";
import {CapitalLetter} from "../../components/alphabet/CapitalLetter";


// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {
  Head,
  Image,
  ImageWithCaption,
  Link,
  TweetEmbed,
  Quote,
  // the matter of time only
  CanvaEmbed,
  CheckResults,
  TimeQuizChooser,
  // alphabet only
  CapitalLetter,
};

type PostPageProps = {
  source: MDXRemoteSerializeResult;
  frontMatter: Post;
};

const PostPage = ({source, frontMatter}: PostPageProps): JSX.Element => {
  const customMeta: MetaProps = {
    title: `${frontMatter.title}`,
    description: frontMatter.description,
    image: `${WEBSITE_HOST_URL}${frontMatter.image}`,
    date: frontMatter.date,
    type: 'article',
  };
  return (
    <Layout customMeta={customMeta}>
      <article
        className="container mx-auto mt-12 px-10 py-8 shadow-md bg-white max-w-5xl flex flex-col">
        <p className="self-start text-sm text-gray-500">
          By {AUTHOR_NAME} on {format(parseISO(frontMatter.date), 'dd MMMM yyyy')}
        </p>
        <div
          className="asciiprose">
          <h1 className="text-gray-900">
            {frontMatter.title}
          </h1>
          <MDXRemote {...source} components={components}/>
          <SubscribeForm/>
        </div>
      </article>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const {content, data} = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        [rehypeHighlight, {
          languages: {
            java,
            cpp,
            c,
            clojure,
            x86asm,
            kotlin,
            bash,
          },
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
  const paths = postUrlPaths
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({params: {slug}}));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
