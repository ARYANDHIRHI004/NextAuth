"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {axios} from 'axios';


const SignUpPage = () => {

    const [user, setUser] = useState({
            email: "",
            password :"",
            username: "",
        })

  return (
    <div className='items-center'>
      <h1>SignUp</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input  type="text" />
    </div>
  )
}

export default SignUpPage
