import {screen,render,} from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import Posts,{getStaticProps} from '../../pages/posts'
import {getPrismicClient} from '../../services/prismic'

jest.mock('../../services/prismic')


describe('Posts page',()=>{
  test('should render coreclit',()=>{
    render(
      <Posts 
        posts={[{title:'fake-title',slug:'fake-slug',summary:'fake-sumary',updatedAt:'fake-date'}]}
      />
    )

    expect(screen.getByText('fake-title')).toBeInTheDocument()
  })

  test('should load  inicial data',async ()=>{
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      query:jest.fn().mockResolvedValueOnce({
        results:[{
          uid:'my-new-post',
          data:{
            title:[{type:'heading',text:'My new post'}],
            content:[{type:'paragraph',text:'Post sumary'}]
          },
          last_publication_date:'04-01-2021'
        }]
      })
    } as any)

    const response = await getStaticProps({})

    expect(response).toEqual(expect.objectContaining({
      props:{
        posts:[
         { 
          slug:'my-new-post',
          title:'My new post',
          summary:'Post sumary',
          updatedAt:'01 de abril de 2021'
        },

        ]
      }
    }))


  })
 
})