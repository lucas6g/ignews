import {render,screen} from '@testing-library/react'
import { Header } from './Header'


//teste de unidade para ver se o componente renderiza 


//mockando por que o active link presiza desse mock
jest.mock('next/router',()=>{
  return {
    useRouter(){
      return {
        asPath: '/'
      }
    }
  }
})

jest.mock('next-auth/client',()=>{
  return {
    useSession(){
      return [null,false]
    }
  }
})


describe('Header Component',()=>{
  test('should header renders corrctly',()=>{

      render(
      <Header />
   
     )
  
     expect(screen.getByText('Home')).toBeInTheDocument()
     expect(screen.getByText('Posts')).toBeInTheDocument()
     
   
   })
   
   
})

