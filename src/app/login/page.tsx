"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { axios } from "axios";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = () => {
    
  }
  
  return (
    <div className="text-center">
      <h1 className="">Login</h1>
      <hr />

      <div className="m-3">
        
        <div className="gap-3 m-3 flex justify-center">
          <label className="p-3" htmlFor="email">
            Email
          </label>
          <input id="email" 
          value={user.email} 
          onChange={(e)=>setUser({...user, email:e.target.value})}  className="p-3" type="text" placeholder="email" />
        </div>
        
        <div className="gap-3 m-3 flex justify-center">
          <label className="p-3" htmlFor="Password">
            Password
          </label>
          <input id="password" value={user.password} 
          onChange={(e)=>setUser({...user, password:e.target.value})}  className="p-3" type="text" placeholder="Password" />
        </div>
        <button
        onClick={onLogin}>Sign Up</button>
        <Link href="/signup">Visit Signup page</Link>
      </div>
    </div>
  );
}

export default LoginPage
