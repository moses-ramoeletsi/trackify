import { Building, Calendar, DollarSign, ShoppingBag, Tag } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const AddExpenseForm = ({ onAddExpense, onUpdateExpense, editingExpense }) => {
    const initialFormState = {
        date: new Date().toISOString().split('T')[0],
        product: '',
        category: '',
        vendor: '',
        price: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (editingExpense) {
            setFormData({
                ...editingExpense,
                price: editingExpense.price.toString() // Convert to string for input field
            });
        }
    }, [editingExpense]);

    const categories = [
        'Groceries', 'Transportation', 'Utilities', 'HealthCare', 'Others'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingExpense) {
            const updatedExpense = {
                ...formData,
                price: parseFloat(formData.price)
            };
            onUpdateExpense(updatedExpense);
        } else {
            const newExpense = {
                ...formData,
                id: Date.now(),
                price: parseFloat(formData.price)
            };
            onAddExpense(newExpense);
        }

        setFormData(initialFormState);
    };

    const resetForm = () => {
        setFormData(initialFormState);
    };

    return (
        <div className='bg-white rounded-lg shadow p-6'>
            <h2 className='text-xl font-bold text-gray-800 mb-6'>
                {editingExpense ? 'Edit Expense' : 'Add New Expense'}
            </h2>
        
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                        <label htmlFor="date" className='block text-sm font-medium text-gray-700 mb-1'>
                            Date
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Calendar size={18} className='text-gray-400'/>
                            </div>
                            <input type="date"
                                id='date'
                                name='date'
                                className='w-full py-2 px-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                value={formData.date}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="product" className='block text-sm font-medium text-gray-700 mb-1'>
                            Product
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <ShoppingBag size={18} className='text-gray-400'/>
                            </div>
                            <input type="text"
                                id='product'
                                name='product'
                                placeholder='What did you purchase'
                                className='w-full py-2 px-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                value={formData.product}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="price" className='block text-sm font-medium text-gray-700 mb-1'>
                            Price
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <DollarSign size={18} className='text-gray-400'/>
                            </div>
                            <input type="number"
                                id='price'
                                name='price'
                                step='0.01'
                                placeholder='0.00'
                                className='w-full py-2 px-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="category" className='block text-sm font-medium text-gray-700 mb-1'>
                            Category
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Tag size={18} className='text-gray-400'/>
                            </div>
                            <select
                                id='category'
                                name='category'
                                className='w-full py-2 px-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none'
                                value={formData.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="vendor" className='block text-sm font-medium text-gray-700 mb-1'>
                            Vendor
                        </label>
                        <div className='relative'>
                            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                <Building size={18} className='text-gray-400'/>
                            </div>
                            <input type="text"
                                id='vendor'
                                name='vendor'
                                placeholder='Where did you make the purchase?'
                                className='w-full py-2 px-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                value={formData.vendor}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className='mt-6 flex justify-end space-x-3'>
                    <button 
                        type='button'
                        className='px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50'
                        onClick={resetForm}
                    >
                        Cancel
                    </button>
                    <button
                        type='submit'
                        className='px-4 py-2 btn-primary text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    >
                        {editingExpense ? 'Update Expense' : 'Add Expense'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddExpenseForm;