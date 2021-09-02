import {render,screen,fireEvent} from '@testing-library/react'
import { SubsButton } from './SubsButton'
import {signIn, useSession} from 'next-auth/client'


//serve para mockar uma funcao para cada test 
import {mocked} from 'ts-jest/utils'

import { useRouter  } from 'next/router' 


//mockando a funcionalidade de forma global 
jest.mock('next-auth/client')

jest.mock('next/router')



describe('SubsButton Component',()=>{
  test('should renders corrctly',()=>{
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null,false])

      render(
      <SubsButton />
   
     )
     expect(screen.getByText('Subscribe now')).toBeInTheDocument()
   })
  test('should redirect user to sign when not authenticated',()=>{

    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null,false])

    const signInMocked = mocked(signIn)

    signInMocked.mockReturnValueOnce(jest.fn())

      render(
      <SubsButton />
   
     )

    const subsButton = screen.getByText('Subscribe now')

     fireEvent.click(subsButton)


     expect(signInMocked).toHaveBeenCalledWith('github')
   })
  test('should redirect user /posts if already has an active subscription',()=>{

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
      <SubsButton />
   
     )

    const subsButton = screen.getByText('Subscribe now')

     fireEvent.click(subsButton)


     expect(pushMock).toHaveBeenCalledWith('/posts')
   })
   
})

