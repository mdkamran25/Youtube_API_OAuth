import { Url } from 'next/dist/shared/lib/router/router'
import Link from 'next/link'
import React from 'react'

const Login = ({loginLink}:{loginLink:Url}) => {
  return (
    <div className='w-[20rem] border border-4 p-5 text-center rounded-lg border-gray-900 hover:border-black'>
      <Link href={loginLink} className='w-[100%] hover:underline underline-offset-2  text-white'>Login With Youtube</Link>
    </div>
  )
}

export default Login
