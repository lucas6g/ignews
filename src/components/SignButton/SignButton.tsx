
import {FaGithub} from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import styles from './SignButton.module.scss' 

import {signIn,useSession,signOut} from 'next-auth/client'

export function SignButton(){

  const [session] = useSession()

  return !session ? (
  <button onClick={()=>{signIn('github')}} className={styles.buttonContainer} type="button">
      <FaGithub color="#eba417" />
      Sign Com Giba
 </button>

  ):(
    <button onClick={()=>{signOut()}} className={styles.buttonContainer} type="button">
      
      <FaGithub color="#04D361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
  </button>

  ) 
 
}