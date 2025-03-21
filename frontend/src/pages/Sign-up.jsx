import React from 'react'
import SignUpForm from '../components/SignUpForm'


const SignUp = () => {
  return (
    <div className='min-h-screen flex flex-col'>
        <div>
          <h1 className='text-3xl text-center mt-10  mb-6 trackify-blue font-bold'>Trackify</h1>
          <div className='flex-grow flex items-center justify-center  px-4 sm:px-6 lg:px-8'>
              <SignUpForm />
          </div>
        </div>
    </div>
  )
}

export default SignUp