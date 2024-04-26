import Container from "../components/container"
import Layout from "../components/layout"
import Head from "next/head"
import { TITLE } from "../lib/constants"
import Menu from "../components/Menu"
import menu from "../constants/menu"
import PostTitle from "../components/post-title"
import { SearchResult } from "../search/indexService"
import AsyncSearchBar from "../components/AsyncSearchBar"
import { useRouter } from "next/router"

export default function Index() {
  const router = useRouter()

  const handelSelect = (res: SearchResult) => {
    router.push("posts/" + res.slug)
  }

  // fetch filters search results for dropdown
  const loadOptions = (value: string): Promise<Response> => {
    return fetch(`/api/search?word=${value}`)
  }

  return (
    <>
      <Menu items={menu} disableScroll spacing />
      <Layout>
        <Head>
          <title>{TITLE}</title>
        </Head>
        <Container>
          <PostTitle>Search</PostTitle>
          <AsyncSearchBar onSelect={handelSelect} loadOptions={loadOptions} />
        </Container>
      </Layout>
    </>
  );
}
