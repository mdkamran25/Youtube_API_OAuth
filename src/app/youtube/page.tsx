import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
export const dynamic = "force-dynamic"

const Youtube = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const code = searchParams?.code;

  if(!code) throw new Error("Facing issue, login with account")
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/code/`, {
    headers: { code },
  });

  if (res.ok) {
    const data = await res.json();
    redirect(`/youtube/playlist?token=${data.token}`);
  }

  try {
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      return (
        <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-3">
          <p className="font-semibold">Facing some issue: {error?.message}</p>
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

  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center gap-3">
      Youtube page
    </div>
  );
};

export default Youtube;
