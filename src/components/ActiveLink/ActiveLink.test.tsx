import {render,screen} from '@testing-library/react'
import { ActiveLink } from './ActiveLink'


//teste de unidade para ver se o componente renderiza 


//mockando hook do next 
jest.mock('next/router',()=>{
  return {
    useRouter(){
      return {
        asPath: '/'
      }
    }
  }
})


describe('ActiveLink Component',()=>{
  test('should active link renders corrctly',()=>{

      render(
       <ActiveLink href="/" activeClassName="active">
         <a >Home</a>
       </ActiveLink>
   
     )
   
     expect(screen.getByText('Home')).toBeInTheDocument()
     
   
    
   })
   
   test('should active link reciving className active',()=>{
   
    render(
       <ActiveLink href="/" activeClassName="active">
         <a >Home</a>
       </ActiveLink>
   
     )
   
     expect(screen.getByText('Home')).toHaveClass('active')
     
   
    
   })
})

