import { connectToDb } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
connectToDb();
export async function POST(req:NextRequest){
    try{
     const ReqBody=await req.json();
     const {email,password}=ReqBody;
     console.log(email,password);
     const user=await  User.findOne({email});
     if(!user){
        return NextResponse.json({message:"User not found"},{status:400})
     }
  
     if(!(await bcrypt.compare(password,user.password))){
        return NextResponse.json({message:"Password is Incorrect"},{status:400})
     }
     if(!user.isVerified){
      return NextResponse.json({message:'please verify your  email'},{status:401})
     }
     const token=await jwt.sign({id:user._id,name:user.name,email:user.email},process.env.TOKEN_SECRET!,{expiresIn:"1h"})
     const response=NextResponse.json({
        message:"Login Successfull",
        success:true,
     })
     response.cookies.set("token",token,{
        httpOnly:true
     });
     console.log(response)
     return response;
    
 }
 catch(error:any){
    return NextResponse.json({message:error.message},{status:500})
 }
}