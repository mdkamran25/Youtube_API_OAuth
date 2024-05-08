import { google, youtube_v3 } from "googleapis";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic"

const OAuth2 = google.auth.OAuth2;

export async function GET(req:NextRequest) {

  try {
    const code = req.headers.get("code");
    
    if (!code) {
      return NextResponse.redirect("http://localhost:3000/");
    }

    const oauth2client = new OAuth2(
      process.env.CLIENT_ID!,
      process.env.CLIENT_SECRET!,
      process.env.REDIRECT_URI!
    );

    let { tokens } = await oauth2client.getToken(code);     

    if (!tokens|| !tokens.access_token) {
      throw new Error("Access token is missing");
    }

    const jwtToken = jwt.sign(
      tokens as object,
      process.env.JWT_SECRET!
    );
    
    return NextResponse.json(
      { token: jwtToken },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message, reason: error.cause },
        { status: 500 }
      );
    }
  }
}
