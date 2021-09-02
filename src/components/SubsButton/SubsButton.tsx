
import { signIn, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripeFront'
import styles from './SubsButton.module.scss'




export  function SubsButton(){

  const [session] = useSession()

  const router = useRouter()

  async function hadleSubs(){
    if(!session){
    signIn('github')
      return 
    }
  
    if(session.activeSubs){
      router.push('/posts')
      return
    }
  
    try {
      const response = await api.post('/subs')

      const {sessionId} = response.data

      const stripe = await getStripeJs()
      await stripe.redirectToCheckout({sessionId})
    } catch (error) {
      alert(error.message)
    }
  }


  return (
    <button onClick={hadleSubs}  className={styles.subsButton} type="button" >
      Subscribe now
    </button>
  )
 }