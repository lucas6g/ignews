
import {render,screen} from  '@testing-library/react'
import { Async } from './Async'



describe('Async component',()=>{
  test('should renders correcleti',async()=>{
    render(<Async />)


    //metodo find busca o elemento de forma assyncrona
    expect(await screen.findByText('Clique')).toBeInTheDocument()
  })

})