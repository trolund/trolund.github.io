import { getAllPosts, getAllProjects } from '../lib/api'
import Head from 'next/head'
import One from '../components/big-banner2'
import Menu from '../components/Menu'
import menu from '../constants/menu'
import { BlogPost } from '../types/blogPost'
import { TITLE } from '../lib/constants'
import { useRouter } from 'next/router'
import { SearchResult } from '../search/indexService'

interface IndexProps {
  allPosts: BlogPost[];
  projects: BlogPost[];
}

export default function Index({ allPosts, projects }: IndexProps) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  //const morePosts = allPosts.slice(2)

  const router = useRouter()

  const handelSelect = (res: SearchResult) => {
    router.push("posts/" + res.slug);
  }

  // fetch filters search results for dropdown
  const loadOptions = (value: string): Promise<Response> => {
    return fetch(`/api/search?word=${value}`);
  }

  return (
    <>
      <Menu items={menu} disableScroll spacing />
      {/* <Layout> */}
        <Head>
          <title>{TITLE}</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"></link>
        </Head>
        <One />
        {/* <Intro /> */}
        {/* <Container> */}
        {/* <ColorBox />
        <SpiderWeb /> */}
        {/* <div className="flex mb-4 flex-wrap">
          <div className="lg:w-3/4 order-2 w-full lg:order-1">
            {heroPost && (
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.coverImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            )}
          </div>
          <div className="lg:w-1/4 order-1 w-full lg:order-2 p-10">
            <span style={{float: "right", width: "100%", paddingLeft: "2rem"}}>
              <AsyncSearchBar onSelect={handelSelect} loadOptions={loadOptions} />
            </span>
          </div>
        </div> */}

          
          {/* {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
        {/* </Container> */}
      {/* </Layout> */}
    </>
  )
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags'
  ])

  const projects = getAllProjects([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags',
    'technologies'])

  return {
    props: { allPosts, projects },
  }
}
