import {screen,render,} from '@testing-library/react'
import { getSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'
import Post,{getServerSideProps} from '../../pages/posts/[slug]'
import {getPrismicClient} from '../../services/prismic'




jest.mock('next/router')
jest.mock('next-auth/client')
jest.mock('../../services/prismic')


describe('Post page',()=>{
  test('should render coreclit',()=>{


    render(
    <Post
       post={{title:'fake-post-title',content:'fake-post-content',slug:'fake-post-slug',updatedAt:'fake-date'}} />
    )

    expect(screen.getByText('fake-post-title')).toBeInTheDocument()
  })


  test('should redirects user if no subscription is found',async ()=>{

    const getSessionMocked = mocked(getSession)


    getSessionMocked.mockResolvedValueOnce({
      activeSubs:null
    })
    
    const response = await getServerSideProps({
      req:{
        cookies:{}
      },
      params:{
        slug:'fake-post-slug'
      }
      
    }as any)

    
    expect(response).toEqual(expect.objectContaining({
      redirect:{
        destination:'/posts/preview/fake-post-slug',
        permanent:false
      }
    }))
  })
  test('should loads inicial data',async ()=>{

    const getSessionMocked = mocked(getSession)

    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID:jest.fn().mockResolvedValueOnce({
          data:{
            title:[{type:'heading',text:'My new post'}],
            content:[{type:'paragraph',text:'Post content'}]
          },
          last_publication_date:'04-01-2021'
      })
    } as any)



    getSessionMocked.mockResolvedValueOnce({
      activeSubs:true
    })

    
    const response = await getServerSideProps({
      params:{
        slug:'fake-post-slug'
      }
      
    }as any)

    
    expect(response).toEqual(expect.objectContaining({
      props:{
        post:{
          slug:'fake-post-slug',
          title:'My new post',
          content:'<p>Post content</p>',
          updatedAt:'01 de abril de 2021'
        }
      }
    }))
  })

})