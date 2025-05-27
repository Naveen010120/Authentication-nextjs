import { connectToDb } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";

import { NextRequest, NextResponse } from "next/server";

connectToDb();
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email } = reqBody;

        if (!email) {
            return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }

        const user = await User.findOne({ email });
        console.log(user)
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

       const resetPass= await sendEmail({email:user.email,emailType:'RESET',userId:user._id});
       console.log(resetPass)
        return NextResponse.json({ emailUser: user._id }, { status: 200 });
    } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
      return NextResponse.json({ message: error.message },{status:500});
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ message: 'Something went wrong' },{status:500});
    }
  }
}
