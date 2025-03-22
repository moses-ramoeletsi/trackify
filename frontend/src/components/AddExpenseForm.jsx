import { Building, Calendar, DollarSign, ShoppingBag, Tag, Hash } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const AddExpenseForm = ({ onAddExpense, onUpdateExpense, editingExpense }) => {
    const initialFormState = {
        date: new Date().toISOString().split('T')[0],
        product: '',
        category: '',
        vendor: '',
        quantity: 1,
        pricePerProduct: '',
        price: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [isTransportation, setIsTransportation] = useState(false);

    useEffect(() => {
        if (editingExpense) {
            // If editing an expense with the Transportation category
            if (editingExpense.category === 'Transportation') {
                setFormData({
                    ...editingExpense,
                    price: editingExpense.price.toString(), // Convert to string for input field
                    quantity: 1,
                    pricePerProduct: editingExpense.price.toString()
                });
            } else {
                // For other categories, calculate pricePerProduct if not available
                const pricePerProduct = editingExpense.pricePerProduct ? 
                    editingExpense.pricePerProduct.toString() : 
                    (editingExpense.quantity ? (editingExpense.price / editingExpense.quantity).toString() : '');
                
                setFormData({
                    ...editingExpense,
                    price: editingExpense.price.toString(),
                    quantity: editingExpense.quantity || 1,
                    pricePerProduct: pricePerProduct
                });
            }
        }
    }, [editingExpense]);

    useEffect(() => {
        // Check if category is Transportation
        setIsTransportation(formData.category === 'Transportation');
        
        // If category changes to Transportation, reset quantity to 1
        if (formData.category === 'Transportation') {
            setFormData(prev => ({
                ...prev,
                quantity: 1,
                pricePerProduct: prev.price || ''
            }));
        } else if (formData.category !== '' && formData.category !== 'Transportation') {
            // For other categories, calculate the price based on quantity and pricePerProduct
            calculateTotalPrice();
        }
    }, [formData.category]);

    // Calculate total price when quantity or pricePerProduct changes
    useEffect(() => {
        if (!isTransportation && formData.quantity && formData.pricePerProduct) {
            calculateTotalPrice();
        }
    }, [formData.quantity, formData.pricePerProduct, isTransportation]);

    const calculateTotalPrice = () => {
        if (formData.quantity && formData.pricePerProduct) {
            const total = parseFloat(formData.quantity) * parseFloat(formData.pricePerProduct);
            setFormData(prev => ({
                ...prev,
                price: total.toString()
            }));
        }
    };

    const categories = [
        'Groceries', 'Transportation', 'Utilities', 'HealthCare', 'Others'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // If changing price in Transportation category, update pricePerProduct
        if (isTransportation && name === 'price') {
            setFormData(prev => ({
                ...prev,
                price: value,
                pricePerProduct: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const processedFormData = {
            ...formData,
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity),
            pricePerProduct: parseFloat(formData.pricePerProduct)
        };
        
        if (editingExpense) {
            onUpdateExpense(processedFormData);
        } else {
            onAddExpense({
                ...processedFormData,
                id: Date.now()
            });
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
                    
                    {!isTransportation && (
                        <>
                            <div>
                                <label htmlFor="quantity" className='block text-sm font-medium text-gray-700 mb-1'>
                                    Quantity
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Hash size={18} className='text-gray-400'/>
                                    </div>
                                    <input type="number"
                                        id='quantity'
                                        name='quantity'
                                        min='1'
                                        placeholder='1'
                                        className='w-full py-2 px-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        value={formData.quantity}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="pricePerProduct" className='block text-sm font-medium text-gray-700 mb-1'>
                                    Price Per Product
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <DollarSign size={18} className='text-gray-400'/>
                                    </div>
                                    <input type="number"
                                        id='pricePerProduct'
                                        name='pricePerProduct'
                                        step='0.01'
                                        placeholder='0.00'
                                        className='w-full py-2 px-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                        value={formData.pricePerProduct}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    
                    <div className='md:col-span-2'>
                        <label htmlFor="price" className='block text-sm font-medium text-gray-700 mb-1'>
                            Total Price
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
                                readOnly={!isTransportation}
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
                        className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    >
                        {editingExpense ? 'Update Expense' : 'Add Expense'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddExpenseForm;