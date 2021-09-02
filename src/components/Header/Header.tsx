import { SignButton } from '../SignButton/SignButton'
import styles from './Header.module.scss'
import { ActiveLink } from '../ActiveLink/ActiveLink'


export function Header(){

  
  
  return (

   <header className={styles.headerContainer} >

      <div className={styles.headerContent} >
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a  >Home</a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts" >
            <a >Posts</a>
          </ActiveLink>
        </nav>

   
        <SignButton />
      </div>
      

    </header>
  )
}