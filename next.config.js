/** @type {import('next').NextConfig} */
module.exports = {
    async redirects() {
        return [
            {
                source: '/posts/01-02-2023-jvm-field-guide-memory',
                destination: '/posts/2023-02-01-jvm-field-guide-memory',
                permanent: true,
            },
            {
                source: '/posts/01-06-2016-wild-panama',
                destination: '/posts/2016-06-01-wild-panama',
                permanent: true,
            },
            {
                source: '/posts/02-10-2023-hey-computer-make-me-a-font',
                destination: '/posts/2023-10-02-hey-computer-make-me-a-font',
                permanent: true,
            },
            {
                source: '/posts/14-10-2021-the-five-lies-analysis',
                destination: '/posts/2021-10-14-the-five-lies-analysis',
                permanent: true,
            },
            {
                source: '/posts/16-05-2019-the-matter-of-time',
                destination: '/posts/2019-05-16-the-matter-of-time',
                permanent: true,
            },
            {
                source: '/posts/18-11-2020-allocate-direct',
                destination: '/posts/2020-11-18-allocate-direct',
                permanent: true,
            },
            {
                source: '/posts/21-03-2023-write-predictable-software-not-ergonomic',
                destination: '/posts/2023-03-21-write-predictable-software-not-ergonomic',
                permanent: true,
            },
            {
                source: '/posts/22-06-2015-jnr-fuse',
                destination: '/posts/2015-06-22-jnr-fuse',
                permanent: true,
            },
            {
                source: '/posts/23-07-2020-you-dont-need-no-service-mesh',
                destination: '/posts/2020-07-23-you-dont-need-no-service-mesh',
                permanent: true,
            },
            {
                source: '/posts/23-12-2024-abc-learning-the-alphabet-with-java-annotations',
                destination: '/posts/2024-12-23-abc-learning-the-alphabet-with-java-annotations',
                permanent: true,
            },
            {
                source: '/posts/26-04-2023-platform-engineering-in-the-era-of-llms',
                destination: '/posts/2023-04-26-platform-engineering-in-the-era-of-llms',
                permanent: true,
            },
            {
                source: '/posts/29-06-2017-fantastic-dsls',
                destination: '/posts/2017-06-29-fantastic-dsls',
                permanent: true,
            },
            {
                source: '/posts/2025-31-03-there-is-no-vibe-engineering',
                destination: '/posts/2025-03-31-there-is-no-vibe-engineering',
                permanent: true,
            },
        ];
    },
    images: {
        unoptimized: true,
    },
};
