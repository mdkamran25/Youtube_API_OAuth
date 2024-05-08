import { google } from "googleapis";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"
const OAuth2 = google.auth.OAuth2;

export async function GET() {
    try {
        const oauth2client = new OAuth2(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            process.env.REDIRECT_URI
        );
        const loginLink = oauth2client.generateAuthUrl({
            access_type:"offline",
            scope: process.env.SCOPE
        })
        return NextResponse.json({loginLink},{status:200})
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({err:error.message, reason: error.cause},{status:500});
        }
    }
  
}
