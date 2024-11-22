import React from 'react'
import Nav from './nav/Nav'
import Header from './header/Header'

const HomePage = () => {
  return (
    <>
    <Nav />
    <div className='w-full m-auto max-w-screen-xl px-4 sm:px-6'>
        <Header />

    </div>
    </>
  )
}

export default HomePage