import React from 'react'
import LoginForm from '../components/LoginForm'

const Login = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <div>
            <h1 className='text-3xl text-center mt-10 mb-6 font-bold trackify-blue'>Trackify</h1>
          <div className='flex-grow flex items-center justify-center mt-4 px-4 sm:px-6 lg:px-8'>
              <LoginForm />
          </div>
        </div>
    </div>
  )
}

export default Login