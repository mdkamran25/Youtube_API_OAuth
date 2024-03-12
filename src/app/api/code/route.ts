import { google, youtube_v3 } from "googleapis";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const OAuth2 = google.auth.OAuth2;

export async function GET(req:NextRequest) {

  try {
    const code = req.headers.get("code");
    
    if (!code) {
      return NextResponse.redirect("http://localhost:3000/");
    }

    const oauth2client = new OAuth2(
      process.env.NEXT_PUBLIC_CLIENT_ID!,
      process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      process.env.NEXT_PUBLIC_REDIRECT_URI!
    );

    let { tokens } = await oauth2client.getToken(code);     

    if (!tokens|| !tokens.access_token) {
      throw new Error("Access token is missing");
    }

    const jwtToken = jwt.sign(
      tokens as object,
      process.env.NEXT_PUBLIC_JWT_SECRET!
    );
    
    return NextResponse.json(
      { token: jwtToken },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error occurred:", error);
      return NextResponse.json(
        { error: error.message, reason: error.cause },
        { status: 500 }
      );
    }
  }
}
