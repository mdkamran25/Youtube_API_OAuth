import { google, youtube_v3 } from "googleapis";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const OAuth2 = google.auth.OAuth2;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const token = req.headers.get('token')
  
  try {
    const oauth2client = new OAuth2(
      process.env.NEXT_PUBLIC_CLIENT_ID!,
      process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      process.env.NEXT_PUBLIC_REDIRECT_URI!
    );

    if (!token) {
      throw new Error("JWT token is missing from the cookie.");
    }

    const decodedToken =
     jwt.verify(
      token as string,
      process.env.NEXT_PUBLIC_JWT_SECRET!
    );

    oauth2client.setCredentials(decodedToken as TokenObject);

    const service = google.youtube({
      version: "v3",
      auth: oauth2client,
    });

    const response = await service.playlistItems.list({
      part: ["snippet,contentDetails"],
      maxResults: 10,
      playlistId: id,
    });


    return NextResponse.json({ data: response.data.items }, { status: 200 });
  } catch (error) {
    if(error instanceof Error){
      console.error("Error occurred:", error);
      return NextResponse.json(
        { error: error.message, reason: error.cause },
        { status: 500 }
      );
    }
    
  }
}
