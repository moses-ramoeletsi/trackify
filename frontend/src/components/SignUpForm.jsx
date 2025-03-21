import { Eye, EyeOff, KeyIcon, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const createTemporaryAccount = (userData) => {
    const expirationTime = Date.now() + (5*24*60*60*1000);

    const userWithExpiration = {
        ...userData,
        expirationTime,
        createdAt: Date.now()
    };
    
    // Fix: use 'users' key consistently
    const existingAccounts = JSON.parse(localStorage.getItem('users') || '[]');   
    
    const emailExists = existingAccounts.some(account => account.email === userData.email);
    if (emailExists) {
        return { success: false, message: 'Email already exists' };
    }
    
    // Fix: Add the new account to existing accounts
    const updatedAccounts = [...existingAccounts, userWithExpiration];
    localStorage.setItem('users', JSON.stringify(updatedAccounts));
  
    // Store the current user separately for easy access
    localStorage.setItem('currentUser', JSON.stringify(userWithExpiration));
      
    return { success: true, message: 'Account created successfully' };
};

const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        // Clean up expired accounts when component loads
        const accounts = JSON.parse(localStorage.getItem('users') || '[]');
        const currentTime = Date.now();
        
        const validAccounts = accounts.filter(account => account.expirationTime > currentTime);
        
        if (validAccounts.length !== accounts.length) {
            localStorage.setItem('users', JSON.stringify(validAccounts));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError('All fields are required');
            return;
        }
  
        // Create the account
        const result = createTemporaryAccount({
            name,
            email,
            password
        });
  
        if (result.success) {
            setSuccess('Account created successfully! Redirecting to login...');
            setError('');
            
            // Clear form
            setName('');
            setEmail('');
            setPassword('');
            
            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } else {
            setError(result.message);
            setSuccess('');
        }
    };
    
    return (
        <div className='max-w-md mx-auto bg-white p-8 rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold text-center mb-2'>Create new account</h1>
            <p className='text-center mb-6'>Or<Link to='/login' className='trackify-blue hover:underline pl-1'>Sign In</Link></p>

            {error && <div className='mb-4 p-2 bg-red-100 text-red-700 rounded-md'>{error}</div>}
            {success && <div className='mb-4 p-2 bg-green-100 text-green-700 rounded-md'>{success}</div>}

            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor="name" className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <User className='text-gray-400' size={18}/>
                        </div>
                        <input 
                            type='text'
                            id='name'
                            placeholder='Your name'
                            value={name}
                            className='w-full py-2 px-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <Mail className='text-gray-400' size={18}/>
                        </div>
                        <input 
                            type='email'
                            id='email'
                            placeholder='you@example.com'
                            value={email}
                            className='w-full py-2 px-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <KeyIcon className='text-gray-400' size={18}/>
                        </div>
                        <input 
                            type={showPassword ? "text":'password'}
                            id='password'
                            value={password}
                            className='w-full py-2 px-3 border border-gray-300 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button 
                            type='button' 
                            className='absolute inset-y-0 right-0 pr-3 flex items-center'
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <Eye size={18} className='text-gray-400' /> : <EyeOff size={18} className='text-gray-400' />}
                        </button>
                    </div>
                </div>
                
                <button type='submit' className='w-full btn-primary mt-6'>Sign up</button>
            </form>
            <div className='mt-6'>
                <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-300'></div>
                    </div>
                    <div className='relative flex justify-center text-sm'>
                        <span className='px-2 bg-white text-gray-500'>Or continue with</span>
                    </div>
                </div>
                <div className='mt-6 grid grid-cols-2 gap-3'>
                    <button className='w-full justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'>Google</button>
                    <button className='w-full justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50'>Facebook</button>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;