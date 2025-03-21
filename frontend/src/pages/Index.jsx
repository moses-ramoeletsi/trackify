import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Footer from '../components/Footer'
import Features from '../components/Features'

const Index = () => {
  return (
    <div className="min-h-screen">
        <Navbar />
          <main>
              <Hero />
              <Features />
              <HowItWorks />
          </main>
        <Footer />
    </div>
  )
}

export default Index