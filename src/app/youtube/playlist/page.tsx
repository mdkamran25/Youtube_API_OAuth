import Playlist from "@/components/playlist";
import Link from "next/link";
export const dynamic = "force-dynamic"

export default async function YoutubePlaylist({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const jwtToken = searchParams?.token;
  
  try {
    if(!jwtToken) throw new Error("Failed to get token")
    
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/playlist/`,
      {
        headers: { jwtToken  },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data ${res.statusText}`);
    }

    const data = await res.json();

    return (
      <div className="flex w-[100vw] flex-col md:p-24 sm:p-10 p-5">
        <h1 className="text-2xl font-semibold">Playlists in your channel</h1>
        {data.data.length !== 0 ? (
          <Playlist data={data.data} token={data.token} />
        ) : (
          <p className="block text-xl pt-4 ps-2"> No Playlist Found 😔</p>
        )}
      </div>
    );
  } catch (error) {
    if (error instanceof Error) {
      return (
        <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-3">
          <p className="font-semibold">Facing issue: {error?.message}</p>
          <Link
            href="/"
            className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl"
          >
            Please try again
          </Link>
        </div>
      );
    }
  }
}
