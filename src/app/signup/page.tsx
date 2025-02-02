"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignUpPage = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      router.push("/login");  

    } catch (error: any) {
      console.log("signup failed");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h1 className="">SignUp</h1>
      <hr />

      <div className="m-3">
        <div className="gap-3 m-3 flex justify-center">
          <label className="p-3" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="p-3"
            type="text"
            placeholder="username"
          />
        </div>

        <div className="gap-3 m-3 flex justify-center">
          <label className="p-3" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="p-3"
            type="text"
            placeholder="email"
          />
        </div>

        <div className="gap-3 m-3 flex justify-center">
          <label className="p-3" htmlFor="Password">
            Password
          </label>
          <input
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="p-3"
            type="text"
            placeholder="Password"
          />
        </div>
        <button onClick={onSignup}>Sign Up</button>
      </div>
        <Link href="/login">Visit login page</Link>
    </div>
  );
};

export default SignUpPage;
