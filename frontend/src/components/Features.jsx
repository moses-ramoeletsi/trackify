import { Calendar, ChartPieIcon, CreditCard, Download, LineChart, Search } from 'lucide-react';
import React from 'react';


function Feature({ icon, title, description }) {
  return (
    <div className="flex flex-col p-6 bg-card rounded-xl border border-border/60 transition-all hover:shadow-md hover:-translate-y-1 duration-300">
      <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-500 mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

const Features = () => {
  return (
    <section className="py-20 px-6" id="features">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to manage expenses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive suite of tools designed to give you complete control over your spending habits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Feature
            icon={<CreditCard className="h-6 w-6" />}
            title="Easy Purchase Logging"
            description="Quickly log your purchases with a simple form. Add details like category, store, and even upload receipts."
          />
          <Feature
            icon={<ChartPieIcon className="h-6 w-6" />}
            title="Spending Analytics"
            description="Visualize your spending patterns with beautiful charts and graphs that help you understand where your money goes."
          />
          <Feature
            icon={<Search className="h-6 w-6" />}
            title="Powerful Search"
            description="Find any purchase instantly with our advanced search and filtering system. Filter by date, category, price, and more."
          />
          <Feature
            icon={<Download className="h-6 w-6" />}
            title="Data Export"
            description="Export your spending data in multiple formats for external analysis or record-keeping."
          />
          <Feature
            icon={<LineChart className="h-6 w-6" />}
            title="Spending Trends"
            description="Track how your spending changes over time and identify areas where you can save money."
          />
          <Feature
            icon={<Calendar className="h-6 w-6" />}
            title="Purchase History"
            description="Access your complete purchase history with detailed information for each transaction."
          />
        </div>
      </div>
    </section>
  );
}

export default Features;