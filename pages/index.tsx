import { getAllPosts, getAllProjects } from "../lib/api";
import Head from "next/head";
import One from "../components/front-banner";
import NavBar from "../components/nav-bar";
import menu from "../constants/menu";
import { TITLE } from "../lib/constants";

export default function Index() {
  return (
    <>
      <NavBar items={menu} disableScroll spacing />
      <Head>
        <title>{TITLE}</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
        ></link>
      </Head>
      <One />
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "tags",
  ]);

  const projects = getAllProjects([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "tags",
    "technologies",
  ]);

  return {
    props: { allPosts, projects },
  };
}
