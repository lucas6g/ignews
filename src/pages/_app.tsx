import {AppProps} from 'next/app'
import Head from 'next/head'

//contexto de authenticacao do next 
import {Provider as NextAuthProvider} from 'next-auth/client'


import {Header} from '../components/Header/Header'

import '../styles/global.scss'
function MyApp({ Component, pageProps }:AppProps) {

  return(
    <NextAuthProvider  session={pageProps.session}>

     {/*definir aqui o head comum para todo app */}
      <Head>
         <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ignews</title>
      </Head>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>


  )
}

export default MyApp
