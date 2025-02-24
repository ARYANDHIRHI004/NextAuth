import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.models";

connect()

export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json()
        const {token} = reqBody

        const user = await User.findOne({verifyToken: token, verifyTokenExpire: {$gt :Date.now()}})

        if(!user){
            return NextResponse.json({error:"Invalid token"},{status:400})
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save()
        
        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        })

    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500})
    }
}