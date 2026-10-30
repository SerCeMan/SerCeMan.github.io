import {format, parseISO} from 'date-fns';
import matter from 'gray-matter';
import {GetStaticPaths, GetStaticProps} from 'next';
import {MDXRemote, MDXRemoteSerializeResult} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import Layout from '../../components/Layout';
import {MetaProps} from '../../types/layout';
import {getPostFilePaths, getPostSource} from '../../utils/mdxUtils';
import React, { JSX } from "react";
import rehypeHighlight from "rehype-highlight";
import clojure from 'highlight.js/lib/languages/clojure'
import x86asm from 'highlight.js/lib/languages/x86asm'
import java from 'highlight.js/lib/languages/java'
import cpp from 'highlight.js/lib/languages/cpp'
import c from 'highlight.js/lib/languages/c'
import kotlin from 'highlight.js/lib/languages/kotlin'
import bash from 'highlight.js/lib/languages/bash'
import python from 'highlight.js/lib/languages/python'
import javascript from 'highlight.js/lib/languages/javascript'
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
import DiscussionLinks from "../../components/posts/DiscussionLinks";
import WhitespaceHash from "../../components/whitespace/WhitespaceHash";


// MDX is compiled by next-mdx-remote, so components used by articles must be
// provided here.
const components = {
  Head,
  Image,
  ImageWithCaption,
  Link,
  TweetEmbed,
  Quote,
  DiscussionLinks,
  WhitespaceHash,
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
    image: frontMatter.image ? `${WEBSITE_HOST_URL}${frontMatter.image}` : undefined,
    date: frontMatter.date,
    type: 'article',
  };
  return (
    <Layout customMeta={customMeta}>
      <article
        className="container mx-auto mt-12 px-5 sm:px-10 py-8 shadow-md bg-white max-w-5xl flex flex-col">
        <p className="self-start text-lg text-gray-500">
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
  const source = getPostSource(params.slug as string);

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
            python,
            javascript,
          },
        }],
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ['anchor'],
              ariaLabel: 'Link to this section',
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
  const paths = getPostFilePaths()
    .map((filePath) => filePath.replace(/\.mdx$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({params: {slug}}));

  return {
    paths,
    fallback: false,
  };
};

export default PostPage;
