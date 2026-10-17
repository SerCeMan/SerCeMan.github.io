import React from 'react';
import PostLink from "./PostLink";
import {Post} from "../../lib/posts";
import Link from "next/link";
import { JSX } from 'react/jsx-runtime';
import DiscussionLinks from "./DiscussionLinks";

type PostListProps = {
  posts: Post[];
  listClass: string;
  limit?: number;
  showDiscussions?: boolean;
  titleFirst?: boolean;
};

const PostList = ({posts, listClass, limit, showDiscussions = false, titleFirst = false}: PostListProps): JSX.Element => {
  const isLimited = posts.length > limit;
  return (
    <div className={listClass}>
      <ul className="list-disc">
        {posts
          .slice(0, limit || posts.length)
          .map((post) => (
            <li key={post.title} className={showDiscussions ? "mb-5 last:mb-0" : undefined}>
              <PostLink
                post={post}
                titleFirst={titleFirst}/>
              {showDiscussions && (
                <DiscussionLinks links={post.discussionLinks} compact postTitle={post.title}/>
              )}
            </li>
          ))}
      </ul>
      {isLimited
        ? <Link className="text-gray-600 inline-block	pt-2" as={`/blog`} href={`/blog`}>More posts ...</Link>
        : <div/>
      }
    </div>
  );
};

export default PostList;
