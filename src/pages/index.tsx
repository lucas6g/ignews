
import Head from 'next/head'
import {GetStaticProps} from 'next'

import {stripe} from '../services/stripe'

import styles from './home.module.scss'

import {SubsButton} from '../components/SubsButton/SubsButton'


interface HomeProps { 
  product:{
    priceId:string;
    amount:string;
  }
  
}

export default function Home({product}:HomeProps) {
  
  return (

    <>

      <Head >
        <title>Home | ig.news </title>
      </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>

          <span>👏 Hey Wecome</span>
          <h1>News About <br /> the  <span>React</span> world.</h1>

          <p>
            Get Accest to all Publications <br/>
            <span>for &nbsp;{product.amount} month</span>
          </p>

        <SubsButton  />

        </section>

        <img src="/images/avatar.svg" alt="Girl Conding" />

      </main>



    </>
    )
  }
  //os requests feitos dentro da camada do next
  export const getStaticProps:GetStaticProps = async () =>{
    const response = await stripe.prices.retrieve('price_1JFN8JFbSFOygLWmha20lpSs',{
      expand:['product']
    })

    const product = {
      priceId:response.id,
      amount:new Intl.NumberFormat('en-US',
      {style:'currency',
      currency:'USD'

       }).format(response.unit_amount / 100) 
    }

    return {
      props: {
          product
      },
      revalidate: 60 * 60 * 24 //24 houars
    }
  } 

  
