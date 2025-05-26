import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDb } from "@/dbConfig/dbConfig";
connectToDb();
interface ForgotPasswordRequest {
  token: string;
  confirmPassword: string;
}
export async function POST(req: NextRequest) {
  const reqBody:ForgotPasswordRequest = await req.json();
  const { token, confirmPassword } = reqBody;

  if (!token) {
    return NextResponse.json(
      { message: "Token does not exist" },
      { status: 401 }
    );
  }

  const user = await User.findOne({ forgotPasswordToken: token });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 404 }
    );
  }

  const isSamePassword = await bcrypt.compare(confirmPassword, user.password);
  if (isSamePassword) {
    return NextResponse.json(
      { message: "New password cannot be the same as the old password" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(confirmPassword, 10);

  await User.updateOne(
    { forgotPasswordToken: token },
    {
      $set: { password: hashedPassword },
    }
  );

  return NextResponse.json(
    { message: "Password updated successfully" },
    { status: 200 }
  );
}
