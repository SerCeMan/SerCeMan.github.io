// Keep the source for next-mdx-remote while making MDX a watched dependency.
module.exports = function mdxSourceLoader(source) {
    return `export default ${JSON.stringify(source)};`;
};
