import NextHead from 'next/head';
import {useRouter} from 'next/router';
import React, { JSX } from 'react';
import {MetaProps} from '../types/layout';
import {WEBSITE_HOST_URL} from "../lib/paths";
import {BLOG_DESCRIPTION, BLOG_TITLE} from "../utils/author";

const Head = ({customMeta}: { customMeta?: MetaProps }): JSX.Element => {
  const router = useRouter();
  const meta: MetaProps = {
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    type: 'website',
    ...customMeta,
  };

  return (
    <NextHead>
      <title>{meta.title}</title>
      <meta content={meta.description} name="description"/>
      <meta property="og:url" content={`${WEBSITE_HOST_URL}${router.asPath}`}/>
      <link rel="canonical" href={`${WEBSITE_HOST_URL}${router.asPath}`}/>
      <link rel="alternate" type="application/rss+xml" title={`${meta.title} RSS Feed`}
            href={`${WEBSITE_HOST_URL}/feed.xml`}/>
      <meta property="og:type" content={meta.type}/>
      <meta property="og:site_name" content={meta.title}/>
      <meta property="og:description" content={meta.description}/>
      <meta property="og:title" content={meta.title}/>
      {meta.image &&
        <meta property="og:image" content={meta.image}/>}
      <meta name="twitter:card" content={meta.image ? "summary_large_image" : "summary"}/>
      <meta name="twitter:site" content="@SerCeMan"/>
      <meta name="twitter:title" content={meta.title}/>
      <meta name="twitter:description" content={meta.description}/>
      {meta.image &&
        <meta name="twitter:image" content={meta.image}/>}
      {meta.date && (
        <meta property="article:published_time" content={meta.date}/>
      )}
    </NextHead>
  );
};

export default Head;
