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

        const token = jwt.sign(
            {
                id: user._id,
                username: user.username
            }, process.env.TOKEN_SECRET!,
            {
                expiresIn: process.env.TOKEN_SECRET_EXPIRY!
            }
        )

        return NextResponse.json({
            message: "User created successfully",
            success: true,
        })
        .cookies.set("token", token, {httpOnly: true, path: "/"})






    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}