import styles from './posts.module.scss'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getPrismicClient } from '../../services/prismic'
import Prismic from '@prismicio/client'
import{RichText} from 'prismic-dom'
import Link from 'next/link'



type Post ={
  slug:string;
  title:string;
  summary:string;
  updatedAt:string;
}

interface PostsProps {
  posts:Post[]
}

export default function Posts({posts}:PostsProps){
 
  return (
    <>
    <Head>
      <title>Posts | ignews</title>
    </Head>
      <main className={styles.container}>
        <div className={styles.posts}>


          {posts.map((post)=>{
            return (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a  >
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
             <p>{post.summary}</p>
            </a>
            </Link>
            
            )
          })}
  
        </div>
      </main>
    </>
  )
}


export const getStaticProps:GetStaticProps = async () =>{


  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.predicates.at('document.type','publication')
  ],
    {
      fetch:['publication.title','publication.content'],
      pageSize:100,

  })

  const posts = response.results.map((post)=>{
    return {
      slug:post.uid,
      title:RichText.asText(post.data.title),
      summary:post.data.content.find((content)=>content.type === 'paragraph')?.text ?? '',
      updatedAt:new Date(post.last_publication_date).toLocaleDateString('pt-BR',{
        day:'2-digit',
        month:'long',
        year:'numeric' 
      })
      
    }
  })

  return {
    props: {
      posts
    },
    
    revalidate : 60 * 60 * 24 //24 hours

  }
}