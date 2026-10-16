# SerCe's blog

## Getting Started

Use the Node.js version in `.node-version` and pnpm 12.14.0 (pinned in
`package.json`). Install pnpm with `npm install --global pnpm@12.14.0`.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Run `pnpm lint` and `pnpm type-check` to check the code, and `pnpm build` to create
a production build. The build also generates the sitemap through `postbuild`.

For Cloudflare Pages, set `PNPM_VERSION=12.14.0` in the build environment and
replace any `yarn` commands in the dashboard's build command with `pnpm`.
See [Cloudflare's build image configuration](https://developers.cloudflare.com/pages/configuration/build-image/#override-default-versions).
