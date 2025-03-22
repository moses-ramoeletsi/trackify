import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border/60">
      <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        {/* Top section with logo and links */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1 space-y-4">
            <Link to="/" className="text-xl sm:text-2xl font-bold bg-clip-text text-cyan-500 bg-gradient-to-r from-primary to-primary/70">
              Trackify
            </Link>
            <p className="text-sm text-muted-foreground pr-4">
              Track your expenses with clarity and control your spending habits.
            </p>
          </div>
          
          {/* Product links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold mb-3 sm:mb-4">Product</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/features" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold mb-3 sm:mb-4">Company</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/about" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold mb-3 sm:mb-4">Legal</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link to="/privacy" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/60 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Trackify Developed By Ramoeletsi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer