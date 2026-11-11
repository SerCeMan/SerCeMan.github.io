/** @type {import('next').NextConfig} */
module.exports = {
    output: 'export',
    turbopack: {
        rules: {
            '*.mdx': {
                loaders: ['./loaders/mdx-source-loader.js'],
                as: '*.js',
            },
        },
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.mdx$/,
            use: [require.resolve('./loaders/mdx-source-loader.js')],
        });
        return config;
    },
    images: {
        unoptimized: true,
    },
};
