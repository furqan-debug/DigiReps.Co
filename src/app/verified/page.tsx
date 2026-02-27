// app/portal/verified/page.tsx
import Link from "next/link"
import { redirect } from "next/navigation"
import { IoCheckmarkCircleOutline } from "react-icons/io5"
import jwt from "jsonwebtoken"

export const dynamic = "force-dynamic"
export const runtime  = "nodejs"

export default async function Verified({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  // now `await` is valid and the type lines up
  const { token } = await searchParams

  if (!token) return redirect("/portal")

  try {
    jwt.verify(token, process.env.JWT_SECRET!)
  } catch {
    return redirect("/portal")
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
        <IoCheckmarkCircleOutline className="mx-auto mb-4 w-16 h-16 text-green-500" />
        <h1 className="text-2xl font-semibold mb-2 text-gray-800">
          Email Verified
        </h1>
        <p className="text-gray-600 mb-6">
          Your email has been successfully verified. You can now log in.
        </p>
        <Link href="/portal">
          <button className="bgColorBlue text-white rounded-full sm:px-11 px-6 py-4 animated-button overflow-x-hidden cursor-pointer">
            <span>Go to Login</span>
          </button>
        </Link>
      </div>
    </div>
  )
}
