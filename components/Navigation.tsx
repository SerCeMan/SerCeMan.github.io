import Link from 'next/link';
import React, { JSX } from 'react';
import "@fontsource/alegreya"

const Navigation = (): JSX.Element => {
    return (
        <nav className="flex flow-row justify-between items-center w-full text-lg">
            <Link
                href="/"
                className="font-[Alegreya] text-gray-500 pr-6 py-4 float-left w-1/2 text-4xl">
                SerCe&apos;s blog
            </Link>
            <div className="float-right">
              <div className="grid grid-cols-3 gap-12 text-center">
                <Link href="/" className="text-gray-600 py-4">
                    Home
                </Link>
                <Link href="/blog" className="text-gray-600 py-4">
                    Blog
                </Link>
                <Link href="/talks" className="text-gray-600 py-4">
                    Talks
                </Link>
              </div>
            </div>
        </nav>
    );
};

export default Navigation;
