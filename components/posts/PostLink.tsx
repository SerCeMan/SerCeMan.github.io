import React, { JSX } from 'react';
import {Post} from "../../lib/posts";
import Link from "next/link";
import {faArrowUpRightFromSquare} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {formatDate} from "../../utils/dates";

const PostLink = ({post, titleFirst = false}: { post: Post, titleFirst?: boolean }): JSX.Element => {
  const date = (
    <h4 className="text-lg py-1">{formatDate(post.date)}</h4>
  );

  return (
    <div>
      {!titleFirst && date}
      {post.kind === "external"
        ? <Link href={post.canonicalLink}>
            <span className="flex flex-row items-center">
            {post.title}
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="h-4 pl-1"/>
            </span>
        </Link>
        : <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
          {post.title}
        </Link>}
      {titleFirst && date}
    </div>
  );
};

export default PostLink;
