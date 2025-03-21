import { ArrowLeft, Mail } from 'lucide-react';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] =useState (false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({email});
    submitted(true);
  }
    return (
    <div className='min-h-screen flex flex-col'>
        <div className='text-center mt-10 mb-6'>
            <h1 className='text-3xl font-bold'>Trackify</h1>
        </div>

        <div className='flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full bg-white p-8 rounded-lg shadow-md'>
                <div className='mb-6'>
                    <Link to="/login" className='flex items-center text-gray-600'>
                        <ArrowLeft  size={16} className='mr-1'/>
                        <span>Back to Login</span>
                    </Link>
                </div>
                {!submitted ? (
                    <>
                        <h1 className='text-2xl font-bold tex-center mb-2'> Rest your password</h1>
                        <p className='text-center text-gray-600 mb-6'>
                            We'll send you an email with a link to rest your password
                        </p>
                        <form >
                            <div className='mb-4'>
                                <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-1'>
                                    Email
                                </label>
                                <div className='relative'>
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                        <Mail  size={18} className='text-gray-400'/>
                                    </div>
                                    <input 
                                        type="email" 
                                        id='email'
                                        placeholder='you@example.com'
                                        className='input-primary pl-10'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required    
                                        />
                                </div>
                            </div>
                            <button type='submit' className='w-full mt-2'>
                                Send rest Link
                            </button>
                        </form>
                    </>
                ) : (
                    <div className='text-center py-6'>
                        <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4'>
                            <Mail  className='h-6 w-6 text-green-600'/>
                        </div>
                        <h2 className='text-xl font-medium text-gray-900 mb-2'>Check your email</h2>
                        <p className='text-gray-600 mb-4'>
                            We've sent a password rest link too <span className='font-medium'>{email}</span>
                        </p>
                        <p className='text-sm text-gray-500'>
                            Didn't receive the email? Check your spam folder or {" "}
                            <button className='hover:underline'>
                                try  another email
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>

    </div>
  )
}

export default ForgotPassword