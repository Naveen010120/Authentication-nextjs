import { connectToDb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectToDb();
export async function POST(req:NextRequest){
    console.log('hi')
    try {
        const reqBody=await req.json();
        const {token}=reqBody;
        console.log('sendVerify Token')
        console.log("token ----",token);
      const user=await  User.findOne({verifyToken:token,
            verifyTokenExpiry:{$gt:Date.now()}
        })
        if(!user){
            return NextResponse.json({error:"Invaild token"},{status:400})
        }
        console.log(user);
        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();
        return NextResponse.json({message:'Email Verified',success:true})
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:5000})
    }
}