import {Client} from 'faunadb'

//operacoes usando essa api nao podem 
//ser utilizadas pelo cliente apenas na camada next
export const fauna = new Client({
  secret:process.env.FAUNADB_SECRET_KEY
})