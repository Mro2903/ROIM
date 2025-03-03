import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { NextResponse } from "next/server"

const AuthRoutes = ["/login", "/register", "/verify-email"];
const ProtectedRoutes = ["/dashboard"];

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req) {
    const isAuth = !!req.auth
    const isAuthRoute = AuthRoutes.includes(req.nextUrl.pathname)
    const isProtectedRoute = ProtectedRoutes.includes(req.nextUrl.pathname)
    const isApiRoute = req.nextUrl.pathname.startsWith("/api")
    if (isApiRoute) return;
    if (!isAuth) {
        if (isProtectedRoute) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
        return;
    } else {
        if (isAuthRoute) {
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }
    }
})

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'] }