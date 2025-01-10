import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { authApiPrefix, authRoutes, defaultRouteRedirect, publicRoutes } from "./Routes"
import { NextResponse } from "next/server"
 
const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const currentRoute = req.nextUrl.pathname
  console.log('Middleware')

  const isLoggedIn = !!req.auth
  const isApiAuthRoute = currentRoute.startsWith(authApiPrefix)
  const isPublicRoute = publicRoutes.includes(currentRoute)
  const isAuthRoute = authRoutes.includes(currentRoute)
  if(isApiAuthRoute) return

  if(isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(defaultRouteRedirect, req.nextUrl))
  }
  if(!isLoggedIn && isPublicRoute) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
      ],
}