import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect()

export async function POST(req:NextRequest){

    try {
        const reqBody = await req.json()
        const {email, password} = reqBody;

        const user = await User.findOne({email})

        if (!user) return NextResponse.json({error: "User not found"})

        const getPassword = await bcryptjs.compare(password, user.password)

        const token = await jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email
            }, 
            process.env.TOKEN_SECRET!,
            {
                expiresIn: "1d"
            }
        )

        const response =  NextResponse.json({
            message: "User logedin successfully",
            success: true,
        })
        response.cookies.set("token", token, {httpOnly: true})

        return response
        

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}