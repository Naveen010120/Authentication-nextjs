import { NextResponse } from "next/server";

export async function GET(){
    try{
        const response=NextResponse.json({
            message:'Logout Successfull',
            success:true
        });
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
        return response
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