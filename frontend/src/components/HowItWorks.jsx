import { Check } from 'lucide-react'
import React from 'react'

const HowItWorks = () => {
  return (
    <section className="py-20 px-6 bg-accent/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple steps to financial clarity
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting started with Trackify is easy and takes just minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="h-16 w-16 rounded-full bg-cyan-500 text-white flex items-center justify-center text-2xl font-bold">
                1
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Create your account</h3>
            <p className="text-muted-foreground">
              Sign up for a free account in seconds to get started tracking your expenses.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="h-16 w-16 rounded-full bg-cyan-500 text-white flex items-center justify-center text-2xl font-bold">
                2
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Log your purchases</h3>
            <p className="text-muted-foreground">
              Quickly add your expenses as you make them or bulk upload past purchases.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <div className="h-16 w-16 rounded-full bg-cyan-500 text-white flex items-center justify-center text-2xl font-bold">
                3
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-3">Gain financial insights</h3>
            <p className="text-muted-foreground">
              View trends, analyze spending habits, and make informed decisions about your finances.
            </p>
          </div>
        </div>

        <div className="mt-20 bg-card rounded-xl p-8 border border-border/60 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Why people love Trackify</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of users who have transformed their financial habits with our intuitive expense tracking solution.
              </p>
              
              <ul className="space-y-3">
                {[
                  "Beautiful, intuitive interface",
                  "Powerful analytics at your fingertips",
                  "Seamless experience across all devices",
                  "Secure and private data storage",
                  "Regular updates and new features"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 h-6 w-6 rounded-full bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-muted">
              <img 
                src="https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="App interface" 
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks