import {NextApiRequest,NextApiResponse} from 'next'

//dentro dessa funcao podemos fazer operacao que fariamos no back end
// banco de dados , email

// tudo feito na camada do next 
// essa rota nao vai tar disponivel ao client somente os dados dela 
export default function (request:NextApiRequest,response:NextApiResponse) {

  
  const users = [

    {id:1,name:'lucas'},
    {id:3,name:'jacinto'},
    {id:5,name:'teofalo'}
  ]

  return response.json(users)
}