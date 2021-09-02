import {NextApiRequest,NextApiResponse} from 'next'
import { stripe } from '../../services/stripe'
import {getSession} from 'next-auth/client'
import { fauna } from '../../services/fauna'
import {query  as q} from 'faunadb'


type User = {
  ref: {
    id: string;
  }
  data: {
    stripe_customer_id: string;
  }
}


//cria o checkout session e retorna a session id
export default async function (request:NextApiRequest,response:NextApiResponse) {

  if(request.method === 'POST'){

    const session = await getSession({req:request})
    
   
   
    //verificando duplicidade 
    const user = await fauna.query<User>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(session.user.email)
        )
      )
    )
    

     let custumerId = user.data.stripe_customer_id

    if(!custumerId){

      const stripeCustumer = await stripe.customers.create({
        email:session.user.email,
      })
      
      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), user.ref.id),
          {
            data: { 
              stripe_customer_id: stripeCustumer.id,
            }
          }
        )
      )

      custumerId = stripeCustumer.id
    }




      const stripeCheckoutSession = await stripe.checkout.sessions.create({
        customer :custumerId,
        payment_method_types:['card'],
        billing_address_collection:'required',
        line_items :[
          {price :'price_1JFN8JFbSFOygLWmha20lpSs',quantity:1}
        ] ,
        mode:'subscription',
        allow_promotion_codes:true,
        success_url:'http://localhost:3000/posts',
        cancel_url: 'http://localhost:3000'
      })

      response.status(200).json({sessionId:stripeCheckoutSession.id})

  }else{
    response.setHeader('Allow','POST')
    response.status(405).end('Method not allowed')
  }

  
}