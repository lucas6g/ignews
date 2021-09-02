import {NextApiRequest,NextApiResponse} from 'next'
import {Readable} from 'stream'
import Stripe from 'stripe';
import { stripe } from '../../services/stripe';
import {saveSubs} from './_lib/manageSubs'


async function buffer(readable: Readable){
  const chunks = [];

  for await (const chunk of readable){
    chunks.push(
      typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    );
  }

  return Buffer.concat(chunks);
}

export const config = {
  api:{
    bodyParser:false
  }
}

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  
])


export default async function (request:NextApiRequest,response:NextApiResponse) {

  if(request.method === 'POST'){
  
  const buf = await buffer(request)


   // secret que vem do stripe 
   const secret = request.headers['stripe-signature']

   let event:Stripe.Event

   try {
     event = stripe.webhooks.constructEvent(buf,secret,process.env.STRIPE_WEBHOOK_SECRET)
   } catch (e) {
     return response.status(400).send(`WebHook error ${e.message}`)
   }

   const {type} = event

   //filtrando os eventos 
   if(relevantEvents.has(type)){
    try {
      
      switch(type){ 
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subs = event.data.object as Stripe.Subscription;
          await saveSubs(subs.id,subs.customer.toString(),false)
          break

        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session
          await saveSubs(checkoutSession.subscription.toString(),checkoutSession.customer.toString(),true)
          break

        default:
          throw new Error('Unhandle event.')
      }
    } catch (e) {
      return response.json({error:'weebhook handler failed'})
    }
     
    
   }


  return response.status(200).json({receved:true})

  }else{
    response.setHeader('Allow','POST')
    response.status(405).end('Method not allowed')
  }
}