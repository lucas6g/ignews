import { fauna } from "../../../services/fauna";
import {query as q} from 'faunadb'
import { stripe } from "../../../services/stripe";



//salva os dados da subscription no banco
export async function saveSubs(subsId:string,customerId:string,createAction= true) {
  

  const userRef = await fauna.query(
   q.Select(
    "ref",
     q.Get(
      q.Match(
        q.Index(
          'user_by_stripe_customer_id'
          ),
          customerId
      )
    )
   )
  )


  //busca do stripe os dados da inscricao 
  const subs = await stripe.subscriptions.retrieve(subsId)
  
  const subsData = {
    id:subs.id,
    user_id:userRef,
    status:subs.status,
    price_id:subs.items.data[0].price.id,
    
    
  }

  if(createAction){

    await fauna.query(
      q.Create(
        q.Collection('subscriptions'),
        {data:subsData}
      )
    )
    }else{
     
      await fauna.query(
        q.Replace(
          q.Select(
            "ref",
             q.Get(
              q.Match(
                q.Index(
                  'subscription_by_id'
                  ),
                  subsId
              )
            )
           ),
           {data:subsData}
        )
      )
    }
  
} 