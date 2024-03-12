import Login from '@/components/Login'
export const dynamic = "force-dynamic"

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`) 
  const data = await res.json() as LoginLink

  return (
    <main className="flex bg-gray-700 h-[100vh] w-[100vw] flex-row items-center justify-center p-24">
      <Login loginLink={data.loginLink} />
    </main>
  )
}
