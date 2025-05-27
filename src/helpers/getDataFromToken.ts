import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export const getDataFromToken=async(request:NextRequest)=>{
try{
const token=request.cookies.get('token')?.value||'';
const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as jwt.JwtPayload;

    if (typeof decoded === 'object' && 'id' in decoded) {
      return decoded.id as string;
    }

    return null;
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