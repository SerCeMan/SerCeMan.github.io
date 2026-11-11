module.exports = {
    siteUrl: 'https://serce.me',
    outDir: 'out',
    generateRobotsTxt: false,
    generateIndexSitemap: false,
    transform: async (config, path) => {
        return {
            loc: path,
        }
    },
}
