import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, DollarSign, Plus, LogOut, User } from 'lucide-react';
import ExpenseTable from '../components/ExpenseTable';
import AddExpenseForm from '../components/AddExpenseForm';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import UserProfile from '../components/UserProfile';
import Footer from '../components/Footer';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [expirationDays, setExpirationDays] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [activeTab, setActiveTab] = useState('expenses');
    const [editingExpense, setEditingExpense] = useState(null);
    const navigate = useNavigate();
 
    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            navigate('/login');
            return;
        }
        const userData = JSON.parse(currentUser);
       
        if (userData.expirationTime < Date.now()) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('rememberMe');
            navigate('/login');
            return;
        }
        const daysRemaining = Math.ceil((userData.expirationTime - Date.now()) / (1000 * 60 * 60 * 24));
        setExpirationDays(daysRemaining);
        setUser(userData);
       
        loadUserExpenses(userData.email);
    }, [navigate]);
   
    const loadUserExpenses = (userEmail) => {
        const allExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
        const userExpenses = allExpenses.filter(expense => expense.userEmail === userEmail);
        setExpenses(userExpenses);
    };
   
    const saveExpenses = (updatedExpenses) => {
        const allExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
        const otherUserExpenses = allExpenses.filter(expense => expense.userEmail !== user.email);
        const newAllExpenses = [...otherUserExpenses, ...updatedExpenses];
        localStorage.setItem('expenses', JSON.stringify(newAllExpenses));
        setExpenses(updatedExpenses);
    };
    
    const updateUserProfile = (updatedUserData) => {
        // Update the user state
        setUser(updatedUserData);
        
        // Update in localStorage
        localStorage.setItem('currentUser', JSON.stringify(updatedUserData));
        
        // Update in all users list
        const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const updatedUsers = allUsers.map(u => 
            u.email === updatedUserData.email ? updatedUserData : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };
    
    const deleteUserAccount = () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            // Remove user from users list
            const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const updatedUsers = allUsers.filter(u => u.email !== user.email);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            
            // Remove user expenses
            const allExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
            const updatedExpenses = allExpenses.filter(expense => expense.userEmail !== user.email);
            localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
            
            // Clear local storage and redirect to login
            localStorage.removeItem('currentUser');
            localStorage.removeItem('rememberMe');
            navigate('/login');
        }
    };
   
    const handleAddExpense = (newExpense) => {
        const expenseWithUser = {
            ...newExpense,
            userEmail: user.email
        };
       
        const updatedExpenses = [...expenses, expenseWithUser];
        saveExpenses(updatedExpenses);
        setActiveTab('expenses');
    };
   
    const handleEditExpense = (expense) => {
        setEditingExpense(expense);
        setActiveTab('addNew');
    };
   
    const handleUpdateExpense = (updatedExpense) => {
        const updatedExpenses = expenses.map(exp =>
            exp.id === updatedExpense.id ? { ...updatedExpense, userEmail: user.email } : exp
        );
       
        saveExpenses(updatedExpenses);
        setEditingExpense(null);
        setActiveTab('expenses');
    };
   
    const handleDeleteExpense = (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            const updatedExpenses = expenses.filter(expense => expense.id !== id);
            saveExpenses(updatedExpenses);
        }
    };
    
    const handleLogout = () => {
        navigate('/logout');
    };

    const showUserProfile = () => {
        setActiveTab('profile');
    };

    const handleBackFromProfile = () => {
        // Go back to the previous tab or to expenses by default
        const previousTab = activeTab === 'profile' ? 'expenses' : activeTab;
        setActiveTab(previousTab);
    };
   
    if (!user) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }
   
    return (
        <div className='min-h-screen bg-gray-50'>
            <div className="bg-white shadow-sm mb-4">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <div className="text-xl font-bold text-cyan-500">Trackify</div>
                        </div>
                       
                        <div className="flex items-center space-x-4">
                            <div 
                                className="flex items-center cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-md transition-colors"
                                onClick={showUserProfile}
                                title="View profile"
                            >
                                <User size={18} className="text-gray-500 mr-2" />
                                <span className="text-sm text-gray-700 mr-2">{user.name || user.email}</span>
                               
                                {expirationDays && (
                                    <span className="text-xs text-orange-600 mr-4">
                                        Expires in {expirationDays} day{expirationDays !== 1 ? 's' : ''}
                                    </span>
                                )}
                            </div>
                           
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                <LogOut size={16} className="mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
           
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
                {activeTab !== 'profile' && (
                    <div className='bg-white rounded-lg shadow p-4 mb-6'>
                        <div className='flex flex-wrap space-x-2 sm:space-x-4'>
                            <button
                                className={`px-4 py-2 rounded flex items-center ${activeTab === 'expenses' ? 'btn-primary font-medium' : ''}`}
                                onClick={() => setActiveTab('expenses')}
                            >
                                <DollarSign size={18} className='mr-1' />
                                <span>Expenses</span>
                            </button>
                            <button
                                className={`px-4 py-2 rounded flex items-center ${activeTab === 'addNew' ? 'btn-primary font-medium' : ''}`}
                                onClick={() => {
                                    setEditingExpense(null);
                                    setActiveTab('addNew');
                                }}
                            >
                                <Plus size={18} className='mr-1' />
                                <span>Add New</span>
                            </button>
                            <button
                                className={`px-4 py-2 rounded flex items-center ${activeTab === 'analytics' ? 'btn-primary font-medium' : ''}`}
                                onClick={() => setActiveTab('analytics')}
                            >
                                <BarChart2 size={18} className='mr-1' />
                                <span>Analytics</span>
                            </button>
                        </div>
                    </div>
                )}
               
                {activeTab === 'expenses' && (
                    <ExpenseTable
                        expenses={expenses}
                        onEditExpense={handleEditExpense}
                        onDeleteExpense={handleDeleteExpense}
                    />
                )}
               
                {activeTab === 'addNew' && (
                    <AddExpenseForm
                        onAddExpense={handleAddExpense}
                        onUpdateExpense={handleUpdateExpense}
                        editingExpense={editingExpense}
                    />
                )}
               
                {activeTab === 'analytics' && (
                    <AnalyticsDashboard
                        expenses={expenses}
                        onAddExpenseClick={() => setActiveTab('addNew')}
                    />
                )}
                
                {activeTab === 'profile' && (
                    <>
                        <div className="mb-4">
                            <button
                                onClick={handleBackFromProfile}
                                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md flex items-center text-sm font-medium"
                            >
                                ← Back to Dashboard
                            </button>
                        </div>
                        <UserProfile
                            user={user}
                            onUpdateProfile={updateUserProfile}
                            onDeleteAccount={deleteUserAccount}
                            onCancel={handleBackFromProfile}
                        />
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;