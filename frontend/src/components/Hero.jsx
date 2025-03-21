import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="py-20 md:py-28 px-6 flex flex-col items-center relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_30%,rgba(56,189,248,0.1),rgba(255,255,255,0))]" />
      
      <div className="absolute w-full h-full -z-10">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl animate-float opacity-60" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent rounded-full filter blur-3xl animate-float opacity-40" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
        <div className="inline-block px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium mb-4 animate-fade-in">
          Effortlessly track your spending
        </div>
       
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance animate-fade-in">
          Track Every Purchase, <br className="hidden sm:inline" /><span className="text-primary">Control Your Spending</span>
        </h1>
       
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
          A beautiful, intuitive expense tracker that helps you understand and manage your finances with clarity and ease.
        </p>
       
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in">
          <Link 
            to="/sign-up" 
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-6 py-3 rounded-md transition-colors flex items-center justify-center"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link 
            to="/login" 
            className="text-gray-800 border border-gray-200 bg-white hover:bg-gray-50 font-medium px-6 py-3 rounded-md transition-colors"
          >
            Log in
          </Link>
        </div>
      </div>
      
      <div className="w-full max-w-5xl mt-16 md:mt-24 relative animate-scale-in">
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent h-24 -bottom-1 z-10"></div>
        <div className="bg-card rounded-xl overflow-hidden shadow-2xl border border-border/40">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Dashboard preview"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero