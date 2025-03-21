import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Calendar, Filter, Plus, AlertCircle } from 'lucide-react';

const AnalyticsDashboard = ({ expenses, onAddExpenseClick }) => {
  const [timeRange, setTimeRange] = useState('month');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  
  // Get all unique categories
  const allCategories = [...new Set(expenses.map(expense => expense.category))];
  
  // Filter expenses based on selected filters
  const filterExpenses = () => {
    return expenses.filter(expense => {
      // Filter by time range
      const expenseDate = new Date(expense.date);
      const today = new Date();
      
      if (timeRange === 'week') {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        if (expenseDate < weekStart) return false;
      } else if (timeRange === 'month') {
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        if (expenseDate < monthStart) return false;
      } else if (timeRange === 'quarter') {
        const quarterStart = new Date(today);
        quarterStart.setMonth(Math.floor(today.getMonth() / 3) * 3, 1);
        if (expenseDate < quarterStart) return false;
      } else if (timeRange === 'year') {
        const yearStart = new Date(today.getFullYear(), 0, 1);
        if (expenseDate < yearStart) return false;
      }
      
      // Filter by categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(expense.category)) {
        return false;
      }
      
      // Filter by price range
      if (minPrice && expense.price < parseFloat(minPrice)) return false;
      if (maxPrice && expense.price > parseFloat(maxPrice)) return false;
      
      // Filter by custom date range
      if (dateRange.start && new Date(expense.date) < new Date(dateRange.start)) return false;
      if (dateRange.end && new Date(expense.date) > new Date(dateRange.end)) return false;
      
      return true;
    });
  };
  
  const filteredExpenses = filterExpenses();
  
  const getCategoryData = () => {
    const categoryTotals = filteredExpenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = 0;
      }
      acc[expense.category] += expense.price;
      return acc;
    }, {});
    
    return Object.keys(categoryTotals).map(category => ({
      name: category,
      value: categoryTotals[category]
    }));
  };
  
  const categoryData = getCategoryData();
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];
  
  const totalSpent = filteredExpenses.reduce((sum, expense) => sum + expense.price, 0);
  
  const topCategories = [...categoryData]
    .sort((a, b) => b.value - a.value)
    .slice(0, 3);
    
  // Reset filters
  const handleResetFilters = () => {
    setTimeRange('month');
    setSelectedCategories([]);
    setMinPrice('');
    setMaxPrice('');
    setDateRange({ start: '', end: '' });
  };
  
  // Handle category selection
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  // If there are no expenses at all, show a message
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="mb-4 flex justify-center">
          <AlertCircle size={48} className="text-blue-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">No expenses to analyze</h2>
        <p className="text-gray-600 mb-6">Start tracking your expenses to see analytics and insights.</p>
        <button 
          onClick={onAddExpenseClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center mx-auto"
        >
          <Plus size={18} className="mr-2" />
          Add Your First Expense
        </button>
      </div>
    );
  }
  
  // If there are expenses but none match the current filters
  if (filteredExpenses.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center">
              <Calendar size={18} className="mr-2 text-gray-500" />
              <select 
                className="border-none focus:ring-0 text-sm text-gray-700"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
                <option value="all">All Time</option>
              </select>
            </div>
            
            <button 
              className="flex items-center text-sm text-gray-700 hover:text-blue-500"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} className="mr-1" />
              {showFilters ? 'Hide Filters' : 'More Filters'}
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                  <div className="flex flex-wrap gap-2">
                    {allCategories.map(category => (
                      <button
                        key={category}
                        className={`px-2 py-1 text-xs rounded-full ${
                          selectedCategories.includes(category) 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                        onClick={() => handleCategoryChange(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="border rounded-md px-2 py-1 w-24"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <span>to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="border rounded-md px-2 py-1 w-24"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      className="border rounded-md px-2 py-1"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    />
                    <span>to</span>
                    <input
                      type="date"
                      className="border rounded-md px-2 py-1"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="mb-4 flex justify-center">
            <AlertCircle size={48} className="text-orange-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No matching expenses</h2>
          <p className="text-gray-600 mb-6">Try adjusting your filters to see more data.</p>
          <button 
            onClick={handleResetFilters}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Reset Filters
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center">
            <Calendar size={18} className="mr-2 text-gray-500" />
            <select 
              className="border-none focus:ring-0 text-sm text-gray-700"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
          
          <button 
            className="flex items-center text-sm text-gray-700 hover:text-blue-500"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} className="mr-1" />
            {showFilters ? 'Hide Filters' : 'More Filters'}
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-4 border-t pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categories</label>
                <div className="flex flex-wrap gap-2">
                  {allCategories.map(category => (
                    <button
                      key={category}
                      className={`px-2 py-1 text-xs rounded-full ${
                        selectedCategories.includes(category) 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="border rounded-md px-2 py-1 w-24"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="border rounded-md px-2 py-1 w-24"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="date"
                    className="border rounded-md px-2 py-1"
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                  />
                  <span>to</span>
                  <input
                    type="date"
                    className="border rounded-md px-2 py-1"
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
          <p className="text-2xl font-bold mt-2">${totalSpent.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">
            {timeRange === 'week' ? 'This Week' : 
             timeRange === 'month' ? 'This Month' : 
             timeRange === 'quarter' ? 'This Quarter' : 
             timeRange === 'year' ? 'This Year' : 'All Time'}
            {filteredExpenses.length < expenses.length && ` (Filtered: ${filteredExpenses.length}/${expenses.length})`}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Average Transaction</h3>
          <p className="text-2xl font-bold mt-2">
            ${filteredExpenses.length > 0 ? (totalSpent / filteredExpenses.length).toFixed(2) : '0.00'}
          </p>
          <p className="text-sm text-gray-500 mt-1">{filteredExpenses.length} transactions</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Largest Expense</h3>
          <p className="text-2xl font-bold mt-2">
            ${filteredExpenses.length > 0 ? Math.max(...filteredExpenses.map(e => e.price)).toFixed(2) : '0.00'}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {filteredExpenses.length > 0 
              ? filteredExpenses.sort((a, b) => b.price - a.price)[0]?.category 
              : 'N/A'}
          </p>
        </div>
      </div>
      
      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Spending by Category</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Top Spending Categories */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Top Spending Categories</h2>
        {topCategories.length > 0 ? (
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={index} className="flex items-center">
                <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{category.name}</span>
                    <span className="text-sm font-medium">${category.value.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(category.value / totalSpent) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {((category.value / totalSpent) * 100).toFixed(1)}% of total
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No categories to display</p>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
