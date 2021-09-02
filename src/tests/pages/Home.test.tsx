import {screen,render,} from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import Home,{getStaticProps} from '../../pages'
import {stripe} from '../../services/stripe'


jest.mock('next/router')
jest.mock('next-auth/client',()=>{
  return {
    useSession(){
      return [null,false]
    }
  }
})

jest.mock('../../services/stripe')


describe('Home page',()=>{
  test('should render coreclit',()=>{
    render(
      <Home 
        product={{priceId:'fake-price-id',amount: '$9.90'}}
      />
    )

    expect(screen.getByText('for $9.90 month')).toBeInTheDocument()
  })
  test('should load  inicial data',async ()=>{
    const stripePricesRetriveMocked = mocked(stripe.prices.retrieve)

    stripePricesRetriveMocked.mockResolvedValueOnce({
      id:'fake-price-id',
      unit_amount:1000
    }as any)


    const response = await  getStaticProps({})

    
    expect(response).toEqual(expect.objectContaining({
      props:{
        product:{
          priceId:'fake-price-id',
          amount:'$10.00'
        }
      }
    }))



  })
})