import {render,screen} from '@testing-library/react'
import { SignButton } from './SignButton'
import {useSession} from 'next-auth/client'

//serve para mockar uma funcao para cada test 
import {mocked} from 'ts-jest/utils'





jest.mock('next-auth/client')


describe('SignButton Component',()=>{
  test('should renders corrctly when user is not authenticated',()=>{

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null,false])

      render(
      <SignButton />
   
     )
     expect(screen.getByText('Sign Com Giba')).toBeInTheDocument()
   })
  test('should renders corrctly when user is authenticated',()=>{

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([{user:{name:'anyName',email:'anyEmail@mail.com',image:'anyImage.svg' },expires:'any-expires'},false])

      render(
      <SignButton />
   
     )
     expect(screen.getByText('anyName')).toBeInTheDocument()
   })
   
   
})

