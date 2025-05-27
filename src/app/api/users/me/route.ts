import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDb } from "@/dbConfig/dbConfig";
connectToDb();
export async function GET(request:NextRequest){
    try{
     const UserId=await getDataFromToken(request);
     const user=await User.findOne({_id:UserId}).select('-password');
     return NextResponse.json({
        meassage:'User  Found',
        data:user
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