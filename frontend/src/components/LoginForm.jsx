import { Eye, EyeOff, Mail, KeyIcon } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const validateTemporaryAccount = (email, password) => {
  const accounts = JSON.parse(localStorage.getItem('users') || '[]');
  
  const account = accounts.find(acc => acc.email === email && acc.password === password);
  
  if (!account) {
    return { valid: false, message: 'Invalid credentials' };
  }
  
  if (Date.now() > account.expirationTime) {
    const validAccounts = accounts.filter(acc => acc.email !== email);
    localStorage.setItem('users', JSON.stringify(validAccounts));
    return { valid: false, message: 'Account has expired (5-day limit reached)' };
  }
  
  localStorage.setItem('currentUser', JSON.stringify(account));
  
  return { valid: true, account };
};

const cleanupExpiredAccounts = () => {
  const accounts = JSON.parse(localStorage.getItem('users') || '[]');
  const currentTime = Date.now();
  
  const validAccounts = accounts.filter(account => account.expirationTime > currentTime);
  
  if (validAccounts.length !== accounts.length) {
    localStorage.setItem('users', JSON.stringify(validAccounts));
  }
  
  return validAccounts.length;
};

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [accountsCount, setAccountsCount] = useState(0);
    const navigate = useNavigate();
    
    useEffect(() => {
      const count = cleanupExpiredAccounts();
      setAccountsCount(count);
      
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        if (user.expirationTime > Date.now()) {
          const remembered = localStorage.getItem('rememberMe') === 'true';
          if (remembered) {
            setSuccess('Already logged in. Redirecting...');
            setTimeout(() => {
              navigate('/dashboard');
            }, 1500);
          }
        }
      }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
          setError('Email and password are required');
          return;
        }
        
        const result = validateTemporaryAccount(email, password);
        
        if (result.valid) {
          setSuccess('Login successful! Redirecting to dashboard...');
          setError('');
          
          if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
          } else {
            localStorage.removeItem('rememberMe');
          }
          
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        } else {
          setError(result.message);
          setSuccess('');
        }
    };
    
    // Calculate account expiration days remaining
    const getExpirationDays = () => {
      const accounts = JSON.parse(localStorage.getItem('users') || '[]');
      const account = accounts.find(acc => acc.email === email);
      
      if (!account) return null;
      
      const daysRemaining = Math.ceil((account.expirationTime - Date.now()) / (1000 * 60 * 60 * 24));
      return daysRemaining;
    };

    return (
      <div className='max-w-md mx-auto bg-white p-8 rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold text-center mb-2'>Sign in to your account</h1>
          <p className='text-center mb-6'>Or <Link to='/sign-up' className='trackify-blue hover:underline pl-1' >Create a new account</Link></p>
          
          {accountsCount > 0 && (
            <div className='mb-4 p-2 bg-blue-100 text-blue-700 rounded-md text-sm'>
              {accountsCount} temporary account{accountsCount !== 1 ? 's' : ''} active (5-day limit)
            </div>
          )}
          
          {error && <div className='mb-4 p-2 bg-red-100 text-red-700 rounded-md'>{error}</div>}
          {success && <div className='mb-4 p-2 bg-green-100 text-green-700 rounded-md'>{success}</div>}
          
          <form onSubmit={handleSubmit}>
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
              <div>
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
              <div className='flex items-center justify-between mt-4 mb-6'>
                  <div className='flex items-center'>
                      <input 
                      type="checkbox"
                      id="remember-me"
                      checked={rememberMe}
                      className='h-4 w-4 border-gray-300 rounded'
                      onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label htmlFor="remember-me" className='ml-3 block text-sm text-gray-700'>Remember me</label>
                  </div>
                  <div className='text-sm'>
                      <Link to="/forgot-password" className='trackify-blue hover:underline'>Forgot your password</Link>
                  </div>
              </div>
              
              {getExpirationDays() !== null && (
                <div className='mb-4 text-sm text-orange-600'>
                  Your account expires in {getExpirationDays()} day{getExpirationDays() !== 1 ? 's' : ''}
                </div>
              )}
              
              <button type='submit' className='w-full btn-primary'>Sign in</button>
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

export default LoginForm;