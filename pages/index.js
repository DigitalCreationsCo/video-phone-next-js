import Head from 'next/head'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

import styles from '../styles/Home.module.css'
import avatar from '../public/avatar.jpg'
import { IoMenuSharp } from 'react-icons/io5'
import { IoCloseSharp } from 'react-icons/io5'

export default function Home() {

  const [isMenuOpen, setisMenuOpen] = useState(false)
  const toggleMenu = () => {
    setisMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    if (window.innerWidth >= 600) {
      setisMenuOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize',() => {
      closeMenu()
    })
  }, [])

  return (
    <>
      <Head>
        <title>Videophone</title>
        <meta name="Video Phone" content="Video Phone Service Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
        <div className={styles.container}>

          <div className={styles.chatContainer}>
            Chat Container
          </div>

          <header className={styles.header}>
            <div className={styles.title}>
              <h1><a href="/">Videophone</a></h1>
              { isMenuOpen 
                ? <IoCloseSharp onClick={toggleMenu} className={styles.menuButton} /> 
                : <IoMenuSharp onClick={toggleMenu} className={styles.menuButton} /> 
              }
            </div>
            
            <input className={styles.search}
            placeholder="Find Someone" />
            <div className={styles.avatar}>
              <Image src={avatar} alt="Profile Picture" />
            </div>
          </header>

          <div className={
            isMenuOpen ? 
            [styles.menu + ' ' + styles.menuOpen] 
            : [styles.menu + ' ' + styles.menuClosed]}>
            <div className={styles.backgroundGray}></div>
            
            <button className={styles.button} 
            style={{display: 'flex', alignItems: 'center', alignContent: 'center', alignSelf: 'center', marginTop: 20}}>
              <h3 style={{marginRight: 20}}>My Profile</h3>
              <Image width={100} height={100} src={avatar} alt="User Profile Picture" />
            </button>

            <input className={styles.search}
            placeholder="Search" />

            <button className={styles.button}>Sign Out</button>
          </div>
        
          <footer className={styles.footer}>
            <p>Built By Bryant Mejia using NextJs 2021</p>
          </footer>
        </div>
    </>
  )
}
