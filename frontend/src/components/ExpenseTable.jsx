import { Edit, Trash2 } from 'lucide-react';
import React from 'react';

const ExpenseTable = ({ expenses, onEditExpense, onDeleteExpense }) => {
  return (
    <div className='bg-white rounded-lg shadow overflow-hidden'>
      <div className='p-6'>
        <h2 className='text-xl font-bold text-gray-800'>Recent Expenses</h2>
        <p className='text-gray-600 mt-1'>View and manage your recent expenses</p>
      </div>
      <div className="overflow-x-auto">
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='text-left bg-gray-50'>
            <tr>
              <th scope='col' className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Date</th>
              <th scope='col' className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Product</th>
              <th scope='col' className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Category</th>
              <th scope='col' className='p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Vendor</th>
              <th scope='col' className='p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>Price</th>
              <th scope='col' className='p-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {expenses.map((expense) => (
              <tr key={expense.id} className='hover:bg-gray-50'>
                <td className='p-3 whitespace-nowrap text-sm trackify-blue'>{expense.date}</td>
                <td className='p-3 whitespace-nowrap text-sm font-medium text-gray-900'>{expense.product}</td>
                <td className='p-3 whitespace-nowrap text-sm trackify-blue uppercase'>{expense.category}</td>
                <td className='p-3 whitespace-nowrap text-sm text-gray-900'>{expense.vendor}</td>
                <td className='p-3 whitespace-nowrap text-sm trackify-blue text-right'>M{expense.price.toFixed(2)}</td>
                <td className='p-3 whitespace-nowrap text-sm font-medium text-right'>
                  <div className='flex justify-end space-x-2'>
                    <button
                      className='text-gray-600 hover:text-gray-900'
                      onClick={() => onEditExpense && onEditExpense(expense)}
                      aria-label={`Edit ${expense.product}`}
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className='text-gray-600 hover:text-red-600'
                      onClick={() => onDeleteExpense && onDeleteExpense(expense.id)}
                      aria-label={`Delete ${expense.product}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {expenses.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No expenses found. Add some expenses to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;