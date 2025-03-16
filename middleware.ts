import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is a protected route
  const protectedRoutes = ["/profile", "/bookings", "/checkout"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Check if the path is an admin route
  const isAdminRoute = pathname.startsWith("/admin")

  if (isProtectedRoute || isAdminRoute) {
    const token = await getToken({ req: request })

    // If no token, redirect to login
    if (!token) {
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(request.url))
      return NextResponse.redirect(url)
    }

    // If admin route but user is not admin, redirect to home
    if (isAdminRoute && token.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/profile/:path*", "/bookings/:path*", "/checkout/:path*", "/admin/:path*"],
}

