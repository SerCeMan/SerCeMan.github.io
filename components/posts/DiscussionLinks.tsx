import type {DiscussionLink} from "../../lib/posts";

const platformNames: Record<DiscussionLink['platform'], string> = {
  twitter: "Twitter",
  reddit: "Reddit",
  hackerNews: "Hacker News",
  lobsters: "Lobsters",
};

const DiscussionLinks = ({links}: {links: DiscussionLink[]}) => {
  if (!links.length) {
    return null;
  }

  return (
    <ul>
      {links.map(({platform, url}) => (
        <li key={url}>
          <a href={url}>{platformNames[platform]}</a>
        </li>
      ))}
    </ul>
  );
};

export default DiscussionLinks;
