import {screen,render,} from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { mocked } from 'ts-jest/utils'
import PostPreview,{getStaticProps} from '../../pages/posts/preview/[slug]'
import {getPrismicClient} from '../../services/prismic'




jest.mock('next/router')
jest.mock('next-auth/client')
jest.mock('../../services/prismic')


describe('PostPreview page',()=>{
  test('should render coreclit',()=>{

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null,false])


    render(
    <PostPreview
       post={{title:'fake-post-title',content:'fake-post-content',slug:'fake-post-slug',updatedAt:'fake-date'}} />
    )

    expect(screen.getByText('fake-post-title')).toBeInTheDocument()
    expect(screen.getByText('Wanna Continue reading ?')).toBeInTheDocument()

  })


  test('should redirects user if user has an active subscription',async ()=>{

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([
      {user:{
        name:'anyName',
        email:'anyEmail@mail.com',
        image:'anyImage.svg' },
        expires:'any-expires',
        activeSubs:true},
        false
    ])

    
    const useRouterMocked = mocked(useRouter)

    const pushMock = jest.fn()

    useRouterMocked.mockReturnValueOnce({
      push:pushMock
    }as any)
    
    render(
      <PostPreview
         post={{title:'fake-post-title',content:'fake-post-content',slug:'fake-post-slug',updatedAt:'fake-date'}} />
      )

    
    expect(pushMock).toHaveBeenCalledWith('/posts/fake-post-slug')
  })
  test('should loads inicial data',async ()=>{

  
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

    
    const response = await getStaticProps({
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