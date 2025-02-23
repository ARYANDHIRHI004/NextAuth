import {connect} from "@/dbconfig/dbconfig";
import User from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { error } from "console";
import { sendEmail } from "@/helpers/mailer";



connect()

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json()
        const {username, email, password} = reqBody
        const user = await User.findOne({email})
        if(user) return NextResponse.json({error: "User already exist"})
        
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        await sendEmail({email, emailType:"VERIFY", userID: savedUser._id})

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        })




    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}