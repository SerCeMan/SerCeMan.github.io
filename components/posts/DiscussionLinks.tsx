import type {DiscussionLink} from "../../lib/posts";
import Image from "next/image";

const platformNames: Record<DiscussionLink['platform'], string> = {
  twitter: "Twitter",
  reddit: "Reddit",
  hackerNews: "Hacker News",
  lobsters: "Lobsters",
};

const platformOrder: Record<DiscussionLink['platform'], number> = {
  hackerNews: 0,
  lobsters: 1,
  reddit: 2,
  twitter: 3,
};

// Brand logos from Simple Icons v16 (CC0):
// https://github.com/simple-icons/simple-icons/tree/16.0.0/icons
const platformIcons: Record<DiscussionLink['platform'], string> = {
  twitter: "x",
  reddit: "reddit",
  hackerNews: "hacker-news",
  lobsters: "lobsters",
};

type DiscussionLinksProps = {
  links: DiscussionLink[];
  compact?: boolean;
  postTitle?: string;
};

const DiscussionLinks = ({links, compact = false, postTitle}: DiscussionLinksProps) => {
  if (!links.length) {
    return null;
  }

  const displayedLinks = compact
    ? [...links].sort((left, right) => platformOrder[left.platform] - platformOrder[right.platform])
    : links;

  return (
    <ul
      className={compact ? "mt-1 flex list-none flex-wrap" : undefined}
      aria-label={compact ? "Article discussions" : undefined}>
      {displayedLinks.map(({platform, url}) => (
        <li key={url}>
          <a
            href={url}
            aria-label={compact
              ? `Discuss ${postTitle ? `“${postTitle}”` : "this article"} on ${platformNames[platform]}`
              : undefined}
            title={compact ? `Discuss on ${platformNames[platform]}` : undefined}
            className={compact
              ? "inline-flex h-8 w-6 items-center justify-start rounded opacity-80 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
              : undefined}>
            {compact ? (
              <Image
                src={`/images/discussions/${platformIcons[platform]}.svg`}
                alt=""
                width={16}
                height={16}
                className="shrink-0"
              />
            ) : platformNames[platform]}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default DiscussionLinks;
