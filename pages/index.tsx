import {GetStaticProps} from 'next';
import Image from 'next/image';
import React, { JSX } from 'react';
import Layout from '../components/Layout';
import {getAllPosts, Post} from '../lib/posts';
import "@fontsource/alegreya"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faUser} from "@fortawesome/free-solid-svg-icons";
import meJpg from '../public/images/me.jpg'
import PostList from "../components/posts/PostList";
import {AUTHOR_NAME} from "../utils/author";
import {generateRss} from "../lib/generateRss";

type IndexProps = {
  posts: Post[];
};

export const Index = ({posts}: IndexProps): JSX.Element => {
  return (
    <Layout>
      <div
        style={{
          backgroundColor: '#eee'
        }}
        className="py-12 flex justify-center">
        <div
          className="container max-w-6xl grid grid-cols-1 lg:grid-cols-12 items-center gap-4 mx-10">
          <div className="col-span-2">
            <Image
              className="max-h-full min-w-[150px] rounded-full"
              src={meJpg}
              alt="Sergey Tselovalnikov"
              priority
            />
          </div>
          <div className="col-span-7 px-2">
            <p
              className="font-[Alegreya] text-5xl lg:text-6xl sm:text-5xl">{AUTHOR_NAME}</p>
            <p className="text-lg text-gray-800 ">
              Passionate software engineer<br/>
            </p>
          </div>
          <div className="col-span-3 px-2">
            <h4
              className="font-[Alegreya] text-lg font-light pb-3 flex flex-row flex-nowrap items-center">
              <FontAwesomeIcon icon={faEnvelope} className="h-5 pr-4"/>
              Contact Information
            </h4>
            <dl className="text-base">
              <div className="sm:grid sm:grid-cols-2">
                <dt className="font-bold">Email</dt>
                {/* Just a little obfuscation to prevent spam */}
                <dd className="font-normal"><span className="whitespace-nowrap">sergey⟬аt⟭serce.me</span></dd>
              </div>
              <div className="sm:grid sm:grid-cols-2">
                <dt className="font-bold">Github</dt>
                <dd className="font-normal"><a href="https://github.com/SerCeMan">Github</a>
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-2">
                <dt className="font-bold">LinkedIn</dt>
                <dd className="font-normal"><a
                  href="https://linkedin.com/in/serce">serce</a>
                </dd>
              </div>
              <div className="sm:grid sm:grid-cols-2">
                <dt className="font-bold">Twitter</dt>
                <dd className="font-normal"><a
                  href="https://twitter.com/SerCeMan">@SerCeMan</a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <div className="container max-w-5xl	mx-auto px-12 py-6 text-base">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 flex flex-wrap -mx-2">
          <div className="px-2">
            <h3
              className="font-[Alegreya] p-4 text-2xl flex flex-row flex-nowrap items-center ">
              <FontAwesomeIcon icon={faUser} className="h-5 pr-4"/>
              About Me
            </h3>
            <hr/>
            <div className="p-4">
              <p>Hey, folks! I&apos;m a:</p>
              <ul className="list-disc text-m font-normal pl-6 pb-4">
                <li>Software engineer at <a href="https://canva.com/about/">Canva</a></li>
                <li>Big fan of the JVM</li>
                <li>Functional programming enthusiast</li>
                <li>Survivor of many debugging sessions of Java, Kotlin, Clojure, TypeScript, and even ClojureScript</li>
                <li>Technology internals diver</li>
                <li>An occasional conference speaker and a former lead of <a href="https://jugekb.ru">JUG.EKB</a></li>
                <li>Engineer in a love-hate relationship with the nuances of concurrency and performance.</li>
                <li>Powerlifting and mountain biking enthusiast</li>
              </ul>
              <p>
                I believe that it is vital to understand the whole stack of technologies you use from
                top to bottom.
              </p>
              <p>
                Here is my personal blog where I share my thoughts and experiences with different
                technologies.
              </p>
            </div>
          </div>
          <div className="px-4">
            <div>
              <div className="p-4">
                <h3 className="font-[Alegreya] text-2xl">Recent Posts</h3>
              </div>
              <hr/>
              <PostList
                listClass="pl-10"
                posts={posts}
                limit={7}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // The below is an hack that I borrowed and I don't like at all. What happens
  // is that every time getStaticProps is called, public/feed.xml is emitted.
  // Instead, I should find a way to do it build-time. However, given that it
  // takes less than 10ms, I might only do it when I migrate away from nextjs.
  await generateRss();

  const posts = getAllPosts();

  return {
    props: {posts},
  };
};

export default Index;
