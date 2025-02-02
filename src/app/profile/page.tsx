"use client"

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const ProfilePage = () => {
  const router = useRouter();

  const logOut = async() => {
    try {
      await axios.get('/api/users/logout')
      router.push('/login')
      
    } catch (error:any) {
      console.log(error.message);
      
    }

  }
  return (
    <div className='flex flex-col items-center'>
      <h1 className='flex flex-col items-center justify-center py-2'>Profile</h1>
      <hr />
      <p>profile page</p>
      <button 
      onClick={logOut}
      className='rounded-xl p-3 bg-blue-600 text-white'>logout</button>
    </div>
  )
}

export default ProfilePage
