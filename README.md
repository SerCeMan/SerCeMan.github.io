# SerCe's blog

## Getting Started

Use the Node.js version in `.node-version` and pnpm 12.14.0 (pinned in
`package.json`). Install pnpm with `npm install --global pnpm@12.14.0`.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Saving a `.mdx` file in `posts/` automatically refreshes the article and post lists
in the browser while the development server is running.

Run `pnpm lint` and `pnpm type-check` to check the code. `pnpm build` exports the
site, RSS feed, and sitemap to `out/`. Run `pnpm start` to preview that export
locally with Cloudflare Pages routing and redirects.

## Cloudflare Pages

In the `serceman-github-io` project's build settings, use `develop` as the
production branch, `pnpm build` as the build command, and `out` as the output
directory. Set `PNPM_VERSION=12.14.0` in the build environment. Pages serves the
files directly and applies the legacy post redirects from `public/_redirects`.
