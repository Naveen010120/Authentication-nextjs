import { connectToDb } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectToDb();
export async function POST(request:NextRequest){
    try{
        const reqBody=await request.json();
        const {name,email,password}=reqBody;
        console.log(email)
       const user= await User.findOne({email});
       if(user){
        return NextResponse.json({error:'User already Exist'},{status:400})
       }

       const salt=await bcrypt.genSalt(10);
       const hashedPassword=await bcrypt.hash(password,salt);
       const newUser=new User({
        name,
        email,
        password:hashedPassword
       })
       const savedUser=await newUser.save();
       console.log(savedUser);
       await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
       return NextResponse.json({
        success:true,
        message:'User Created Successfully',
        savedUser
       })
    }
   catch (error: unknown) {
       if (error instanceof Error) {
         console.error('Error:', error.message);
         return NextResponse.json({ message: error.message },{status:500});
       } else {
         console.error('Unexpected error:', error);
         return NextResponse.json({ message: 'Something went wrong' },{status:500});
       }
     }
}
